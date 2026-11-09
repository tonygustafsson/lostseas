import { describe, expect, it, vi } from "vitest"

import {
  DONE_TALKING_LINES,
  NPC_LINES,
  PERSONALITIES,
  TIRED_LINES,
} from "@/constants/dialogue"
import { TOWNS } from "@/constants/locations"
import { getNpcAt, NPCS, PLACEMENT_LOCATION } from "@/constants/npcs"
import { MAX_ACTIVE_QUESTS, QUEST_LINES } from "@/constants/quests"
import {
  abandonQuest,
  acceptQuest,
  answerNpc,
  declineQuest,
  handInQuest,
  talkTo,
} from "@/utils/actions/npc"
import { startJourney } from "@/utils/actions/sea"
import type { ActionResult } from "@/utils/actions/types"
import { resolvePlaceholders } from "@/utils/npc/placeholders"
import { patchDeep } from "@/utils/patchDeep"

import { createTestPlayer, deepFreeze } from "../helpers/createTestPlayer"
import { createSeededRandom } from "../helpers/seededRandom"

vi.mock("server-only", () => ({}))

const GIVER = getNpcAt("Port Royale", "tavern")
const HAVANA_MARKET = getNpcAt("Havana", "market")
const TORTUGA_TAVERN = getNpcAt("Tortuga", "tavern")
const PANAMA_TAVERN = getNpcAt("Panama", "tavern")

const UNRESOLVED = /\{\w+\}/

const TALKS = 5

/** A player standing where the NPC can be found */
const nextTo = (npc: Npc, overrides: DeepPartial<Player> = {}) =>
  deepFreeze(
    patchDeep<Player>(
      createTestPlayer({
        character: {
          town: npc.town,
          location: PLACEMENT_LOCATION[npc.placement],
        },
      }),
      overrides
    )
  )

const moveTo = (player: Player, npc: Npc) =>
  deepFreeze(
    patchDeep<Player>(player, {
      character: {
        town: npc.town,
        location: PLACEMENT_LOCATION[npc.placement],
      },
      locationStates: null,
    })
  )

const expectSuccess = <T extends object>(result: ActionResult<T>) => {
  if ("error" in result) {
    throw new Error(`Expected success but got error: ${result.error}`)
  }

  return result
}

const questBase = {
  giverId: GIVER.id,
  acceptedDay: 1,
  pitch: "A pitch.",
  reward: { gold: 500 },
}

/** Deliveries to a town the tests never visit, so they never get in the way */
const fiveQuests = () =>
  Object.fromEntries(
    Array.from({ length: MAX_ACTIVE_QUESTS }, (_, index) => [
      `busy-${index}`,
      {
        ...questBase,
        id: `busy-${index}`,
        type: "delivery",
        parcel: "a sealed letter",
        targetNpcId: getNpcAt("Bonaire", "market").id,
      },
    ])
  ) as Record<string, Quest>

/** First seed whose talk passes the check */
const findTalk = (
  player: Player,
  npc: Npc,
  check: (line: { kind: string }) => boolean
) => {
  for (let seed = 0; seed < 1000; seed++) {
    const result = talkTo(
      player,
      { npcId: npc.id },
      createSeededRandom(seed).int
    )

    if (!("error" in result) && check(result.data.line)) {
      return result
    }
  }

  throw new Error("No seed found")
}

/** Does the text come from one of the templates once placeholders are filled? */
const fromTemplate = (text: string, templates: string[]) =>
  templates.some((template) =>
    new RegExp(
      `^${template
        .replace(/[.*+?^$()|[\]\\]/g, "\\$&")
        .replace(/\{\w+\}/g, ".+")}$`,
      "i"
    ).test(text)
  )

const findEntry = (npc: Npc, id: string) =>
  [...PERSONALITIES[npc.personality], ...(NPC_LINES[npc.id] ?? [])].find(
    (entry) => entry.id === id
  )!

describe("talkTo", () => {
  it("rejects talking to an NPC in another town or building", () => {
    const player = nextTo(GIVER)

    for (const npcId of [
      HAVANA_MARKET.id,
      getNpcAt("Port Royale", "market").id,
      "nobody",
    ]) {
      expect(talkTo(player, { npcId })).toEqual({
        error: "There is no one by that name here.",
      })
    }
  })

  it("stays tired for the rest of the visit", () => {
    const tired = deepFreeze(
      nextTo(GIVER, {
        locationStates: {
          conversations: { [GIVER.id]: { questRolled: true, tired: true } },
        },
      })
    )

    for (let seed = 0; seed < 20; seed++) {
      const result = expectSuccess(
        talkTo(tired, { npcId: GIVER.id }, createSeededRandom(seed).int)
      )
      const { line } = result.data

      expect(line.kind).toBe("tired")
      expect(fromTemplate(line.text, DONE_TALKING_LINES)).toBe(true)
      expect(line.text).not.toMatch(UNRESOLVED)
      expect(result.player).toBe(tired)
    }
  })

  it("a farewell makes the NPC tired", () => {
    const result = findTalk(
      nextTo(GIVER, { quests: fiveQuests() }),
      GIVER,
      (line) => "farewell" in line && !!line.farewell
    )

    expect(result.player.locationStates?.conversations?.[GIVER.id].tired).toBe(
      true
    )
  })

  it("now and then the NPC tires of talking", () => {
    const player = nextTo(GIVER, { quests: fiveQuests() })
    let tired = 0

    for (let seed = 0; seed < 300; seed++) {
      const { line } = expectSuccess(
        talkTo(player, { npcId: GIVER.id }, createSeededRandom(seed).int)
      ).data

      if ("farewell" in line && line.farewell) {
        expect(fromTemplate(line.farewell, TIRED_LINES)).toBe(true)
        expect(line.farewell).not.toMatch(UNRESOLVED)
        tired++
      }
    }

    // Roughly one line in three
    expect(tired).toBeGreaterThan(60)
    expect(tired).toBeLessThan(140)
  })

  it("only rolls for a quest on the first chat of a visit", () => {
    for (let seed = 0; seed < 200; seed++) {
      const random = createSeededRandom(seed).int
      const first = expectSuccess(
        talkTo(nextTo(GIVER), { npcId: GIVER.id }, random)
      )

      expect(
        first.player.locationStates?.conversations?.[GIVER.id].questRolled
      ).toBe(true)

      if (first.data.line.kind === "questOffer") {
        continue
      }

      let player = deepFreeze(first.player)

      for (let talk = 0; talk < TALKS; talk++) {
        const result = expectSuccess(
          talkTo(player, { npcId: GIVER.id }, random)
        )

        expect(result.data.line.kind).not.toBe("questOffer")
        player = deepFreeze(result.player)
      }
    }
  })

  it("conversations reset when a journey starts", () => {
    const player = deepFreeze(
      createTestPlayer({
        character: { location: "Harbor" },
        crewMembers: { count: 10, health: 100, mood: 80 },
        inventory: { food: 50, water: 100, cannons: 5 },
        locationStates: {
          conversations: { [GIVER.id]: { questRolled: true } },
        },
      })
    )

    const result = startJourney(player, { town: "Havana" })

    if (!("player" in result)) {
      throw new Error("Expected a journey")
    }

    expect(result.player.locationStates?.conversations).toBeUndefined()
  })

  it("does not repeat lines in one visit", () => {
    for (let seed = 0; seed < 50; seed++) {
      const random = createSeededRandom(seed).int
      let player = nextTo(GIVER, { quests: fiveQuests() })

      let talks = 0

      // Until the NPC tires of talking
      while (
        talks < TALKS &&
        !player.locationStates?.conversations?.[GIVER.id]?.tired
      ) {
        player = expectSuccess(
          talkTo(player, { npcId: GIVER.id }, random)
        ).player
        talks++
      }

      const saidIds =
        player.locationStates?.conversations?.[GIVER.id].saidIds ?? []

      expect(saidIds).toHaveLength(talks)
      expect(new Set(saidIds).size).toBe(talks)
    }
  })

  it("offers no quests with 5 active quests", () => {
    const player = nextTo(GIVER, { quests: fiveQuests() })

    for (let seed = 0; seed < 100; seed++) {
      const result = expectSuccess(
        talkTo(player, { npcId: GIVER.id }, createSeededRandom(seed).int)
      )

      expect(result.data.line.kind).not.toBe("questOffer")
    }
  })

  it("no returned text contains unresolved placeholders", () => {
    for (let seed = 0; seed < 100; seed++) {
      const npc = NPCS[seed % NPCS.length]
      const random = createSeededRandom(seed).int
      let player = nextTo(npc)

      for (let talk = 0; talk < TALKS; talk++) {
        const result = expectSuccess(talkTo(player, { npcId: npc.id }, random))
        const { line } = result.data

        expect(line.text).not.toMatch(UNRESOLVED)
        player = deepFreeze(result.player)

        if (line.kind === "question") {
          const asked = player

          line.answers.forEach((answer, answerIndex) => {
            expect(answer).not.toMatch(UNRESOLVED)

            const answered = expectSuccess(
              answerNpc(asked, { npcId: npc.id, answerIndex }, random)
            )

            expect(answered.data.reply).not.toMatch(UNRESOLVED)
            player = deepFreeze(answered.player)
          })
        }
      }
    }

    // Quest progress lines with their own extras
    const quests = {
      find: {
        ...questBase,
        id: "find",
        type: "findPerson",
        personName: "Diego Navarro",
        nation: "Spain",
        hiddenTown: "Havana",
      },
    } as Record<string, Quest>

    for (let seed = 0; seed < 30; seed++) {
      const result = expectSuccess(
        talkTo(
          nextTo(PANAMA_TAVERN, { quests }),
          { npcId: PANAMA_TAVERN.id },
          createSeededRandom(seed).int
        )
      )

      expect(result.data.line.text).not.toMatch(UNRESOLVED)
    }
  })
})

describe("answerNpc", () => {
  it("stores a question and answers it", () => {
    const asked = findTalk(
      nextTo(GIVER),
      GIVER,
      (line) => line.kind === "question"
    )
    const player = deepFreeze(asked.player)
    const pendingId =
      player.locationStates?.conversations?.[GIVER.id].pendingQuestionId

    expect(pendingId).toBeDefined()

    const entry = findEntry(GIVER, pendingId!)
    const result = expectSuccess(
      answerNpc(
        player,
        { npcId: GIVER.id, answerIndex: 1 },
        createSeededRandom(3).int
      )
    )

    expect(fromTemplate(result.data.reply, entry.answers![1].replies)).toBe(
      true
    )
    expect(
      result.player.locationStates?.conversations?.[GIVER.id].pendingQuestionId
    ).toBeUndefined()
  })

  it("keeps placeholder values the same in the question and the reply", () => {
    let checked = 0

    for (let seed = 0; seed < 400 && checked < 10; seed++) {
      const result = talkTo(
        nextTo(GIVER),
        { npcId: GIVER.id },
        createSeededRandom(seed).int
      )

      if ("error" in result || result.data.line.kind !== "question") {
        continue
      }

      const conversation =
        result.player.locationStates?.conversations?.[GIVER.id]
      const values = conversation?.pendingValues

      if (!values) {
        continue
      }

      const entry = findEntry(GIVER, conversation.pendingQuestionId!)
      const context = { player: result.player, town: GIVER.town }
      const resolve = (text: string) =>
        resolvePlaceholders(text, { ...context, extra: values })

      expect(result.data.line.text).toBe(resolve(entry.text))

      entry.answers!.forEach((answer, answerIndex) => {
        const answered = expectSuccess(
          answerNpc(
            deepFreeze(result.player),
            { npcId: GIVER.id, answerIndex },
            createSeededRandom(seed).int
          )
        )

        expect(answer.replies.map(resolve)).toContain(answered.data.reply)
        expect(
          answered.player.locationStates?.conversations?.[GIVER.id]
            .pendingValues
        ).toBeUndefined()
      })

      checked++
    }

    expect(checked).toBeGreaterThan(0)
  })

  it("rejects answering without a question or with a bad index", () => {
    expect(
      answerNpc(nextTo(GIVER), { npcId: GIVER.id, answerIndex: 0 })
    ).toEqual({ error: "There is no question to answer." })

    const player = deepFreeze(
      findTalk(nextTo(GIVER), GIVER, (line) => line.kind === "question").player
    )

    for (const answerIndex of [-1, 1.5, 99, "0"]) {
      expect(
        answerNpc(player, { npcId: GIVER.id, answerIndex } as never)
      ).toEqual({ error: "Not a valid answer." })
    }
  })
})

describe("quest offers", () => {
  const offered = () =>
    findTalk(nextTo(GIVER), GIVER, (line) => line.kind === "questOffer")

  it("refuses to accept a sixth quest", () => {
    const player = deepFreeze(
      patchDeep<Player>(offered().player, { quests: fiveQuests() })
    )

    expect(acceptQuest(player, { npcId: GIVER.id })).toEqual({
      error: "You already have 5 active quests.",
    })
  })

  it("accepting adds the quest and logs it", () => {
    const offer = offered()
    const player = deepFreeze(
      patchDeep<Player>(offer.player, { character: { day: 42 } })
    )
    const result = expectSuccess(
      acceptQuest(player, { npcId: GIVER.id }, createSeededRandom(1).int)
    )
    const { quest, text } = result.data

    expect(fromTemplate(text, QUEST_LINES.accept)).toBe(true)
    expect(text).not.toMatch(UNRESOLVED)
    expect(offer.data.line.kind).toBe("questOffer")
    // An offer as the first talk leaves no empty list behind
    expect(
      offer.player.locationStates?.conversations?.[GIVER.id]
    ).not.toHaveProperty("saidIds")
    expect(quest.acceptedDay).toBe(42)
    expect(result.player.quests?.[quest.id]).toEqual(quest)
    expect(
      result.player.locationStates?.conversations?.[GIVER.id].questOffer
    ).toBeUndefined()
    expect(result.log).toEqual({
      type: "quest",
      message: `Accepted a quest from ${GIVER.name} of ${GIVER.town}.`,
    })
  })

  it("an open offer comes back on the next talk", () => {
    const offer = offered()
    const again = expectSuccess(
      talkTo(
        deepFreeze(offer.player),
        { npcId: GIVER.id },
        createSeededRandom(2).int
      )
    )

    expect(again.data.line).toEqual(offer.data.line)
    expect(again.player).toBe(offer.player)
  })

  it("declining clears the offer", () => {
    const player = deepFreeze(offered().player)
    const result = expectSuccess(
      declineQuest(player, { npcId: GIVER.id }, createSeededRandom(1).int)
    )

    expect(fromTemplate(result.data.text, QUEST_LINES.decline)).toBe(true)
    expect(
      result.player.locationStates?.conversations?.[GIVER.id].questOffer
    ).toBeUndefined()
    expect(result.player.quests).toBeUndefined()
    expect(declineQuest(result.player, { npcId: GIVER.id })).toHaveProperty(
      "error"
    )
  })

  it("abandoning removes the quest and logs it", () => {
    const player = nextTo(HAVANA_MARKET, { quests: fiveQuests() })
    const result = expectSuccess(abandonQuest(player, { questId: "busy-0" }))

    expect(result.data.quest.id).toBe("busy-0")
    expect(result.player.quests?.["busy-0"]).toBeUndefined()
    expect(Object.keys(result.player.quests ?? {})).toHaveLength(4)
    expect(result.log).toEqual({
      type: "quest",
      message: `Abandoned a quest for ${GIVER.name} of ${GIVER.town}.`,
    })
    expect(abandonQuest(player, { questId: "nope" })).toHaveProperty("error")
  })
})

describe("quest progress", () => {
  it("delivers a parcel and pays the reward", () => {
    const player = nextTo(HAVANA_MARKET, {
      character: { questsCompleted: 2 },
      inventory: { rum: 5 },
      locationStates: {
        conversations: { [HAVANA_MARKET.id]: { questRolled: true } },
      },
      quests: {
        parcel: {
          ...questBase,
          id: "parcel",
          type: "delivery",
          parcel: "a sealed letter",
          targetNpcId: HAVANA_MARKET.id,
          reward: { gold: 500, item: { name: "rum", quantity: 10 } },
        },
      },
    })

    const result = expectSuccess(
      talkTo(player, { npcId: HAVANA_MARKET.id }, createSeededRandom(1).int)
    )
    const { line } = result.data

    expect(line.kind).toBe("questProgress")
    expect(line.text).not.toMatch(UNRESOLVED)
    expect(line).toMatchObject({
      completed: true,
      reward: { gold: 500, item: { name: "rum", quantity: 10 } },
    })
    expect(result.player.character.gold).toBe(1500)
    expect(result.player.inventory?.rum).toBe(15)
    expect(result.player.character.questsCompleted).toBe(3)
    expect(result.player.quests?.parcel).toBeUndefined()
    expect(result.log).toEqual({
      type: "quest",
      message: `Completed a quest for ${GIVER.name} of ${GIVER.town}.`,
    })
  })

  it.each([
    { rum: 265, received: { gold: 500, item: { name: "rum", quantity: 5 } } },
    { rum: 270, received: { gold: 500 } },
  ])(
    "only pays reward goods that fit in the hold ($rum rum aboard)",
    ({ rum, received }) => {
      // The Brig holds 300, with 10 food and 20 water already aboard
      const player = nextTo(HAVANA_MARKET, {
        inventory: { rum },
        locationStates: {
          conversations: { [HAVANA_MARKET.id]: { questRolled: true } },
        },
        quests: {
          parcel: {
            ...questBase,
            id: "parcel",
            type: "delivery",
            parcel: "a sealed letter",
            targetNpcId: HAVANA_MARKET.id,
            reward: { gold: 500, item: { name: "rum", quantity: 10 } },
          },
        },
      })

      const result = expectSuccess(
        talkTo(player, { npcId: HAVANA_MARKET.id }, createSeededRandom(1).int)
      )

      expect(result.data.line).toMatchObject({ reward: received })
      expect(result.player.inventory?.rum).toBe(
        rum + (received.item?.quantity ?? 0)
      )
    }
  )

  it("procurement asks before taking the goods, and only with the full amount", () => {
    const quests = {
      goods: {
        ...questBase,
        id: "goods",
        type: "procurement",
        item: "rum",
        quantity: 40,
      },
    } as Record<string, Quest>

    const short = expectSuccess(
      talkTo(
        nextTo(GIVER, { inventory: { rum: 30 }, quests }),
        { npcId: GIVER.id },
        createSeededRandom(1).int
      )
    )

    expect(short.data.line.kind).not.toBe("handIn")
    expect(short.player.inventory?.rum).toBe(30)

    const player = nextTo(GIVER, { inventory: { rum: 45 }, quests })
    const asked = expectSuccess(
      talkTo(player, { npcId: GIVER.id }, createSeededRandom(1).int)
    )

    // Asking takes nothing
    expect(asked.data.line.kind).toBe("handIn")
    expect(asked.data.line.text).not.toMatch(UNRESOLVED)
    expect(asked.player.inventory?.rum).toBe(45)

    // "Not yet" chats instead
    const chat = expectSuccess(
      talkTo(
        player,
        { npcId: GIVER.id, skipHandIn: true },
        createSeededRandom(1).int
      )
    )

    expect(["statement", "question", "questOffer"]).toContain(
      chat.data.line.kind
    )
    expect(chat.player.inventory?.rum).toBe(45)

    const full = expectSuccess(
      handInQuest(player, { npcId: GIVER.id }, createSeededRandom(1).int)
    )

    expect(full.data.line).toMatchObject({
      kind: "questProgress",
      completed: true,
    })
    expect(full.data.line.text).not.toMatch(UNRESOLVED)
    expect(full.player.inventory?.rum).toBe(5)
    expect(full.player.character.gold).toBe(1500)
    expect(full.player.character.questsCompleted).toBe(1)
    expect(full.player.quests?.goods).toBeUndefined()
  })

  it("refuses to hand in without the goods", () => {
    const quests = {
      goods: {
        ...questBase,
        id: "goods",
        type: "procurement",
        item: "rum",
        quantity: 40,
      },
    } as Record<string, Quest>

    expect(
      handInQuest(nextTo(GIVER, { inventory: { rum: 30 }, quests }), {
        npcId: GIVER.id,
      })
    ).toEqual({ error: "You have nothing to hand over." })
  })

  it("message chain advances step by step and completes at the giver", () => {
    const random = createSeededRandom(1).int
    const quests = {
      chain: {
        ...questBase,
        id: "chain",
        type: "messageChain",
        stepNpcIds: [HAVANA_MARKET.id, TORTUGA_TAVERN.id, GIVER.id],
        step: 0,
      },
    } as Record<string, Quest>

    // The second stop has nothing to say about it yet
    const early = expectSuccess(
      talkTo(
        nextTo(TORTUGA_TAVERN, { quests }),
        { npcId: TORTUGA_TAVERN.id },
        random
      )
    )

    expect(early.data.line.kind).not.toBe("questProgress")

    const first = expectSuccess(
      talkTo(
        nextTo(HAVANA_MARKET, { quests }),
        { npcId: HAVANA_MARKET.id },
        random
      )
    )

    expect(first.data.line).toMatchObject({
      kind: "questProgress",
      completed: false,
    })
    expect(first.data.line.text).not.toMatch(UNRESOLVED)
    expect(first.data.line.text).toMatch(/Tortuga|Manon Artaud/)
    expect(first.player.quests?.chain).toMatchObject({ step: 1 })
    expect(first.log).toBeUndefined()

    const second = expectSuccess(
      talkTo(
        moveTo(first.player, TORTUGA_TAVERN),
        { npcId: TORTUGA_TAVERN.id },
        random
      )
    )

    expect(second.data.line).toMatchObject({ completed: false })
    expect(second.data.line.text).toMatch(/Port Royale|Ursula Cole/)
    expect(second.player.quests?.chain).toMatchObject({ step: 2 })

    const last = expectSuccess(
      talkTo(moveTo(second.player, GIVER), { npcId: GIVER.id }, random)
    )

    expect(last.data.line).toMatchObject({
      kind: "questProgress",
      completed: true,
      reward: { gold: 500 },
    })
    expect(last.player.quests?.chain).toBeUndefined()
    expect(last.player.character.gold).toBe(1500)
    expect(last.log?.type).toBe("quest")
  })

  it("find person rules out wrong towns and finds the person", () => {
    const spanishTowns = (Object.keys(TOWNS) as Town[]).filter(
      (town) => TOWNS[town].nation === "Spain"
    )
    const quests = {
      find: {
        ...questBase,
        id: "find",
        type: "findPerson",
        personName: "Diego Navarro",
        nation: "Spain",
        hiddenTown: "Havana",
      },
    } as Record<string, Quest>
    let hints = 0

    for (let seed = 0; seed < 50; seed++) {
      const result = expectSuccess(
        talkTo(
          nextTo(PANAMA_TAVERN, { quests }),
          { npcId: PANAMA_TAVERN.id },
          createSeededRandom(seed).int
        )
      )
      const quest = result.player.quests?.find as Extract<
        Quest,
        { type: "findPerson" }
      >

      expect(result.data.line).toMatchObject({
        kind: "questProgress",
        completed: false,
      })
      expect(result.data.line.text).not.toMatch(UNRESOLVED)
      expect(quest.ruledOut).toContain("Panama")
      expect(quest.ruledOut).not.toContain("Havana")
      quest.ruledOut?.forEach((town) => {
        expect(spanishTowns).toContain(town)
      })

      if (quest.ruledOut!.length > 1) {
        hints++
      }
    }

    expect(hints).toBeGreaterThan(0)

    const random = createSeededRandom(1).int
    const ruledOut = expectSuccess(
      talkTo(
        nextTo(PANAMA_TAVERN, { quests }),
        { npcId: PANAMA_TAVERN.id },
        random
      )
    )

    const again = expectSuccess(
      talkTo(deepFreeze(ruledOut.player), { npcId: PANAMA_TAVERN.id }, random)
    )

    expect(again.data.line.kind).not.toBe("questProgress")

    // The governor knows nothing about missing people
    const governor = getNpcAt("Havana", "governor")
    const asked = expectSuccess(
      talkTo(moveTo(again.player, governor), { npcId: governor.id }, random)
    )

    expect(asked.data.line.kind).not.toBe("questProgress")

    const found = expectSuccess(
      talkTo(
        moveTo(again.player, HAVANA_MARKET),
        { npcId: HAVANA_MARKET.id },
        random
      )
    )

    expect(found.data.line).toMatchObject({
      kind: "questProgress",
      completed: false,
    })
    expect(found.data.line.text).not.toMatch(UNRESOLVED)
    expect(found.player.quests?.find).toMatchObject({ found: true })

    const done = expectSuccess(
      talkTo(moveTo(found.player, GIVER), { npcId: GIVER.id }, random)
    )

    expect(done.data.line).toMatchObject({
      kind: "questProgress",
      completed: true,
    })
    expect(done.player.quests?.find).toBeUndefined()
    expect(done.player.character.questsCompleted).toBe(1)
  })
})
