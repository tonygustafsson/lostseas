import { describe, expect, it } from "vitest"

import { TOWNS } from "@/constants/locations"
import {
  isTradeGoodAvailableInTown,
  MERCHANDISE,
} from "@/constants/merchandise"
import { buyItem, sellItem, tradeItems } from "@/utils/actions/shop"
import type { ActionResult } from "@/utils/actions/types"
import { getTradeGold, type TradeChange } from "@/utils/shop"

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

describe("tradeItems", () => {
  it("sells and buys in one trade", () => {
    const player = deepFreeze(createTestPlayer())

    const result = expectSuccess(
      tradeItems(player, {
        changes: [
          { item: "water", quantity: 5 },
          { item: "food", quantity: -4 },
        ],
      })
    )

    const gold = 4 * MERCHANDISE.food.sell - 5 * MERCHANDISE.water.buy

    expect(result.player.inventory).toMatchObject({ food: 6, water: 25 })
    expect(result.player.character.gold).toBe(1000 + gold)
    expect(result.data.gold).toBe(gold)
    expect(result.data.sold).toEqual([
      { item: "food", quantity: 4, totalQuantity: 6, totalPrice: 44 },
    ])
    expect(result.data.bought).toEqual([
      { item: "water", quantity: 5, totalQuantity: 25, totalPrice: 60 },
    ])
    expect(result.log).toBe(
      "Sold 4 crates of food. Bought 5 barrels of water. Paid 16 gold."
    )
  })

  it("uses gold from sales to pay for purchases", () => {
    // 10 food sells for 110 gold, which pays for 9 barrels of water
    const player = createTestPlayer({ character: { gold: 0 } })

    const result = expectSuccess(
      tradeItems(player, {
        changes: [
          { item: "water", quantity: 9 },
          { item: "food", quantity: -10 },
        ],
      })
    )

    expect(result.player.character.gold).toBe(110 - 9 * 12)
    expect(result.log).toBe(
      "Sold 10 crates of food. Bought 9 barrels of water. Received 2 gold."
    )
  })

  it("trades nothing when one part fails", () => {
    const player = deepFreeze(createTestPlayer())

    expectError(
      tradeItems(player, {
        changes: [
          { item: "food", quantity: -5 },
          { item: "spices", quantity: 1 },
        ],
      }),
      "This item is not available in this port"
    )
  })

  it("rejects buying more than the gold after sales can pay for", () => {
    const player = createTestPlayer({ character: { gold: 0 } })

    expectError(
      tradeItems(player, {
        changes: [
          { item: "food", quantity: -1 },
          { item: "water", quantity: 1 },
          { item: "rum", quantity: 1 },
        ],
      }),
      "Not enough gold"
    )
  })

  it("rejects selling more than the player has", () => {
    expectError(
      tradeItems(createTestPlayer(), {
        changes: [{ item: "food", quantity: -11 }],
      }),
      "Not enough food."
    )
  })

  it("rejects trading the same item twice", () => {
    expectError(
      tradeItems(createTestPlayer(), {
        changes: [
          { item: "food", quantity: -1 },
          { item: "food", quantity: 2 },
        ],
      }),
      "Each item can only be traded once"
    )
  })

  it.each([[[]], [null], ["food"]])("rejects changes %j", (changes) => {
    expectError(
      tradeItems(createTestPlayer(), { changes } as never),
      "Nothing to trade"
    )
  })

  it.each([0, 1.5, "2", null, Number.NaN, Number.MAX_SAFE_INTEGER + 1])(
    "rejects quantity %s",
    (quantity) => {
      expectError(
        tradeItems(createTestPlayer(), {
          changes: [{ item: "food", quantity } as never],
        }),
        "Quantity must be a whole number other than zero"
      )
    }
  )

  it("rejects malformed changes", () => {
    expectError(
      tradeItems(createTestPlayer(), { changes: [null] } as never),
      "Quantity must be a whole number other than zero"
    )
  })

  it("rejects trading outside the shop", () => {
    expectError(
      tradeItems(createTestPlayer({ character: { location: "Bank" } }), {
        changes: [{ item: "food", quantity: 1 }],
      }),
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
        const action = random.int(0, 2)
        const ownedItems = Object.entries(before.inventory ?? {})
          .filter(([, amount]) => amount > 0)
          .map(([key]) => key)

        // Selling usually picks something the player owns, otherwise it rarely succeeds
        const pickItem = () =>
          (action !== 0 && ownedItems.length && random.int(0, 2) > 0
            ? random.pick(ownedItems)
            : random.pick(ITEMS)) as keyof Inventory
        const item = pickItem()
        const quantity = random.pick(QUANTITIES) as number

        // A trade mixes up to three purchases and sales, sometimes of the same item
        const changes: TradeChange[] = Array.from(
          { length: random.int(1, 3) },
          () => ({
            item: pickItem(),
            quantity:
              (random.pick(QUANTITIES) as number) * (random.int(0, 1) ? -1 : 1),
          })
        )
        const context = `seed ${seed}, step ${step}, action ${action}, ${JSON.stringify(action === 2 ? changes : { item, quantity })}`

        const result =
          action === 0
            ? buyItem(before, { item, quantity })
            : action === 1
              ? sellItem(before, { item, quantity })
              : tradeItems(before, { changes })

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
          const data = result.data as { gold: number }
          expect(goldEarned, context).toBe(data.gold)
          expect(goldEarned, context).toBe(getTradeGold(changes))

          changes.forEach((change) => {
            expect(
              (after.inventory?.[change.item] ?? 0) -
                (before.inventory?.[change.item] ?? 0),
              context
            ).toBe(change.quantity)
          })
        }

        player = after
      }

      // Guards against random play that only ever hits errors
      expect(succeededActions.size).toBe(3)
    }
  )
})
