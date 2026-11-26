import { describe, expect, it } from "vitest"

import { getNpcAt } from "@/constants/npcs"
import { getQuestBusiness } from "@/utils/npc/questBusiness"

import { createTestPlayer } from "../helpers/createTestPlayer"

const giver = getNpcAt("kingston", "tavern")
const other = getNpcAt("kingston", "market")
const governor = getNpcAt("kingston", "governor")
const spanishTavern = getNpcAt("havana", "tavern")

const base = {
  giverId: giver.id,
  acceptedDay: 5,
  pitch: "",
  reward: { gold: 100 },
}

const withQuests = (...quests: Quest[]): Player => {
  const player = createTestPlayer()

  return {
    ...player,
    inventory: { ...player.inventory, rum: 5 },
    quests: Object.fromEntries(quests.map((quest) => [quest.id, quest])),
  }
}

const delivery = (id: string, targetNpcId: string, acceptedDay = 5): Quest => ({
  ...base,
  id,
  acceptedDay,
  type: "delivery",
  parcel: "a letter",
  targetNpcId,
})

const procurement = (quantity: number): Quest => ({
  ...base,
  id: "procurement",
  type: "procurement",
  item: "rum",
  quantity,
})

const messageChain = (step: number): Quest => ({
  ...base,
  id: "chain",
  type: "messageChain",
  stepNpcIds: [other.id, governor.id],
  step,
})

const findPerson = (
  overrides: Partial<Extract<Quest, { type: "findPerson" }>> = {}
): Quest => ({
  ...base,
  id: "find",
  type: "findPerson",
  personName: "Anne",
  nation: "Spain",
  hiddenTown: "campeche",
  ...overrides,
})

describe("getQuestBusiness", () => {
  it("finds nothing when the player has no quests", () => {
    expect(getQuestBusiness(createTestPlayer(), giver)).toBeUndefined()
  })

  it("settles a delivery with the addressee only", () => {
    const quest = delivery("letter", other.id)
    const player = withQuests(quest)

    expect(getQuestBusiness(player, other)).toEqual(quest)
    expect(getQuestBusiness(player, giver)).toBeUndefined()
  })

  describe("procurement", () => {
    it("is settled with the giver once the player carries enough goods", () => {
      const quest = procurement(5)

      expect(getQuestBusiness(withQuests(quest), giver)).toEqual(quest)
    })

    it("waits while the player carries too few goods", () => {
      expect(
        getQuestBusiness(withQuests(procurement(6)), giver)
      ).toBeUndefined()
    })

    it("is not settled with anyone but the giver", () => {
      expect(
        getQuestBusiness(withQuests(procurement(5)), other)
      ).toBeUndefined()
    })

    it("is passed over when the player chose to keep the goods", () => {
      expect(
        getQuestBusiness(withQuests(procurement(5)), giver, true)
      ).toBeUndefined()
    })
  })

  describe("message chain", () => {
    it("follows the step the player has reached", () => {
      expect(getQuestBusiness(withQuests(messageChain(0)), other)).toBeDefined()
      expect(
        getQuestBusiness(withQuests(messageChain(0)), governor)
      ).toBeUndefined()
      expect(
        getQuestBusiness(withQuests(messageChain(1)), governor)
      ).toBeDefined()
      expect(
        getQuestBusiness(withQuests(messageChain(1)), other)
      ).toBeUndefined()
    })
  })

  describe("find person", () => {
    it("is asked about at taverns and markets in the person's nation", () => {
      const player = withQuests(findPerson())

      expect(getQuestBusiness(player, spanishTavern)).toBeDefined()
      expect(
        getQuestBusiness(player, getNpcAt("havana", "market"))
      ).toBeDefined()
    })

    it("is not asked about with governors or in other nations", () => {
      const player = withQuests(findPerson())

      expect(
        getQuestBusiness(player, getNpcAt("havana", "governor"))
      ).toBeUndefined()
      expect(getQuestBusiness(player, other)).toBeUndefined()
    })

    it("skips towns that are ruled out", () => {
      const player = withQuests(findPerson({ ruledOut: ["havana"] }))

      expect(getQuestBusiness(player, spanishTavern)).toBeUndefined()
    })

    it("is not asked about with the giver", () => {
      const player = withQuests(findPerson({ giverId: spanishTavern.id }))

      expect(getQuestBusiness(player, spanishTavern)).toBeUndefined()
    })

    it("goes back to the giver once the person is found", () => {
      const player = withQuests(findPerson({ found: true }))

      expect(getQuestBusiness(player, giver)).toBeDefined()
      expect(getQuestBusiness(player, spanishTavern)).toBeUndefined()
    })
  })

  it("settles the oldest quest first", () => {
    const player = withQuests(
      delivery("newer", other.id, 9),
      delivery("older", other.id, 2)
    )

    expect(getQuestBusiness(player, other)?.id).toBe("older")
  })
})
