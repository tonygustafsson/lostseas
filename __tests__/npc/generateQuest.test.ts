import { describe, expect, it } from "vitest"

import { TOWNS } from "@/constants/locations"
import {
  isTradeGoodAvailableInTown,
  MERCHANDISE,
} from "@/constants/merchandise"
import { getNpcAt, getNpcById } from "@/constants/npcs"
import {
  PROCUREMENT_QUANTITY,
  QUEST_LINES,
  QUEST_PITCHES,
  QUEST_PLACEHOLDERS,
  QUEST_REWARDS,
} from "@/constants/quests"
import { generateQuest } from "@/utils/npc/generateQuest"
import { DIALOGUE_PLACEHOLDERS } from "@/utils/npc/placeholders"

import { createTestPlayer } from "../helpers/createTestPlayer"
import { createSeededRandom } from "../helpers/seededRandom"

const player = createTestPlayer()
const placements: NpcPlacement[] = ["tavern", "market", "governor"]
const giverTowns: Town[] = ["Havana", "Port Royale", "Tortuga", "Curacao"]

/** Generates quests for 200 seeds per placement */
const generateMany = () =>
  placements.flatMap((placement) =>
    Array.from({ length: 200 }, (_, seed) => {
      const giver = getNpcAt(giverTowns[seed % giverTowns.length], placement)
      const quest = generateQuest(giver, player, createSeededRandom(seed).int)

      return { giver, quest }
    })
  )

const quests = generateMany()

const roundTo10 = (value: number) => Math.round(value / 10) * 10

describe("generateQuest", () => {
  it("generates every quest type", () => {
    const types = new Set(quests.map(({ quest }) => quest.type))

    expect(types).toEqual(
      new Set(["delivery", "procurement", "messageChain", "findPerson"])
    )
  })

  it("gives the same quest for the same seed, apart from its id", () => {
    quests.forEach(({ giver, quest }, index) => {
      const seed = index % 200
      const again = generateQuest(giver, player, createSeededRandom(seed).int)

      expect({ ...again, id: quest.id }).toEqual(quest)
    })
  })

  it("targets are never the giver or in the giver's town", () => {
    quests.forEach(({ giver, quest }) => {
      const targetIds =
        quest.type === "delivery"
          ? [quest.targetNpcId]
          : quest.type === "messageChain"
            ? quest.stepNpcIds.slice(0, -1)
            : []

      targetIds.forEach((id) => {
        const target = getNpcById(id)

        expect(target).toBeDefined()
        expect(target?.id).not.toBe(giver.id)
        expect(target?.town).not.toBe(giver.town)
      })
    })
  })

  it("message chains end with the giver and have 2 or 3 steps", () => {
    quests.forEach(({ giver, quest }) => {
      if (quest.type !== "messageChain") {
        return
      }

      expect([2, 3]).toContain(quest.stepNpcIds.length)
      expect(quest.stepNpcIds.at(-1)).toBe(giver.id)
      expect(quest.step).toBe(0)

      const towns = quest.stepNpcIds.map((id) => getNpcById(id)?.town)

      expect(new Set(towns).size).toBe(towns.length)
    })
  })

  it("find person hides in a town of the quest nation, never the giver's town", () => {
    quests.forEach(({ giver, quest }) => {
      if (quest.type !== "findPerson") {
        return
      }

      expect(TOWNS[quest.hiddenTown].nation).toBe(quest.nation)
      expect(quest.hiddenTown).not.toBe(giver.town)
      expect(quest.personName).toMatch(/^\S+ \S+/)
      expect(quest.reward.gold + itemValue(quest.reward)).toBeGreaterThan(0)
    })
  })

  it("never asks for goods the giver's own town sells", () => {
    const allTowns = Object.keys(TOWNS) as Town[]

    allTowns.forEach((town) => {
      Array.from({ length: 300 }, (_, seed) => {
        const giver = getNpcAt(town, "tavern")
        const quest = generateQuest(giver, player, createSeededRandom(seed).int)

        if (quest.type === "procurement") {
          expect(isTradeGoodAvailableInTown(quest.item, town)).toBe(false)
        }
      })
    })
  })

  it("starts a find person search with the giver's town ruled out when the nation matches", () => {
    let checked = 0

    quests.forEach(({ giver, quest }) => {
      if (
        quest.type === "findPerson" &&
        quest.nation === TOWNS[giver.town].nation
      ) {
        checked++
        expect(quest.ruledOut).toEqual([giver.town])
      }
    })

    expect(checked).toBeGreaterThan(0)
  })

  it("procurement asks for barter goods in steps of 5 from 20 to 60", () => {
    quests.forEach(({ quest }) => {
      if (quest.type !== "procurement") {
        return
      }

      expect(MERCHANDISE[quest.item].isBarterGoods).toBe(true)
      expect(quest.quantity).toBeGreaterThanOrEqual(PROCUREMENT_QUANTITY.min)
      expect(quest.quantity).toBeLessThanOrEqual(PROCUREMENT_QUANTITY.max)
      expect(quest.quantity % PROCUREMENT_QUANTITY.step).toBe(0)
      expect(quest.reward.item?.name).not.toBe(quest.item)
    })
  })

  it("delivery gold is 150 per sailing day plus 200, rounded to 10", () => {
    const deliveries = quests.filter(({ quest }) => quest.type === "delivery")

    expect(deliveries.some(({ quest }) => quest.reward.item)).toBe(true)
    expect(deliveries.some(({ quest }) => !quest.reward.item)).toBe(true)

    deliveries.forEach(({ giver, quest }) => {
      if (quest.type !== "delivery") {
        return
      }

      const target = getNpcById(quest.targetNpcId) as Npc
      const days = TOWNS[giver.town].map.distanceTo[target.town]
      const full = days * QUEST_REWARDS.goldPerDay + QUEST_REWARDS.baseGold

      expect(quest.reward.gold % 10).toBe(0)

      if (!quest.reward.item) {
        expect(quest.reward.gold).toBe(roundTo10(full))

        return
      }

      const { name, quantity } = quest.reward.item
      const price = MERCHANDISE[name].buy

      expect(MERCHANDISE[name].isBarterGoods).toBe(true)
      expect(quantity).toBeGreaterThanOrEqual(5)
      expect(
        Math.abs(quest.reward.gold + quantity * price - full)
      ).toBeLessThanOrEqual(price)
    })
  })

  it("chain gold uses the whole round trip", () => {
    quests.forEach(({ giver, quest }) => {
      if (quest.type !== "messageChain" || quest.reward.item) {
        return
      }

      const route = [
        giver.town,
        ...quest.stepNpcIds.map((id) => getNpcById(id)!.town),
      ]
      const days = route
        .slice(1)
        .reduce(
          (sum, town, index) => sum + TOWNS[route[index]].map.distanceTo[town],
          0
        )

      expect(quest.reward.gold).toBe(
        roundTo10(days * QUEST_REWARDS.goldPerDay + QUEST_REWARDS.baseGold)
      )
    })
  })

  it("stores the giver, day and a unique id", () => {
    const ids = new Set(quests.map(({ quest }) => quest.id))

    expect(ids.size).toBe(quests.length)

    quests.forEach(({ giver, quest }) => {
      expect(quest.giverId).toBe(giver.id)
      expect(quest.acceptedDay).toBe(player.character.day)
    })
  })

  it("pitch has no unresolved placeholders", () => {
    quests.forEach(({ quest }) => {
      expect(quest.pitch).not.toMatch(/\{\w+\}/)
      expect(quest.pitch.length).toBeGreaterThan(0)
    })
  })

  it("quest templates use only known placeholders", () => {
    const known = new Set<string>([
      ...DIALOGUE_PLACEHOLDERS,
      ...QUEST_PLACEHOLDERS,
    ])
    const templates = [
      ...Object.values(QUEST_PITCHES).flat(),
      ...Object.values(QUEST_LINES).flat(),
    ]

    templates.forEach((text) => {
      const keys = [...text.matchAll(/\{(\w+)\}/g)].map((match) => match[1])

      keys.forEach((key) => {
        expect(known, `{${key}} in "${text}"`).toContain(key)
      })
    })
  })

  it("quest texts have no em dashes", () => {
    const templates = [
      ...Object.values(QUEST_PITCHES).flat(),
      ...Object.values(QUEST_LINES).flat(),
    ]

    templates.forEach((text) => {
      expect(text).not.toMatch(/—/)
    })
  })
})

const itemValue = (reward: QuestReward) =>
  reward.item ? reward.item.quantity * MERCHANDISE[reward.item.name].buy : 0
