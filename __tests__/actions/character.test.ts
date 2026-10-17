import { describe, expect, it } from "vitest"

import { MERCHANDISE } from "@/constants/merchandise"
import { moveToLocation, updateCharacter } from "@/utils/actions/character"
import type { ActionResult } from "@/utils/actions/types"

import { createTestPlayer, deepFreeze } from "../helpers/createTestPlayer"
import { createSeededRandom } from "../helpers/seededRandom"

const TOWN_LOCATIONS: (TownLocation | "Harbor")[] = [
  "Bank",
  "Tavern",
  "Market",
  "Shop",
  "Shipyard",
  "City hall",
  "Harbor",
]

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

describe("moveToLocation", () => {
  it.each(TOWN_LOCATIONS.filter((location) => location !== "Shop"))(
    "moves from the shop to the %s",
    (location) => {
      const player = deepFreeze(
        createTestPlayer({
          locationStates: {
            harbor: { lastHarborReason: "arrived" },
            market: { visited: true, items: {} as LocationStateMarketItems },
            tavern: { visited: true, noOfSailors: 0, isHostile: false },
          },
        })
      )

      const result = expectSuccess(moveToLocation(player, { location }))

      expect(result.player.character.location).toBe(location)
      expect(result.player.locationStates?.harbor?.lastHarborReason).toBe(
        undefined
      )
      // Visiting a location does not advance the calendar, as the guide says
      expect(result.player.character.day).toBe(player.character.day)
    }
  )

  it.each(["Sea", "Moon", "", undefined, 5])(
    "rejects location %s",
    (location) => {
      expectError(
        moveToLocation(createTestPlayer(), { location } as never),
        "Invalid location"
      )
    }
  )

  it("rejects moving at sea", () => {
    const player = createTestPlayer({
      character: { location: "Sea", town: null },
    })

    expectError(
      moveToLocation(player, { location: "Bank" }),
      "You cannot change locations while on a journey."
    )
  })

  it("rejects moving during a journey", () => {
    const player = createTestPlayer({
      character: {
        location: "Harbor",
        journey: { destination: "Havana", day: 1, totalDays: 3 },
      },
    })

    expectError(
      moveToLocation(player, { location: "Bank" }),
      "You cannot change locations while on a journey."
    )
  })

  it("rejects moving to the current location", () => {
    expectError(
      moveToLocation(createTestPlayer(), { location: "Shop" }),
      "You are already at this location"
    )
  })

  describe("first market visit", () => {
    it("creates discounted market offers", () => {
      // 2 offers: rum x 10 at 50%, food x 30 at 100%
      const random = fixedRandom(2, 6, 10, 50, 0, 30, 100)

      const result = expectSuccess(
        moveToLocation(createTestPlayer(), { location: "Market" }, random)
      )

      expect(result.player.locationStates?.market).toEqual({
        visited: true,
        items: {
          rum: { quantity: 10, price: Math.floor(MERCHANDISE.rum.buy / 2) },
          food: { quantity: 30, price: MERCHANDISE.food.buy },
        },
      })
    })

    it("keeps the offers from an earlier visit", () => {
      const market = {
        visited: true as const,
        items: { tea: { quantity: 3, price: 10 } } as LocationStateMarketItems,
      }
      const player = createTestPlayer({ locationStates: { market } })

      const result = expectSuccess(
        moveToLocation(player, { location: "Market" }, () => {
          throw new Error("Should not roll new offers")
        })
      )

      expect(result.player.locationStates?.market).toEqual(market)
    })
  })

  it("never offers the same market item twice", () => {
    const random = createSeededRandom(7)

    for (let i = 0; i < 500; i++) {
      const result = expectSuccess(
        moveToLocation(
          createTestPlayer(),
          { location: "Market" },
          // Always roll 4 offers, the rest is random
          (min, max) => (min === 1 && max === 4 ? 4 : random.int(min, max))
        )
      )

      expect(
        Object.keys(result.player.locationStates?.market?.items ?? {})
      ).toHaveLength(4)
    }
  })

  it("treats no crew the same as one crew member at the tavern", () => {
    const visit = (count: number) =>
      expectSuccess(
        moveToLocation(
          createTestPlayer({ crewMembers: { count } }),
          { location: "Tavern" },
          fixedRandom(2, 25, 4)
        )
      ).player.locationStates?.tavern

    expect(visit(0)).toEqual(visit(1))
  })

  describe("first tavern visit", () => {
    it("finds no sailors half of the time", () => {
      const result = expectSuccess(
        moveToLocation(createTestPlayer(), { location: "Tavern" }, () => 1)
      )

      expect(result.player.locationStates?.tavern).toEqual({
        visited: true,
        noOfSailors: 0,
        isHostile: false,
      })
    })

    it.each([
      // No crew works like a crew of one, and at least one sailor turns up
      { count: 0, rolls: [2, 25, 4], sailors: 1 },
      { count: 1, rolls: [2, 25, 4], sailors: 1 },
      { count: 2, rolls: [2, 10, 4], sailors: 1 },
      { count: 10, rolls: [2, 20, 4], sailors: 2 },
      { count: 20, rolls: [2, 10, 4], sailors: 2 },
      { count: 50, rolls: [2, 10, 4], sailors: 5 },
    ])(
      "with $count crew and rolls $rolls, $sailors sailors show up",
      ({ count, rolls, sailors }) => {
        const player = createTestPlayer({ crewMembers: { count } })

        const result = expectSuccess(
          moveToLocation(player, { location: "Tavern" }, fixedRandom(...rolls))
        )

        expect(result.player.locationStates?.tavern).toEqual({
          visited: true,
          noOfSailors: sailors,
          isHostile: false,
        })
      }
    )

    it("finds hostile sailors 3 out of 10 times", () => {
      const hostile = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter((roll) => {
        const result = expectSuccess(
          moveToLocation(
            createTestPlayer(),
            { location: "Tavern" },
            fixedRandom(2, 10, roll)
          )
        )

        return result.player.locationStates?.tavern?.isHostile
      })

      expect(hostile).toEqual([1, 2, 3])
    })

    it("keeps the sailors from an earlier visit", () => {
      const tavern = { visited: true as const, noOfSailors: 4, isHostile: true }
      const player = createTestPlayer({ locationStates: { tavern } })

      const result = expectSuccess(
        moveToLocation(player, { location: "Tavern" }, () => {
          throw new Error("Should not roll new sailors")
        })
      )

      expect(result.player.locationStates?.tavern).toEqual(tavern)
    })
  })
})

describe("updateCharacter", () => {
  it("updates name, gender and age only", () => {
    const player = deepFreeze(createTestPlayer())

    const result = expectSuccess(
      updateCharacter(player, { name: "Anne Bonny", gender: "Female", age: 25 })
    )

    expect(result.player.character).toEqual({
      ...player.character,
      name: "Anne Bonny",
      gender: "Female",
      age: 25,
    })
  })

  it("ignores other fields, so gold cannot be changed", () => {
    const result = expectSuccess(
      updateCharacter(createTestPlayer(), {
        name: "Anne Bonny",
        gender: "Female",
        age: 25,
        gold: 1_000_000,
      } as never)
    )

    expect(result.player.character.gold).toBe(1000)
  })

  it.each([
    { name: "Al", gender: "Male", age: 30 },
    { name: "Anne", gender: "Other", age: 30 },
    { name: "Anne", gender: "Female", age: 14 },
    { name: "Anne", gender: "Female", age: 81 },
    { name: "Anne", gender: "Female", age: "30" },
    {},
  ])("rejects %j with a readable message", (input) => {
    const result = updateCharacter(createTestPlayer(), input as never)

    expect("error" in result && typeof result.error).toBe("string")
    expect(result).not.toHaveProperty("player")
  })
})

describe("random walking around town", () => {
  const DESTINATIONS: unknown[] = [...TOWN_LOCATIONS, "Sea", "Moon"]

  it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])(
    "keeps the player consistent with seed %i",
    (seed) => {
      const random = createSeededRandom(seed)

      let player = createTestPlayer({
        crewMembers: { count: random.int(0, 100) },
      })

      const visited = new Set<string>()

      for (let step = 0; step < 1000; step++) {
        // Sometimes a new day starts, which resets the market and tavern
        if (random.int(0, 9) === 0) {
          player = { ...player, locationStates: {} }
        }

        const before = deepFreeze(structuredClone(player))
        const location = random.pick(DESTINATIONS) as TownLocation
        const context = `seed ${seed}, step ${step}, ${String(location)}`

        const result = moveToLocation(before, { location }, random.int)

        if ("error" in result) {
          expect(result.error, context).toBeTruthy()
          continue
        }

        visited.add(location)

        const after = result.player
        const market = after.locationStates?.market
        const tavern = after.locationStates?.tavern

        expect(after.character, context).toEqual({
          ...before.character,
          location,
        })
        expect(after.crewMembers, context).toEqual(before.crewMembers)
        expect(after.inventory, context).toEqual(before.inventory)
        expect(after.ships, context).toEqual(before.ships)

        if (location === "Market") {
          expect(market?.visited, context).toBe(true)
          Object.entries(market?.items ?? {}).forEach(([item, offer]) => {
            const fullPrice = MERCHANDISE[item as keyof Inventory].buy

            expect(offer.quantity, context).toBeGreaterThanOrEqual(1)
            expect(offer.quantity, context).toBeLessThanOrEqual(50)
            expect(offer.price, context).toBeLessThanOrEqual(fullPrice)
            expect(offer.price, context).toBeGreaterThanOrEqual(
              Math.floor(fullPrice / 2)
            )
          })
        }

        if (location === "Tavern") {
          expect(tavern?.visited, context).toBe(true)
          expect(tavern?.noOfSailors, context).toBeGreaterThanOrEqual(0)
          expect(Number.isInteger(tavern?.noOfSailors), context).toBe(true)
        }

        if (before.locationStates?.market) {
          expect(market, context).toEqual(before.locationStates.market)
        }

        if (before.locationStates?.tavern) {
          expect(tavern, context).toEqual(before.locationStates.tavern)
        }

        player = after
      }

      // Guards against random play that only ever hits errors
      expect(visited.size).toBe(TOWN_LOCATIONS.length)
    }
  )
})
