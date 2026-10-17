import { describe, expect, it } from "vitest"

import { TOWNS } from "@/constants/locations"
import {
  BARTER_GOODS,
  isTradeGoodAvailableInTown,
  MERCHANDISE,
} from "@/constants/merchandise"
import {
  buyItem,
  buyNecessities,
  sellBarterGoods,
  sellItem,
} from "@/utils/actions/shop"
import type { ActionResult } from "@/utils/actions/types"
import { getDaysWorthOfNecessities } from "@/utils/shop"

import { createTestPlayer, deepFreeze } from "../helpers/createTestPlayer"
import { createSeededRandom } from "../helpers/seededRandom"

const ALL_TOWNS = Object.keys(TOWNS) as Town[]

const SHOP_ITEMS = (Object.keys(MERCHANDISE) as (keyof Inventory)[]).filter(
  (item) => MERCHANDISE[item].availableAt === "shop"
)

const TOWN_LOCATIONS: TownLocation[] = [
  "Bank",
  "Tavern",
  "Market",
  "Shop",
  "Shipyard",
  "City hall",
]

const INVALID_WHOLE_NUMBERS: unknown[] = [
  0,
  -1,
  1.5,
  "2",
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

describe("buyItem", () => {
  it("buys food and pays the buy price", () => {
    const player = deepFreeze(createTestPlayer())

    const result = expectSuccess(
      buyItem(player, { item: "food", quantity: 10 })
    )

    expect(result.player.character.gold).toBe(1000 - 16 * 10)
    expect(result.player.inventory?.food).toBe(20)
    expect(result.log).toBe("Bought 10 crates of food for 160 gold.")
    expect(result.data).toEqual({
      item: "food",
      quantity: 10,
      totalQuantity: 20,
      totalPrice: 160,
    })
  })

  it("buys an item the player has none of, even without an inventory", () => {
    const player = deepFreeze(createTestPlayer({ inventory: null }))

    const result = expectSuccess(buyItem(player, { item: "rum", quantity: 2 }))

    expect(result.player.inventory).toEqual({ rum: 2 })
  })

  it("can spend the last gold coin", () => {
    const player = deepFreeze(createTestPlayer({ character: { gold: 16 } }))

    const result = expectSuccess(buyItem(player, { item: "food", quantity: 1 }))

    expect(result.player.character.gold).toBe(0)
  })

  it.each(INVALID_WHOLE_NUMBERS)("rejects quantity %s", (quantity) => {
    expectError(
      buyItem(createTestPlayer(), { item: "food", quantity } as never),
      "Quantity must be a positive whole number"
    )
  })

  it.each(["cannons", "repairKits", "gold", "constructor", "", undefined])(
    "rejects item %s that the shop does not sell",
    (item) => {
      expectError(
        buyItem(createTestPlayer(), { item, quantity: 1 } as never),
        "Not a valid item"
      )
    }
  )

  it.each(TOWN_LOCATIONS.filter((location) => location !== "Shop"))(
    "rejects buying at the %s",
    (location) => {
      expectError(
        buyItem(createTestPlayer({ character: { location } }), {
          item: "food",
          quantity: 1,
        }),
        "You must be at Shop to do this."
      )
    }
  )

  it("rejects goods the local shop does not trade", () => {
    expectError(
      buyItem(createTestPlayer({ character: { town: "Tortuga" } }), {
        item: "porcelain",
        quantity: 1,
      }),
      "This item is not available in this port"
    )
  })

  it("rejects buying with too little gold", () => {
    expectError(
      buyItem(createTestPlayer({ character: { gold: 15 } }), {
        item: "food",
        quantity: 1,
      }),
      "Not enough gold"
    )
  })

  it("rejects a price too large to calculate safely", () => {
    expectError(
      buyItem(createTestPlayer(), {
        item: "food",
        quantity: Number.MAX_SAFE_INTEGER,
      }),
      "Invalid quantity"
    )
  })

  it("rejects an inventory total too large to store safely", () => {
    const player = createTestPlayer({
      inventory: { food: Number.MAX_SAFE_INTEGER },
    })

    expectError(
      buyItem(player, { item: "food", quantity: 1 }),
      "Invalid quantity"
    )
  })
})

describe("sellItem", () => {
  it("sells food for the sell price", () => {
    const player = deepFreeze(createTestPlayer())

    const result = expectSuccess(
      sellItem(player, { item: "food", quantity: 4 })
    )

    expect(result.player.character.gold).toBe(1000 + 11 * 4)
    expect(result.player.inventory?.food).toBe(6)
    expect(result.log).toBe("Sold 4 crates of food for 44 gold.")
    expect(result.data).toEqual({
      item: "food",
      quantity: 4,
      totalQuantity: 6,
      totalPrice: 44,
    })
  })

  it("can sell everything the player has", () => {
    const result = expectSuccess(
      sellItem(createTestPlayer(), { item: "water", quantity: 20 })
    )

    expect(result.player.inventory?.water).toBe(0)
  })

  it.each(INVALID_WHOLE_NUMBERS)("rejects quantity %s", (quantity) => {
    expectError(
      sellItem(createTestPlayer(), { item: "food", quantity } as never),
      "Quantity must be a positive whole number"
    )
  })

  it.each(["cannons", "repairKits", "gold", "constructor", "", undefined])(
    "rejects item %s that the shop does not buy",
    (item) => {
      expectError(
        sellItem(createTestPlayer(), { item, quantity: 1 } as never),
        "Not a valid item"
      )
    }
  )

  it("rejects selling outside the shop", () => {
    expectError(
      sellItem(createTestPlayer({ character: { location: "Market" } }), {
        item: "food",
        quantity: 1,
      }),
      "You must be at Shop to do this."
    )
  })

  it("rejects goods the local shop does not trade", () => {
    const player = createTestPlayer({
      character: { town: "Tortuga" },
      inventory: { porcelain: 5 },
    })

    expectError(
      sellItem(player, { item: "porcelain", quantity: 1 }),
      "This item is not available in this port"
    )
  })

  it("rejects selling more than the player has", () => {
    expectError(
      sellItem(createTestPlayer(), { item: "food", quantity: 11 }),
      "Not enough food."
    )
  })

  it("rejects selling an item the player has none of", () => {
    expectError(
      sellItem(createTestPlayer({ inventory: null }), {
        item: "rum",
        quantity: 1,
      }),
      "Not enough rum."
    )
  })

  it("rejects a price too large to calculate safely", () => {
    expectError(
      sellItem(createTestPlayer(), {
        item: "rum",
        quantity: Number.MAX_SAFE_INTEGER,
      }),
      "Invalid quantity"
    )
  })
})

describe("buyNecessities", () => {
  it("buys the food and water missing for the journey", () => {
    // 20 crew for 10 days needs 20 food and 40 water. The player has 10 and 20.
    const player = deepFreeze(createTestPlayer())

    const result = expectSuccess(buyNecessities(player, { days: 10 }))

    expect(result.data).toEqual({ cost: 400, foodNeeded: 10, waterNeeded: 20 })
    expect(result.player.character.gold).toBe(600)
    expect(result.player.inventory).toMatchObject({ food: 20, water: 40 })
    expect(result.log).toBe(
      "Bought necessities for 400 gold. Enough food and water for 10 days."
    )
  })

  it("rejects buying when supplies already last long enough", () => {
    expectError(
      buyNecessities(createTestPlayer(), { days: 1 }),
      "You already have enough food and water for 1 days."
    )
  })

  it("buys at least one crate and one barrel per day for a small crew", () => {
    // 3 crew still use 1 crate of food and 1 barrel of water every day
    const player = createTestPlayer({
      crewMembers: { count: 3 },
      inventory: { food: 0, water: 0 },
    })

    const result = expectSuccess(buyNecessities(player, { days: 10 }))

    expect(result.data).toEqual({
      cost: 10 * 16 + 10 * 12,
      foodNeeded: 10,
      waterNeeded: 10,
    })
  })

  it.each(INVALID_WHOLE_NUMBERS)("rejects days %s", (days) => {
    expectError(
      buyNecessities(createTestPlayer(), { days } as never),
      "Days must be a positive whole number"
    )
  })

  it("rejects buying outside the shop", () => {
    expectError(
      buyNecessities(createTestPlayer({ character: { location: "Bank" } }), {
        days: 5,
      }),
      "You must be at Shop to do this."
    )
  })

  it("rejects buying with too little gold", () => {
    expectError(
      buyNecessities(createTestPlayer({ character: { gold: 399 } }), {
        days: 10,
      }),
      "Not enough gold"
    )
  })

  it("always buys enough for the requested days", () => {
    const random = createSeededRandom(42)

    for (let i = 0; i < 2000; i++) {
      const crew = random.int(1, 300)
      const days = random.int(1, 60)
      const player = createTestPlayer({
        character: { gold: Number.MAX_SAFE_INTEGER },
        crewMembers: { count: crew },
        inventory: { food: random.int(0, 50), water: random.int(0, 100) },
      })

      const result = buyNecessities(player, { days })

      // When nothing needs buying, the current supplies must already be enough
      const newPlayer = "error" in result ? player : result.player

      const daysWorth = getDaysWorthOfNecessities({
        crewMembers: crew,
        currentFood: newPlayer.inventory?.food,
        currentWater: newPlayer.inventory?.water,
      })

      expect(daysWorth, `crew ${crew}, days ${days}`).toBeGreaterThanOrEqual(
        days
      )
    }
  })
})

describe("sellBarterGoods", () => {
  it("sells only the barter goods the local shop accepts", () => {
    // Port Royale trades porcelain but not spices.
    const player = deepFreeze(
      createTestPlayer({
        inventory: { food: 10, rum: 2, porcelain: 3, spices: 4 },
      })
    )

    const result = expectSuccess(sellBarterGoods(player))

    const value = 2 * MERCHANDISE.rum.sell + 3 * MERCHANDISE.porcelain.sell

    expect(result.data).toEqual({ value })
    expect(result.player.character.gold).toBe(1000 + value)
    expect(result.player.inventory).toMatchObject({
      food: 10,
      rum: 0,
      porcelain: 0,
      spices: 4,
    })
    expect(result.log).toBe(`Sold barter goods for ${value} gold.`)
  })

  it("keeps medicine, since it is not a barter good", () => {
    const player = createTestPlayer({ inventory: { rum: 1, medicine: 5 } })

    const result = expectSuccess(sellBarterGoods(player))

    expect(BARTER_GOODS).not.toContain("medicine")
    expect(result.player.inventory?.medicine).toBe(5)
    expect(result.data.value).toBe(MERCHANDISE.rum.sell)
  })

  it("only pays for goods it actually removes", () => {
    const player = createTestPlayer({
      character: { town: null },
      inventory: { rum: 1, spices: 4 },
    })

    const result = expectSuccess(sellBarterGoods(player))

    expect(result.player.inventory?.spices).toBe(4)
    expect(result.data.value).toBe(MERCHANDISE.rum.sell)
  })

  it.each([
    ["no inventory", null],
    ["only necessities", { food: 10, water: 20 }],
    ["only goods this port does not accept", { spices: 4 }],
    ["barter goods with zero quantity", { rum: 0, tobacco: 0 }],
  ])("rejects selling with %s", (_, inventory) => {
    expectError(
      sellBarterGoods(createTestPlayer({ inventory })),
      "You have no barter goods this port accepts."
    )
  })

  it("rejects selling outside the shop", () => {
    expectError(
      sellBarterGoods(createTestPlayer({ character: { location: "Tavern" } })),
      "You must be at Shop to do this."
    )
  })
})

describe("shop rules across all items and towns", () => {
  const cases = SHOP_ITEMS.flatMap((item) =>
    ALL_TOWNS.map((town) => ({
      item,
      town,
      available: isTradeGoodAvailableInTown(item, town),
    }))
  )

  it.each(cases)(
    "$item in $town can be traded: $available",
    ({ item, town, available }) => {
      const player = createTestPlayer({
        character: { town },
        inventory: { [item]: 5 },
      })

      const buy = buyItem(player, { item, quantity: 1 })
      const sell = sellItem(player, { item, quantity: 1 })

      expect("error" in buy).toBe(!available)
      expect("error" in sell).toBe(!available)
    }
  )

  it("trades tobacco and rum in every town, as the guide says", () => {
    expect(MERCHANDISE.tobacco.towns).toBeUndefined()
    expect(MERCHANDISE.rum.towns).toBeUndefined()
  })

  it.each(SHOP_ITEMS)("%s can be traded in at least one town", (item) => {
    expect(
      ALL_TOWNS.some((town) => isTradeGoodAvailableInTown(item, town))
    ).toBe(true)
  })

  it.each(SHOP_ITEMS)(
    "%s cannot be bought and sold back for profit",
    (item) => {
      const town = ALL_TOWNS.find((town) =>
        isTradeGoodAvailableInTown(item, town)
      )
      const player = createTestPlayer({
        character: { town, gold: 100_000 },
        inventory: null,
      })

      const bought = expectSuccess(buyItem(player, { item, quantity: 7 }))
      const sold = expectSuccess(sellItem(bought.player, { item, quantity: 7 }))

      const { buy, sell } = MERCHANDISE[item]

      expect(sell).toBeLessThan(buy)
      expect(sold.player.inventory?.[item]).toBe(0)
      expect(player.character.gold - sold.player.character.gold).toBe(
        (buy - sell) * 7
      )
    }
  )
})

describe("random shop play", () => {
  const ITEMS: unknown[] = [...SHOP_ITEMS, "cannons", "gold", undefined]
  const QUANTITIES: unknown[] = [1, 2, 5, 10, 50, 0, -3, 2.5, "4", 1e20]
  const LOCATIONS: TownLocation[] = ["Shop", "Shop", "Shop", ...TOWN_LOCATIONS]

  const isValidInventory = (inventory: Inventory | undefined) =>
    Object.values(inventory ?? {}).every(
      (quantity) => Number.isSafeInteger(quantity) && quantity >= 0
    )

  it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])(
    "keeps the game consistent with seed %i",
    (seed) => {
      const random = createSeededRandom(seed)

      let player = createTestPlayer({
        character: { gold: random.int(0, 5000) },
        crewMembers: { count: random.int(1, 100) },
        inventory: { food: random.int(0, 30), water: random.int(0, 60) },
      })

      const succeededActions = new Set<number>()

      for (let step = 0; step < 1000; step++) {
        player = {
          ...player,
          character: {
            ...player.character,
            // Sometimes earn gold elsewhere, so the player does not go broke for good
            gold:
              player.character.gold +
              (random.int(0, 9) === 0 ? random.int(0, 5000) : 0),
            town: random.pick(ALL_TOWNS),
            location: random.pick(LOCATIONS),
          },
          // Sometimes use up food and water, like after a voyage
          inventory:
            random.int(0, 4) === 0
              ? { ...player.inventory, food: 0, water: 0 }
              : player.inventory,
        }

        const before = deepFreeze(structuredClone(player))
        const action = random.int(0, 3)
        const ownedItems = Object.entries(before.inventory ?? {})
          .filter(([, amount]) => amount > 0)
          .map(([key]) => key)

        // Selling usually picks something the player owns, otherwise it rarely succeeds
        const item = (
          action === 1 && ownedItems.length && random.int(0, 2) > 0
            ? random.pick(ownedItems)
            : random.pick(ITEMS)
        ) as keyof Inventory
        const quantity = random.pick(QUANTITIES) as number
        const context = `seed ${seed}, step ${step}, action ${action}, ${String(item)} x ${String(quantity)}`

        const result =
          action === 0
            ? buyItem(before, { item, quantity })
            : action === 1
              ? sellItem(before, { item, quantity })
              : action === 2
                ? buyNecessities(before, { days: quantity })
                : sellBarterGoods(before)

        if ("error" in result) {
          expect(result.error, context).toBeTruthy()
          continue
        }

        succeededActions.add(action)

        const after = result.player
        const goldEarned = after.character.gold - before.character.gold
        const goldSpent = before.character.gold - after.character.gold

        expect(after.character.location, context).toBe("Shop")
        expect(after.character.gold, context).toBeGreaterThanOrEqual(0)
        expect(Number.isSafeInteger(after.character.gold), context).toBe(true)
        expect(isValidInventory(after.inventory), context).toBe(true)
        expect(after.crewMembers, context).toEqual(before.crewMembers)
        expect(after.ships, context).toEqual(before.ships)

        if (action === 0) {
          const data = result.data as { totalPrice: number }
          expect(goldSpent, context).toBe(data.totalPrice)
          expect(
            (after.inventory?.[item] ?? 0) - (before.inventory?.[item] ?? 0),
            context
          ).toBe(quantity)
        }

        if (action === 1) {
          const data = result.data as { totalPrice: number }
          expect(goldEarned, context).toBe(data.totalPrice)
          expect(
            (before.inventory?.[item] ?? 0) - (after.inventory?.[item] ?? 0),
            context
          ).toBe(quantity)
        }

        if (action === 2) {
          const data = result.data as { cost: number }
          expect(goldSpent, context).toBe(data.cost)
        }

        if (action === 3) {
          const soldValue = BARTER_GOODS.reduce((sum, good) => {
            const key = good as keyof Inventory
            const sold =
              (before.inventory?.[key] ?? 0) - (after.inventory?.[key] ?? 0)

            return sum + sold * MERCHANDISE[key].sell
          }, 0)

          expect(goldEarned, context).toBe(soldValue)
        }

        player = after
      }

      // Guards against random play that only ever hits errors
      expect(succeededActions.size).toBe(4)
    }
  )
})
