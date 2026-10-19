import { describe, expect, it } from "vitest"

import { dismissCrew, giveGold, giveMedicine } from "@/utils/actions/crew"
import type { ActionResult } from "@/utils/actions/types"
import { getGoldEffectiveness, getMedicineEffectiveness } from "@/utils/crew"

import { createTestPlayer, deepFreeze } from "../helpers/createTestPlayer"
import { createSeededRandom } from "../helpers/seededRandom"

const INVALID_AMOUNTS: unknown[] = [
  0,
  -1,
  1.5,
  "1.5",
  "abc",
  "",
  null,
  undefined,
  Number.NaN,
  Number.POSITIVE_INFINITY,
  Number.MAX_SAFE_INTEGER + 1,
]

const expectSuccess = <T extends object>(result: ActionResult<T>) => {
  if ("error" in result) {
    throw new Error(`Expected success but got error: ${result.error}`)
  }

  return result
}

const expectError = (result: ActionResult, error: string) => {
  expect(result).toEqual({ error })
}

describe("dismissCrew", () => {
  it("dismisses crew members", () => {
    const result = expectSuccess(
      dismissCrew(deepFreeze(createTestPlayer()), { count: 5 })
    )

    expect(result.player.crewMembers.count).toBe(15)
    expect(result.log).toBe("Dismissed 5 crew members. New crew count is 15.")
    expect(result.data).toEqual({ count: 5, newCount: 15 })
  })

  it("can dismiss the whole crew", () => {
    const result = expectSuccess(dismissCrew(createTestPlayer(), { count: 20 }))

    expect(result.player.crewMembers.count).toBe(0)
  })

  it("accepts a whole number sent as text", () => {
    const result = expectSuccess(
      dismissCrew(createTestPlayer(), { count: "3" })
    )

    expect(result.data.count).toBe(3)
  })

  it.each(INVALID_AMOUNTS)(
    "rejects %s instead of saving a broken crew count",
    (count) => {
      expectError(
        dismissCrew(createTestPlayer(), { count } as never),
        "You need to dismiss at least 1 crew member"
      )
    }
  )

  it("rejects dismissing more crew than the player has", () => {
    expectError(
      dismissCrew(createTestPlayer(), { count: 21 }),
      "Not enough crew members to dismiss"
    )
  })
})

describe("giveGold", () => {
  it("raises mood by gold per crew member", () => {
    // 100 gold for 20 crew raises mood by 5
    const player = deepFreeze(createTestPlayer({ crewMembers: { mood: 50 } }))

    const result = expectSuccess(giveGold(player, { gold: 100 }))

    expect(result.player.character.gold).toBe(900)
    expect(result.player.crewMembers.mood).toBe(55)
    expect(result.data).toEqual({ gold: 100, newMood: 55 })
  })

  it("caps mood at 100, as the guide says", () => {
    const result = expectSuccess(
      giveGold(createTestPlayer({ crewMembers: { mood: 99 } }), { gold: 1000 })
    )

    expect(result.player.crewMembers.mood).toBe(100)
  })

  it("can spend the last gold coin", () => {
    const player = createTestPlayer({ character: { gold: 20 } })

    const result = expectSuccess(giveGold(player, { gold: 20 }))

    expect(result.player.character.gold).toBe(0)
  })

  it.each(INVALID_AMOUNTS)("rejects %s gold", (gold) => {
    expectError(
      giveGold(createTestPlayer(), { gold } as never),
      "You need to give at least 1 doubloon"
    )
  })

  it("rejects giving gold without a crew", () => {
    expectError(
      giveGold(createTestPlayer({ crewMembers: { count: 0 } }), { gold: 10 }),
      "You have no crew to give gold to."
    )
  })

  it("rejects giving gold when mood is already 100", () => {
    expectError(
      giveGold(createTestPlayer({ crewMembers: { mood: 100 } }), { gold: 10 }),
      "Your crew's mood is already at 100%."
    )
  })

  it("rejects giving more gold than the player has", () => {
    expectError(giveGold(createTestPlayer(), { gold: 1001 }), "Not enough gold")
  })
})

describe("giveMedicine", () => {
  it("raises health by medicine per crew member", () => {
    // 4 boxes for 20 crew raise health by 4
    const player = deepFreeze(
      createTestPlayer({
        crewMembers: { health: 50 },
        inventory: { medicine: 10 },
      })
    )

    const result = expectSuccess(giveMedicine(player, { medicine: 4 }))

    expect(result.player.inventory?.medicine).toBe(6)
    expect(result.player.crewMembers.health).toBe(54)
    expect(result.data).toEqual({ medicine: 4, newHealth: 54 })
  })

  it("caps health at 100, as the guide says", () => {
    const player = createTestPlayer({
      crewMembers: { health: 99 },
      inventory: { medicine: 500 },
    })

    const result = expectSuccess(giveMedicine(player, { medicine: 500 }))

    expect(result.player.crewMembers.health).toBe(100)
  })

  it.each(INVALID_AMOUNTS)("rejects %s medicine", (medicine) => {
    expectError(
      giveMedicine(
        createTestPlayer({
          crewMembers: { health: 50 },
          inventory: { medicine: 5 },
        }),
        { medicine } as never
      ),
      "You need to give at least 1 box of medicine"
    )
  })

  it("rejects giving medicine without a crew", () => {
    const player = createTestPlayer({
      crewMembers: { count: 0, health: 50 },
      inventory: { medicine: 5 },
    })

    expectError(
      giveMedicine(player, { medicine: 1 }),
      "You have no crew to give medicine to."
    )
  })

  it("rejects giving medicine when health is already 100", () => {
    const player = createTestPlayer({ inventory: { medicine: 5 } })

    expectError(
      giveMedicine(player, { medicine: 1 }),
      "Your crew's health is already at 100%."
    )
  })

  it("rejects giving more medicine than the player has", () => {
    const player = createTestPlayer({
      crewMembers: { health: 50 },
      inventory: { medicine: 2 },
    })

    expectError(giveMedicine(player, { medicine: 3 }), "Not enough medicine")
  })
})

describe("random crew management", () => {
  it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])(
    "keeps the crew consistent with seed %i",
    (seed) => {
      const random = createSeededRandom(seed)
      const AMOUNTS: unknown[] = [1, 2, 5, 10, 50, 0, -1, "3", "x", 1.5]

      let player = createTestPlayer({
        character: { gold: random.int(0, 3000) },
        crewMembers: {
          count: random.int(0, 60),
          health: random.int(0, 100),
          mood: random.int(-10, 100),
        },
        inventory: { medicine: random.int(0, 50) },
      })

      const succeededActions = new Set<number>()

      for (let step = 0; step < 1000; step++) {
        // Sometimes the crew grows, gets hurt or unhappy, and gold comes in
        if (random.int(0, 4) === 0) {
          player = {
            ...player,
            character: {
              ...player.character,
              gold: player.character.gold + random.int(0, 500),
            },
            crewMembers: {
              count: player.crewMembers.count + random.int(0, 10),
              health: random.int(0, 100),
              mood: random.int(-10, 100),
            },
            inventory: {
              ...player.inventory,
              medicine: (player.inventory?.medicine ?? 0) + random.int(0, 10),
            },
          }
        }

        const before = deepFreeze(structuredClone(player))
        const action = random.int(0, 2)
        const amount = random.pick(AMOUNTS) as number
        const context = `seed ${seed}, step ${step}, action ${action}, amount ${String(amount)}`

        const result =
          action === 0
            ? dismissCrew(before, { count: amount })
            : action === 1
              ? giveGold(before, { gold: amount })
              : giveMedicine(before, { medicine: amount })

        if ("error" in result) {
          expect(result.error, context).toBeTruthy()
          continue
        }

        succeededActions.add(action)

        const after = result.player
        const crew = after.crewMembers

        expect(Number.isSafeInteger(crew.count), context).toBe(true)
        expect(crew.count, context).toBeGreaterThanOrEqual(0)
        expect(crew.health, context).toBeGreaterThanOrEqual(0)
        expect(crew.health, context).toBeLessThanOrEqual(100)
        expect(crew.mood, context).toBeLessThanOrEqual(100)
        expect(after.character.gold, context).toBeGreaterThanOrEqual(0)
        expect(after.inventory?.medicine ?? 0, context).toBeGreaterThanOrEqual(
          0
        )
        expect(after.ships, context).toEqual(before.ships)

        if (action === 0) {
          const { count } = result.data as { count: number }
          expect(before.crewMembers.count - crew.count, context).toBe(count)
        }

        if (action === 1) {
          const { gold } = result.data as { gold: number }
          expect(before.character.gold - after.character.gold, context).toBe(
            gold
          )
          expect(crew.mood, context).toBe(
            getGoldEffectiveness(
              before.crewMembers.count,
              before.crewMembers.mood,
              gold
            )
          )
          expect(crew.mood, context).toBeGreaterThanOrEqual(
            before.crewMembers.mood
          )
        }

        if (action === 2) {
          const { medicine } = result.data as { medicine: number }
          expect(
            (before.inventory?.medicine ?? 0) -
              (after.inventory?.medicine ?? 0),
            context
          ).toBe(medicine)
          expect(crew.health, context).toBe(
            getMedicineEffectiveness(
              before.crewMembers.count,
              before.crewMembers.health,
              medicine
            )
          )
        }

        player = after
      }

      // Guards against random play that only ever hits errors
      expect(succeededActions.size).toBe(3)
    }
  )
})
