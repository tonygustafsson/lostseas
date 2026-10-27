import { describe, expect, it } from "vitest"

import { CARDS_PERCENTAGE_VALUES, TAVERN_ITEMS } from "@/constants/tavern"
import {
  acceptSailors,
  fightSailors,
  ignoreSailors,
  playCards,
  type TavernItem,
  treatCrew,
} from "@/utils/actions/tavern"
import type { ActionResult } from "@/utils/actions/types"
import { patchDeep } from "@/utils/patchDeep"

import { createTestPlayer, deepFreeze } from "../helpers/createTestPlayer"
import { createSeededRandom } from "../helpers/seededRandom"

const TAVERN_ITEM_KEYS = Object.keys(TAVERN_ITEMS) as TavernItem[]

const OTHER_LOCATIONS: TownLocation[] = [
  "Bank",
  "Market",
  "Shop",
  "Shipyard",
  "City hall",
]

const atTavern = (overrides: DeepPartial<Player> = {}) =>
  deepFreeze(
    patchDeep<Player>(
      createTestPlayer({ character: { location: "Tavern", gold: 10_000 } }),
      overrides
    )
  )

const withSailors = (noOfSailors: number, isHostile: boolean) =>
  atTavern({
    locationStates: { tavern: { visited: true, noOfSailors, isHostile } },
  })

/** Returns the given numbers in order, so random outcomes can be chosen. */
const fixedRandom = (...values: number[]) => {
  let index = 0

  return () => values[index++]
}

const expectSuccess = <T extends object>(result: ActionResult<T>) => {
  if ("error" in result) {
    throw new Error(`Expected success but got error: ${result.error}`)
  }

  return result
}

const expectError = (result: ActionResult, error: string) => {
  expect(result).toEqual({ error })
}

describe("treatCrew", () => {
  it.each(TAVERN_ITEM_KEYS)("%s charges every crew member", (item) => {
    const { price, healthIncrease, moodIncrease } = TAVERN_ITEMS[item]
    const player = atTavern({ crewMembers: { health: 50, mood: 50 } })

    const result = expectSuccess(treatCrew(player, { item }))

    expect(result.player.character.gold).toBe(10_000 - price * 20)
    expect(result.player.crewMembers).toEqual({
      count: 20,
      health: 50 + healthIncrease,
      mood: 50 + moodIncrease,
    })
    expect(result.data).toEqual({
      item,
      newMood: 50 + moodIncrease,
      newHealth: 50 + healthIncrease,
      totalPrice: price * 20,
    })
  })

  it.each(TAVERN_ITEM_KEYS)("%s caps health and mood at 100", (item) => {
    const player = atTavern({ crewMembers: { health: 99, mood: 99 } })

    const result = expectSuccess(treatCrew(player, { item }))

    expect(result.player.crewMembers.mood).toBe(100)
    expect(result.player.crewMembers.health).toBe(
      TAVERN_ITEMS[item].healthIncrease > 0 ? 100 : 99
    )
  })

  it("can spend the last gold coin", () => {
    const player = atTavern({ character: { gold: 25 * 20 } })

    const result = expectSuccess(treatCrew(player, { item: "serve-supper" }))

    expect(result.player.character.gold).toBe(0)
  })

  it.each(["gold", "constructor", "", undefined, 5])(
    "rejects item %s",
    (item) => {
      expectError(treatCrew(atTavern(), { item } as never), "Not a valid item")
    }
  )

  it.each(OTHER_LOCATIONS)("rejects treating at the %s", (location) => {
    expectError(
      treatCrew(createTestPlayer({ character: { location } }), {
        item: "serve-supper",
      }),
      "You must be at Tavern to do this."
    )
  })

  it.each(TAVERN_ITEM_KEYS)("%s is rejected without a crew", (item) => {
    expectError(
      treatCrew(atTavern({ crewMembers: { count: 0 } }), { item }),
      "You have no crew to treat."
    )
  })

  it.each(TAVERN_ITEM_KEYS)(
    "%s is rejected when health and mood are already 100",
    (item) => {
      expectError(
        treatCrew(atTavern({ crewMembers: { health: 100, mood: 100 } }), {
          item,
        }),
        `${TAVERN_ITEMS[item].label} would not improve your crew any further.`
      )
    }
  )

  it("rejects mood-only treatments when only health can improve", () => {
    const player = atTavern({ crewMembers: { health: 40, mood: 100 } })

    expectError(
      treatCrew(player, { item: "pass-the-rum" }),
      "Pass the rum would not improve your crew any further."
    )
    expectSuccess(treatCrew(player, { item: "serve-supper" }))
  })

  it("rejects treating with too little gold", () => {
    expectError(
      treatCrew(atTavern({ character: { gold: 25 * 20 - 1 } }), {
        item: "serve-supper",
      }),
      "Not enough gold"
    )
  })
})

describe("acceptSailors", () => {
  it("adds friendly sailors to the crew and clears them", () => {
    const result = expectSuccess(acceptSailors(withSailors(3, false)))

    expect(result.player.crewMembers.count).toBe(23)
    expect(result.player.locationStates?.tavern?.noOfSailors).toBe(0)
    expect(result.log).toMatchObject({
      type: "crew",
      message: "Accepted 3 new crew members.",
    })
    expect(result.data).toEqual({ numberOfSailors: 3, isHostile: false })
  })

  it("can take the crew above the fleet's maximum, as the guide says", () => {
    const player = atTavern({
      crewMembers: { count: 1000 },
      locationStates: { tavern: { noOfSailors: 5, isHostile: false } },
    })

    const result = expectSuccess(acceptSailors(player))

    expect(result.player.crewMembers.count).toBe(1005)
  })

  it("rejects hostile sailors", () => {
    expectError(acceptSailors(withSailors(3, true)), "No sailors to accept")
  })

  it("rejects when there are no sailors", () => {
    expectError(acceptSailors(atTavern()), "No sailors to accept")
    expectError(acceptSailors(withSailors(0, false)), "No sailors to accept")
  })

  it("rejects accepting outside the tavern", () => {
    expectError(
      acceptSailors(
        createTestPlayer({
          locationStates: { tavern: { noOfSailors: 3, isHostile: false } },
        })
      ),
      "You must be at Tavern to do this."
    )
  })
})

describe("fightSailors", () => {
  it("wins, loots gold and loses a little health", () => {
    // win roll 4 (> 3), health loss 5, loot 40
    const result = expectSuccess(
      fightSailors(withSailors(4, true), fixedRandom(4, 5, 40))
    )

    expect(result.player.character.gold).toBe(10_040)
    expect(result.player.crewMembers.health).toBe(95)
    expect(result.player.locationStates?.tavern?.noOfSailors).toBe(0)
    expect(result.data).toEqual({
      won: true,
      numberOfSailors: 4,
      healthLoss: 5,
      loot: 40,
    })
  })

  it("loses, gains no gold and loses more health", () => {
    // win roll 3 (not > 3), health loss 20
    const result = expectSuccess(
      fightSailors(withSailors(4, true), fixedRandom(3, 20))
    )

    expect(result.player.character.gold).toBe(10_000)
    expect(result.player.crewMembers.health).toBe(80)
    expect(result.player.locationStates?.tavern?.noOfSailors).toBe(0)
    expect(result.data).toEqual({
      won: false,
      numberOfSailors: 4,
      healthLoss: 20,
    })
  })

  it("never takes health below 0", () => {
    const player = atTavern({
      crewMembers: { health: 5 },
      locationStates: { tavern: { noOfSailors: 2, isHostile: true } },
    })

    const result = expectSuccess(fightSailors(player, fixedRandom(1, 29)))

    expect(result.player.crewMembers.health).toBe(0)
  })

  it("wins 7 out of 10 rolls", () => {
    const wins = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter((roll) => {
      const result = expectSuccess(
        fightSailors(withSailors(1, true), fixedRandom(roll, 1, 10))
      )

      return result.data.won
    })

    expect(wins).toHaveLength(7)
  })

  it("rejects fighting friendly sailors", () => {
    expectError(fightSailors(withSailors(3, false)), "No sailors to fight")
  })

  it("rejects when there are no sailors", () => {
    expectError(fightSailors(atTavern()), "No sailors to fight")
  })

  it("rejects fighting outside the tavern", () => {
    expectError(
      fightSailors(
        createTestPlayer({
          locationStates: { tavern: { noOfSailors: 3, isHostile: true } },
        })
      ),
      "You must be at Tavern to do this."
    )
  })
})

describe("ignoreSailors", () => {
  it.each([true, false])("clears sailors when hostile is %s", (isHostile) => {
    const player = withSailors(3, isHostile)

    const result = expectSuccess(ignoreSailors(player))

    expect(result.player.locationStates?.tavern?.noOfSailors).toBe(0)
    expect(result.player.crewMembers).toEqual(player.crewMembers)
    expect(result.player.character).toEqual(player.character)
    expect(result.data).toEqual({ numberOfSailors: 3 })
  })

  it("rejects when there are no sailors", () => {
    expectError(ignoreSailors(atTavern()), "No sailors to ignore")
  })

  it("rejects ignoring outside the tavern", () => {
    expectError(
      ignoreSailors(
        createTestPlayer({
          locationStates: { tavern: { noOfSailors: 3, isHostile: true } },
        })
      ),
      "You must be at Tavern to do this."
    )
  })
})

describe("playCards", () => {
  it("wins five times the bet, as the guide's example says", () => {
    const player = atTavern({ character: { gold: 100 } })

    const result = expectSuccess(
      playCards(player, { betPercentage: 100, selectedCard: 2 }, () => 2)
    )

    expect(result.player.character.gold).toBe(600)
    expect(result.data).toEqual({
      bet: 100,
      cardsResults: "won",
      cardsReturns: 500,
      selectedCard: 2,
      correctCard: 2,
      gold: 600,
    })
  })

  it("loses the bet, as the guide's example says", () => {
    const player = atTavern({ character: { gold: 100 } })

    const result = expectSuccess(
      playCards(player, { betPercentage: 100, selectedCard: 2 }, () => 3)
    )

    expect(result.player.character.gold).toBe(0)
    expect(result.data).toMatchObject({ cardsResults: "lost", correctCard: 3 })
  })

  it("does not use bank savings", () => {
    const player = atTavern({ character: { gold: 100, account: 5000 } })

    const result = expectSuccess(
      playCards(player, { betPercentage: 50, selectedCard: 0 }, () => 1)
    )

    expect(result.data.bet).toBe(50)
    expect(result.player.character.account).toBe(5000)
  })

  it("wins with exactly one of the five cards", () => {
    const player = atTavern()

    const wins = [0, 1, 2, 3, 4].filter((correctCard) => {
      const result = expectSuccess(
        playCards(
          player,
          { betPercentage: 10, selectedCard: 2 },
          () => correctCard
        )
      )

      return result.data.cardsResults === "won"
    })

    expect(wins).toEqual([2])
  })

  it.each(CARDS_PERCENTAGE_VALUES)("bets %i percent of the gold", (percent) => {
    const result = expectSuccess(
      playCards(
        atTavern({ character: { gold: 1000 } }),
        { betPercentage: percent, selectedCard: 0 },
        () => 1
      )
    )

    expect(result.data.bet).toBe(Math.floor((percent / 100) * 1000))
  })

  it.each([
    { betPercentage: 0, selectedCard: 0 },
    { betPercentage: 33, selectedCard: 0 },
    { betPercentage: "10", selectedCard: 0 },
    { betPercentage: 10, selectedCard: -1 },
    { betPercentage: 10, selectedCard: 5 },
    { betPercentage: 10, selectedCard: 1.5 },
    { betPercentage: 10, selectedCard: "1" },
    { betPercentage: 10, selectedCard: undefined },
  ])("rejects invalid bet %j", (input) => {
    expectError(playCards(atTavern(), input as never), "Invalid card bet")
  })

  it.each([
    [0, 100],
    [19, 5],
    [9, 10],
  ])(
    "rejects a bet below 1 gold with %i gold at %i percent",
    (gold, percent) => {
      expectError(
        playCards(atTavern({ character: { gold } }), {
          betPercentage: percent,
          selectedCard: 0,
        }),
        "Bet must be at least 1 gold"
      )
    }
  )

  it("rejects playing outside the tavern", () => {
    expectError(
      playCards(createTestPlayer(), { betPercentage: 10, selectedCard: 0 }),
      "You must be at Tavern to do this."
    )
  })
})

describe("random tavern play", () => {
  const LOCATIONS: TownLocation[] = [
    "Tavern",
    "Tavern",
    "Tavern",
    ...OTHER_LOCATIONS,
  ]
  const ITEMS: unknown[] = [...TAVERN_ITEM_KEYS, "gold"]
  const PERCENTAGES: unknown[] = [...CARDS_PERCENTAGE_VALUES, 0, 33]
  const CARDS: unknown[] = [0, 1, 2, 3, 4, 5, -1]

  it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])(
    "keeps the game consistent with seed %i",
    (seed) => {
      const random = createSeededRandom(seed)

      let player = createTestPlayer({
        character: { gold: random.int(0, 5000) },
        crewMembers: {
          count: random.int(1, 100),
          health: random.int(0, 100),
          mood: random.int(0, 100),
        },
      })

      const succeededActions = new Set<number>()

      for (let step = 0; step < 1000; step++) {
        // Sometimes sailors show up, like when entering the tavern
        const noOfSailors =
          random.int(0, 2) === 0
            ? random.int(1, 10)
            : (player.locationStates?.tavern?.noOfSailors ?? 0)

        player = {
          ...player,
          character: {
            ...player.character,
            // Sometimes earn gold elsewhere, so the player does not go broke for good
            gold:
              player.character.gold +
              (random.int(0, 9) === 0 ? random.int(0, 5000) : 0),
            location: random.pick(LOCATIONS),
          },
          locationStates: {
            ...player.locationStates,
            tavern: {
              visited: true,
              noOfSailors,
              isHostile: random.int(0, 1) === 1,
            },
          },
        }

        const before = deepFreeze(structuredClone(player))
        const action = random.int(0, 4)
        const context = `seed ${seed}, step ${step}, action ${action}`

        const result =
          action === 0
            ? treatCrew(before, { item: random.pick(ITEMS) as TavernItem })
            : action === 1
              ? acceptSailors(before)
              : action === 2
                ? fightSailors(before, random.int)
                : action === 3
                  ? ignoreSailors(before)
                  : playCards(
                      before,
                      {
                        betPercentage: random.pick(PERCENTAGES) as number,
                        selectedCard: random.pick(CARDS) as number,
                      },
                      random.int
                    )

        if ("error" in result) {
          expect(result.error, context).toBeTruthy()
          continue
        }

        succeededActions.add(action)

        const after = result.player
        const sailorsBefore = before.locationStates?.tavern?.noOfSailors ?? 0
        const goldEarned = after.character.gold - before.character.gold
        const crewJoined = after.crewMembers.count - before.crewMembers.count

        expect(after.character.location, context).toBe("Tavern")
        expect(after.character.gold, context).toBeGreaterThanOrEqual(0)
        expect(Number.isSafeInteger(after.character.gold), context).toBe(true)
        expect(after.crewMembers.health, context).toBeGreaterThanOrEqual(0)
        expect(after.crewMembers.health, context).toBeLessThanOrEqual(100)
        expect(after.crewMembers.mood, context).toBeLessThanOrEqual(100)
        expect(after.inventory, context).toEqual(before.inventory)
        expect(after.ships, context).toEqual(before.ships)

        // Only accepting friendly sailors changes the crew size
        expect(crewJoined, context).toBe(action === 1 ? sailorsBefore : 0)

        // Every sailor action clears the sailors
        if (action >= 1 && action <= 3) {
          expect(after.locationStates?.tavern?.noOfSailors, context).toBe(0)
        }

        if (action === 0) {
          const { totalPrice } = result.data as { totalPrice: number }
          expect(before.character.gold - after.character.gold, context).toBe(
            totalPrice
          )
        }

        if (action === 2) {
          const { loot = 0 } = result.data as { loot?: number }
          expect(goldEarned, context).toBe(loot)
          expect(loot, context).toBeLessThanOrEqual(99)
        }

        if (action === 4) {
          const { bet, cardsResults } = result.data as {
            bet: number
            cardsResults: string
          }
          expect(goldEarned, context).toBe(
            cardsResults === "won" ? bet * 5 : -bet
          )
        }

        player = after
      }

      // Guards against random play that only ever hits errors
      expect(succeededActions.size).toBe(5)
    }
  )
})
