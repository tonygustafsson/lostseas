import { describe, expect, it } from "vitest"

import { MERCHANDISE } from "@/constants/merchandise"
import { acceptMarketOffer } from "@/utils/actions/market"
import type { ActionResult } from "@/utils/actions/types"
import { patchDeep } from "@/utils/patchDeep"

import { createTestPlayer, deepFreeze } from "../helpers/createTestPlayer"
import { createSeededRandom } from "../helpers/seededRandom"

const ALL_ITEMS = Object.keys(MERCHANDISE) as (keyof Inventory)[]

const OTHER_LOCATIONS: TownLocation[] = [
  "Bank",
  "Tavern",
  "Shop",
  "Shipyard",
  "City hall",
]

const atMarket = (
  items: Partial<LocationStateMarketItems>,
  overrides: DeepPartial<Player> = {}
) =>
  deepFreeze(
    patchDeep<Player>(
      createTestPlayer({
        character: { location: "Market" },
        locationStates: { market: { visited: true, items } },
      }),
      overrides
    )
  )

const expectSuccess = <T extends object>(result: ActionResult<T>) => {
  if ("error" in result) {
    throw new Error(`Expected success but got error: ${result.error}`)
  }

  return result
}

const expectError = (result: ActionResult, error: string) => {
  expect(result).toEqual({ error })
}

describe("acceptMarketOffer", () => {
  it.each(ALL_ITEMS)("buys the whole %s batch", (item) => {
    const player = atMarket(
      { [item]: { quantity: 4, price: 10 } },
      { inventory: { [item]: 3 } }
    )

    const result = expectSuccess(acceptMarketOffer(player, { item }))

    expect(result.player.character.gold).toBe(1000 - 40)
    expect(result.player.inventory?.[item]).toBe(7)
    expect(result.player.locationStates?.market?.items).toEqual({})
    expect(result.data).toEqual({
      item,
      quantity: 4,
      totalQuantity: 7,
      totalPrice: 40,
    })
    expect(result.log).toBe(
      `Bought 4 ${MERCHANDISE[item].unit} of ${item} in the market for 40 gold.`
    )
  })

  it("keeps the other offers", () => {
    const player = atMarket({
      rum: { quantity: 2, price: 100 },
      silk: { quantity: 5, price: 20 },
    })

    const result = expectSuccess(acceptMarketOffer(player, { item: "rum" }))

    expect(result.player.locationStates?.market?.items).toEqual({
      silk: { quantity: 5, price: 20 },
    })
  })

  it("buys without an inventory", () => {
    const result = expectSuccess(
      acceptMarketOffer(
        atMarket({ tea: { quantity: 3, price: 5 } }, { inventory: null }),
        { item: "tea" }
      )
    )

    expect(result.player.inventory).toEqual({ tea: 3 })
  })

  it("can spend the last gold coin", () => {
    const result = expectSuccess(
      acceptMarketOffer(atMarket({ rum: { quantity: 10, price: 100 } }), {
        item: "rum",
      })
    )

    expect(result.player.character.gold).toBe(0)
  })

  it("cannot accept the same offer twice", () => {
    const first = expectSuccess(
      acceptMarketOffer(atMarket({ rum: { quantity: 1, price: 50 } }), {
        item: "rum",
      })
    )

    expectError(
      acceptMarketOffer(first.player, { item: "rum" }),
      "Not a valid item"
    )
  })

  it.each(["gold", "constructor", "__proto__", "", undefined, 5])(
    "rejects item %s",
    (item) => {
      expectError(
        acceptMarketOffer(atMarket({ rum: { quantity: 1, price: 1 } }), {
          item,
        } as never),
        "Not a valid item"
      )
    }
  )

  it("rejects an item that is not on offer", () => {
    expectError(
      acceptMarketOffer(atMarket({ rum: { quantity: 1, price: 1 } }), {
        item: "silk",
      }),
      "Not a valid item"
    )
  })

  it("rejects when the market has no offers", () => {
    expectError(
      acceptMarketOffer(
        createTestPlayer({ character: { location: "Market" } }),
        { item: "rum" }
      ),
      "Not a valid item"
    )
  })

  it.each(OTHER_LOCATIONS)("rejects buying at the %s", (location) => {
    expectError(
      acceptMarketOffer(
        atMarket(
          { rum: { quantity: 1, price: 1 } },
          { character: { location } }
        ),
        { item: "rum" }
      ),
      "You must be at Market to do this."
    )
  })

  it("rejects buying with too little gold", () => {
    expectError(
      acceptMarketOffer(atMarket({ rum: { quantity: 10, price: 101 } }), {
        item: "rum",
      }),
      "Not enough gold"
    )
  })
})

describe("random market play", () => {
  const LOCATIONS: TownLocation[] = [
    "Market",
    "Market",
    "Market",
    ...OTHER_LOCATIONS,
  ]
  const ITEMS: unknown[] = [...ALL_ITEMS, "gold", undefined]

  it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])(
    "keeps the game consistent with seed %i",
    (seed) => {
      const random = createSeededRandom(seed)
      let succeeded = 0

      let player = createTestPlayer({
        character: { gold: random.int(0, 5000) },
      })

      for (let step = 0; step < 1000; step++) {
        // Sometimes new offers appear, like when entering the market
        const items =
          random.int(0, 3) === 0
            ? Object.fromEntries(
                Array.from({ length: random.int(1, 4) }, () => [
                  random.pick(ALL_ITEMS),
                  { quantity: random.int(1, 50), price: random.int(1, 200) },
                ])
              )
            : (player.locationStates?.market?.items ?? {})

        player = {
          ...player,
          character: {
            ...player.character,
            gold:
              player.character.gold +
              (random.int(0, 9) === 0 ? random.int(0, 5000) : 0),
            location: random.pick(LOCATIONS),
          },
          locationStates: {
            ...player.locationStates,
            market: { visited: true, items: items as LocationStateMarketItems },
          },
        }

        const before = deepFreeze(structuredClone(player))
        const offered = Object.keys(before.locationStates?.market?.items ?? {})
        const item = (
          offered.length && random.int(0, 2) > 0
            ? random.pick(offered)
            : random.pick(ITEMS)
        ) as keyof Inventory
        const context = `seed ${seed}, step ${step}, ${String(item)}`

        const result = acceptMarketOffer(before, { item })

        if ("error" in result) {
          expect(result.error, context).toBeTruthy()
          continue
        }

        succeeded++

        const after = result.player
        const offer = before.locationStates!.market!.items[item]

        expect(after.character.location, context).toBe("Market")
        expect(after.character.gold, context).toBeGreaterThanOrEqual(0)
        expect(before.character.gold - after.character.gold, context).toBe(
          offer.price * offer.quantity
        )
        expect(
          (after.inventory?.[item] ?? 0) - (before.inventory?.[item] ?? 0),
          context
        ).toBe(offer.quantity)
        expect(after.locationStates?.market?.items?.[item], context).toBe(
          undefined
        )
        expect(after.ships, context).toEqual(before.ships)
        expect(after.crewMembers, context).toEqual(before.crewMembers)

        player = after
      }

      // Guards against random play that only ever hits errors
      expect(succeeded).toBeGreaterThan(0)
    }
  )
})
