import { describe, expect, it } from "vitest"

import { APOTHECARY_REMEDIES, type Remedy } from "@/constants/apothecary"
import { MERCHANDISE } from "@/constants/merchandise"
import { acceptMarketOffer, buyRemedy } from "@/utils/actions/market"
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
  it("rejects a batch that does not fit in the hold", () => {
    // The test Brig carries 300 and has 30 aboard
    const player = atMarket({ rum: { quantity: 271, price: 1 } })

    expectError(
      acceptMarketOffer(player, { item: "rum" }),
      "Not enough cargo space"
    )
  })

  it("buys a batch that fills the hold exactly", () => {
    const player = atMarket({ rum: { quantity: 270, price: 1 } })

    expect(
      expectSuccess(acceptMarketOffer(player, { item: "rum" })).player.inventory
        ?.rum
    ).toBe(270)
  })

  it("buys cannons whatever the cargo", () => {
    const player = atMarket(
      { cannons: { quantity: 5, price: 1 } },
      { inventory: { food: 400 } }
    )

    expectSuccess(acceptMarketOffer(player, { item: "cannons" }))
  })

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

describe("buyRemedy", () => {
  const injured = (overrides: DeepPartial<Player> = {}) =>
    deepFreeze(
      createTestPlayer(
        patchDeep<DeepPartial<Player>>(
          {
            character: { location: "Market" },
            crewMembers: { count: 50, health: 60 },
          },
          overrides
        )
      )
    )

  it("heals the crew and takes the gold", () => {
    // 50 crew at 60% buy willow bark tea: +25 points, 0.6 × 50 × 25 = 750 gold
    const player = injured()
    const gold = player.character.gold

    const result = expectSuccess(
      buyRemedy(player, { remedy: "willow-bark-tea" })
    )

    expect(result.player.crewMembers.health).toBe(85)
    expect(result.player.character.gold).toBe(gold - 750)
    expect(result.data).toEqual({
      remedy: "willow-bark-tea",
      healed: 25,
      newHealth: 85,
      totalPrice: 750,
    })
    expect(result.log).toBe(
      "Bought Willow bark tea at the apothecary for 750 gold. Crew health is now 85%."
    )
  })

  it("charges the full price even when healing past 100% is wasted", () => {
    // 50 crew at 90% buy Jesuit's bark tonic: +10 points, full 0.6 × 50 × 75 = 2250 gold
    const result = expectSuccess(
      buyRemedy(
        injured({ crewMembers: { health: 90 }, character: { gold: 5000 } }),
        { remedy: "jesuits-bark-tonic" }
      )
    )

    expect(result.player.crewMembers.health).toBe(100)
    expect(result.player.character.gold).toBe(5000 - 2250)
    expect(result.data.healed).toBe(10)
    expect(result.data.totalPrice).toBe(2250)
  })

  it.each(["toString", 5, undefined])("rejects remedy %s", (remedy) => {
    expectError(buyRemedy(injured(), { remedy } as never), "Not a valid remedy")
  })

  it.each(OTHER_LOCATIONS)("rejects buying at the %s", (location) => {
    expectError(
      buyRemedy(injured({ character: { location } }), {
        remedy: "willow-bark-tea",
      }),
      "You must be at Market to do this."
    )
  })

  it("rejects when the crew count is missing from the save", () => {
    const player = createTestPlayer({
      character: { location: "Market" },
      crewMembers: { health: 50 },
    })
    player.crewMembers.count = undefined as never

    expectError(
      buyRemedy(player, { remedy: "willow-bark-tea" }),
      "You have no crew to treat."
    )
  })

  it("rejects when there is no crew", () => {
    expectError(
      buyRemedy(injured({ crewMembers: { count: 0 } }), {
        remedy: "willow-bark-tea",
      }),
      "You have no crew to treat."
    )
  })

  it("rejects when crew health is already 100%", () => {
    expectError(
      buyRemedy(injured({ crewMembers: { health: 100 } }), {
        remedy: "willow-bark-tea",
      }),
      "Your crew's health is already at 100%."
    )
  })

  it.each([NaN, undefined])(
    "rejects and keeps the gold when crew health is %s",
    (health) => {
      const player = createTestPlayer({ character: { location: "Market" } })
      player.crewMembers.health = health as never

      expectError(
        buyRemedy(player, { remedy: "willow-bark-tea" }),
        "Your crew's health is already at 100%."
      )
    }
  )

  it("rejects buying with too little gold", () => {
    expectError(
      buyRemedy(injured({ character: { gold: 749 } }), {
        remedy: "willow-bark-tea",
      }),
      "Not enough gold"
    )
  })
})

describe("random apothecary play", () => {
  const LOCATIONS: TownLocation[] = ["Market", "Market", ...OTHER_LOCATIONS]
  const REMEDIES = Object.keys(APOTHECARY_REMEDIES) as Remedy[]

  it.each([1, 2, 3, 4, 5])("keeps the game consistent with seed %i", (seed) => {
    const random = createSeededRandom(seed)
    let succeeded = 0

    for (let step = 0; step < 1000; step++) {
      const before = deepFreeze(
        createTestPlayer({
          character: {
            location: random.pick(LOCATIONS),
            gold: random.int(0, 1_000_000),
          },
          crewMembers: {
            count: random.int(0, 10_000),
            health: random.int(0, 100),
          },
        })
      )
      const remedy = random.pick(REMEDIES)
      const context = `seed ${seed}, step ${step}, ${remedy}`

      const result = buyRemedy(before, { remedy })

      if ("error" in result) {
        expect(result.error, context).toBeTruthy()
        continue
      }

      succeeded++

      const { gold } = result.player.character
      const { health } = result.player.crewMembers

      expect(Number.isInteger(health), context).toBe(true)
      expect(health, context).toBeGreaterThanOrEqual(1)
      expect(health, context).toBeLessThanOrEqual(100)
      expect(Number.isSafeInteger(gold), context).toBe(true)
      expect(gold, context).toBeGreaterThanOrEqual(0)
      expect(before.character.gold - gold, context).toBe(result.data.totalPrice)
    }

    expect(succeeded).toBeGreaterThan(0)
  })
})
