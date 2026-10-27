import { describe, expect, it } from "vitest"

import { MERCHANDISE } from "@/constants/merchandise"
import { SHIP_REPAIR_COST, SHIP_TYPES } from "@/constants/ship"
import { TITLE_INFO } from "@/constants/title"
import {
  buyFittings,
  buyShip,
  repairShip,
  sellFittings,
  sellShip,
} from "@/utils/actions/shipyard"
import type { ActionResult } from "@/utils/actions/types"
import { patchDeep } from "@/utils/patchDeep"

import { createTestPlayer, deepFreeze } from "../helpers/createTestPlayer"
import { createSeededRandom } from "../helpers/seededRandom"

const SHIP_TYPE_KEYS = Object.keys(SHIP_TYPES) as ShipType[]
const TITLES = Object.keys(TITLE_INFO) as Title[]

const FITTINGS = (Object.keys(MERCHANDISE) as (keyof Inventory)[]).filter(
  (item) => MERCHANDISE[item].availableAt === "shipyard"
)

const SHOP_ITEMS = (Object.keys(MERCHANDISE) as (keyof Inventory)[]).filter(
  (item) => MERCHANDISE[item].availableAt === "shop"
)

const OTHER_LOCATIONS: TownLocation[] = [
  "Bank",
  "Tavern",
  "Market",
  "Shop",
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

const atShipyard = (overrides: DeepPartial<Player> = {}) =>
  deepFreeze(
    patchDeep<Player>(
      createTestPlayer({ character: { location: "Shipyard", gold: 20_000 } }),
      overrides
    )
  )

let shipCounter = 0

/** Deterministic replacement for createNewShip */
const createShip = (type: ShipType, day: number): Ship => {
  shipCounter++

  return {
    id: `new-ship-${shipCounter}`,
    name: `New Ship ${shipCounter}`,
    type,
    health: 100,
    createdDay: day,
  }
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

const LOG_NAMES: Record<string, { single: string; plural: string }> = {
  cannons: { single: "cannon", plural: "cannons" },
  repairKits: { single: "repair kit", plural: "repair kits" },
}

describe("buyFittings", () => {
  it.each(FITTINGS)("logs a single %s in the singular", (item) => {
    const result = expectSuccess(
      buyFittings(atShipyard(), { item, quantity: 1 })
    )

    expect(result.log).toMatchObject({
      type: "trade",
      message: expect.stringMatching(`Bought 1 ${LOG_NAMES[item].single} for`),
    })
  })

  it.each(FITTINGS)("buys %s for the buy price", (item) => {
    const player = atShipyard({ inventory: { [item]: 2 } })

    const result = expectSuccess(buyFittings(player, { item, quantity: 3 }))

    const totalPrice = MERCHANDISE[item].buy * 3

    expect(result.player.character.gold).toBe(20_000 - totalPrice)
    expect(result.player.inventory?.[item]).toBe(5)
    expect(result.log).toMatchObject({
      type: "trade",
      message: `Bought 3 ${LOG_NAMES[item].plural} for ${totalPrice} gold.`,
    })
    expect(result.data).toEqual({
      item,
      quantity: 3,
      totalQuantity: 5,
      totalPrice,
    })
  })

  it("buys fittings without an inventory", () => {
    const result = expectSuccess(
      buyFittings(atShipyard({ inventory: null }), {
        item: "cannons",
        quantity: 1,
      })
    )

    expect(result.player.inventory).toEqual({ cannons: 1 })
  })

  it("can spend the last gold coin", () => {
    const result = expectSuccess(
      buyFittings(atShipyard({ character: { gold: 300 } }), {
        item: "cannons",
        quantity: 1,
      })
    )

    expect(result.player.character.gold).toBe(0)
  })

  it.each(INVALID_WHOLE_NUMBERS)("rejects quantity %s", (quantity) => {
    expectError(
      buyFittings(atShipyard(), { item: "cannons", quantity } as never),
      "Quantity must be a positive whole number"
    )
  })

  it.each([...SHOP_ITEMS, "gold", "constructor", "", undefined])(
    "rejects item %s that the shipyard does not sell",
    (item) => {
      expectError(
        buyFittings(atShipyard(), { item, quantity: 1 } as never),
        "Not a valid item"
      )
    }
  )

  it.each(OTHER_LOCATIONS)("rejects buying at the %s", (location) => {
    expectError(
      buyFittings(createTestPlayer({ character: { location } }), {
        item: "cannons",
        quantity: 1,
      }),
      "You must be at Shipyard to do this."
    )
  })

  it("rejects buying with too little gold", () => {
    expectError(
      buyFittings(atShipyard({ character: { gold: 299 } }), {
        item: "cannons",
        quantity: 1,
      }),
      "Not enough gold"
    )
  })

  it("rejects a price too large to calculate safely", () => {
    expectError(
      buyFittings(atShipyard(), {
        item: "cannons",
        quantity: Number.MAX_SAFE_INTEGER,
      }),
      "Invalid quantity"
    )
  })

  it("rejects an inventory total too large to store safely", () => {
    expectError(
      buyFittings(
        atShipyard({ inventory: { cannons: Number.MAX_SAFE_INTEGER } }),
        {
          item: "cannons",
          quantity: 1,
        }
      ),
      "Invalid quantity"
    )
  })
})

describe("sellFittings", () => {
  it.each(FITTINGS)("sells %s for the sell price", (item) => {
    const player = atShipyard({ inventory: { [item]: 5 } })

    const result = expectSuccess(sellFittings(player, { item, quantity: 2 }))

    const totalPrice = MERCHANDISE[item].sell * 2

    expect(result.player.character.gold).toBe(20_000 + totalPrice)
    expect(result.player.inventory?.[item]).toBe(3)
    expect(result.log).toMatchObject({
      type: "trade",
      message: `Sold 2 ${LOG_NAMES[item].plural} for ${totalPrice} gold.`,
    })
    expect(result.data).toEqual({
      item,
      quantity: 2,
      totalQuantity: 3,
      totalPrice,
    })
  })

  it("can sell everything the player has", () => {
    const result = expectSuccess(
      sellFittings(atShipyard({ inventory: { repairKits: 4 } }), {
        item: "repairKits",
        quantity: 4,
      })
    )

    expect(result.player.inventory?.repairKits).toBe(0)
  })

  it.each(INVALID_WHOLE_NUMBERS)("rejects quantity %s", (quantity) => {
    expectError(
      sellFittings(atShipyard(), { item: "cannons", quantity } as never),
      "Quantity must be a positive whole number"
    )
  })

  it.each([...SHOP_ITEMS, "gold", "constructor", "", undefined])(
    "rejects item %s that the shipyard does not buy",
    (item) => {
      expectError(
        sellFittings(atShipyard(), { item, quantity: 1 } as never),
        "Not a valid item"
      )
    }
  )

  it("rejects selling outside the shipyard", () => {
    expectError(
      sellFittings(createTestPlayer({ inventory: { cannons: 5 } }), {
        item: "cannons",
        quantity: 1,
      }),
      "You must be at Shipyard to do this."
    )
  })

  it("rejects selling more than the player has", () => {
    expectError(
      sellFittings(atShipyard({ inventory: { cannons: 1 } }), {
        item: "cannons",
        quantity: 2,
      }),
      "Not enough cannons."
    )
  })

  it("rejects selling fittings the player has none of", () => {
    expectError(
      sellFittings(atShipyard({ inventory: null }), {
        item: "repairKits",
        quantity: 1,
      }),
      "Not enough repairKits."
    )
  })

  it("rejects a price too large to calculate safely", () => {
    expectError(
      sellFittings(atShipyard(), {
        item: "cannons",
        quantity: Number.MAX_SAFE_INTEGER,
      }),
      "Invalid quantity"
    )
  })
})

describe("buyShip", () => {
  it.each(SHIP_TYPE_KEYS)("buys a %s for its price", (type) => {
    const result = expectSuccess(
      buyShip(atShipyard(), { item: type }, createShip)
    )

    const newShips = Object.values(result.player.ships).filter(
      (ship) => ship.id !== "ship-1"
    )

    expect(result.player.character.gold).toBe(20_000 - SHIP_TYPES[type].buy)
    expect(newShips).toEqual([
      expect.objectContaining({ type, health: 100, createdDay: 10 }),
    ])
    expect(result.data).toEqual({
      item: type,
      totalPrice: SHIP_TYPES[type].buy,
    })
    expect(result.log).toMatchObject({
      type: "ship",
      message: `Bought ship ${type} named ${newShips[0].name} for ${SHIP_TYPES[type].buy} gold.`,
    })
  })

  it("can buy a first ship without any ships", () => {
    const result = expectSuccess(
      buyShip(atShipyard({ ships: null }), { item: "Brig" }, createShip)
    )

    expect(Object.keys(result.player.ships)).toHaveLength(1)
  })

  it("uses the real ship factory by default", () => {
    const result = expectSuccess(buyShip(atShipyard(), { item: "Brig" }))

    expect(Object.keys(result.player.ships)).toHaveLength(2)
  })

  it.each(TITLES)(
    "lets a %s own exactly the number of ships the title allows",
    (title) => {
      const { maxShips } = TITLE_INFO[title]
      let player = atShipyard({
        character: { title, gold: Number.MAX_SAFE_INTEGER },
        ships: null,
      })

      for (let i = 0; i < maxShips; i++) {
        player = expectSuccess(
          buyShip(player, { item: "Merchantman" }, createShip)
        ).player
      }

      expect(Object.keys(player.ships)).toHaveLength(maxShips)
      expectError(
        buyShip(player, { item: "Merchantman" }, createShip),
        "Max ships reached due to title"
      )
    }
  )

  it.each(["Rowboat", "constructor", "", undefined, 5])(
    "rejects ship type %s",
    (item) => {
      expectError(
        buyShip(atShipyard(), { item } as never, createShip),
        "Not a valid item"
      )
    }
  )

  it("rejects buying outside the shipyard", () => {
    expectError(
      buyShip(createTestPlayer(), { item: "Brig" }, createShip),
      "You must be at Shipyard to do this."
    )
  })

  it("rejects buying with too little gold", () => {
    expectError(
      buyShip(
        atShipyard({ character: { gold: SHIP_TYPES.Brig.buy - 1 } }),
        { item: "Brig" },
        createShip
      ),
      "Not enough gold"
    )
  })
})

describe("sellShip", () => {
  it.each(
    SHIP_TYPE_KEYS.flatMap((type) =>
      [0, 50, 100].map((health) => ({ type, health }))
    )
  )(
    "sells a $type at $health% health for half its price",
    ({ type, health }) => {
      const player = atShipyard({ ships: { "ship-1": { type, health } } })

      const result = expectSuccess(sellShip(player, { id: "ship-1" }))

      expect(SHIP_TYPES[type].sell).toBe(SHIP_TYPES[type].buy / 2)
      expect(result.player.character.gold).toBe(20_000 + SHIP_TYPES[type].sell)
      expect(result.player.ships).toEqual({})
      expect(result.data).toEqual({
        ship: player.ships["ship-1"],
        totalPrice: SHIP_TYPES[type].sell,
      })
      expect(result.log).toMatchObject({
        type: "ship",
        message: `Sold ship Test Brig for ${SHIP_TYPES[type].sell} gold.`,
      })
    }
  )

  it.each(["missing", "constructor", "__proto__", "toString", "", undefined])(
    "rejects ship id %s that the player does not own",
    (id) => {
      expectError(sellShip(atShipyard(), { id } as never), "Not a valid item")
    }
  )

  it("rejects selling outside the shipyard", () => {
    expectError(
      sellShip(createTestPlayer(), { id: "ship-1" }),
      "You must be at Shipyard to do this."
    )
  })
})

describe("repairShip", () => {
  it.each([0, 1, 50, 99])("repairs a ship at %i% health", (health) => {
    const player = atShipyard({ ships: { "ship-1": { health } } })

    const result = expectSuccess(repairShip(player, { id: "ship-1" }))

    const totalPrice = (100 - health) * SHIP_REPAIR_COST

    expect(result.player.ships["ship-1"].health).toBe(100)
    expect(result.player.character.gold).toBe(20_000 - totalPrice)
    expect(result.data).toEqual({ ship: player.ships["ship-1"], totalPrice })
    expect(result.log).toMatchObject({
      type: "ship",
      message: `Repaired ship Test Brig for ${totalPrice} gold.`,
    })
  })

  it("only repairs the chosen ship", () => {
    const player = atShipyard({
      ships: {
        "ship-1": { health: 40 },
        "ship-2": {
          id: "ship-2",
          name: "Other",
          type: "Galleon",
          health: 30,
          createdDay: 1,
        },
      },
    })

    const result = expectSuccess(repairShip(player, { id: "ship-1" }))

    expect(result.player.ships["ship-2"].health).toBe(30)
  })

  it("rejects repairing a ship that is not damaged", () => {
    expectError(
      repairShip(atShipyard(), { id: "ship-1" }),
      "Test Brig does not need repairs."
    )
  })

  it.each(["missing", "constructor", "__proto__", "toString", "", undefined])(
    "rejects ship id %s that the player does not own",
    (id) => {
      expectError(repairShip(atShipyard(), { id } as never), "Not a valid item")
    }
  )

  it("rejects repairing outside the shipyard", () => {
    expectError(
      repairShip(createTestPlayer({ ships: { "ship-1": { health: 10 } } }), {
        id: "ship-1",
      }),
      "You must be at Shipyard to do this."
    )
  })

  it("rejects repairing with too little gold", () => {
    expectError(
      repairShip(
        atShipyard({
          character: { gold: 50 * SHIP_REPAIR_COST - 1 },
          ships: { "ship-1": { health: 50 } },
        }),
        { id: "ship-1" }
      ),
      "Not enough gold."
    )
  })
})

describe("shipyard economy", () => {
  it.each(FITTINGS)("%s cannot be bought and sold back for profit", (item) => {
    const player = atShipyard({ inventory: null })

    const bought = expectSuccess(buyFittings(player, { item, quantity: 7 }))
    const sold = expectSuccess(
      sellFittings(bought.player, { item, quantity: 7 })
    )

    const { buy, sell } = MERCHANDISE[item]

    expect(sell).toBeLessThan(buy)
    expect(sold.player.inventory?.[item]).toBe(0)
    expect(player.character.gold - sold.player.character.gold).toBe(
      (buy - sell) * 7
    )
  })

  it.each(SHIP_TYPE_KEYS)(
    "a %s cannot be bought and sold back for profit",
    (type) => {
      const player = atShipyard()

      const bought = expectSuccess(buyShip(player, { item: type }, createShip))
      const newShipId = Object.keys(bought.player.ships).find(
        (id) => id !== "ship-1"
      )!
      const sold = expectSuccess(sellShip(bought.player, { id: newShipId }))

      expect(sold.player.ships).toEqual(player.ships)
      expect(player.character.gold - sold.player.character.gold).toBe(
        SHIP_TYPES[type].buy - SHIP_TYPES[type].sell
      )
    }
  )
})

describe("random shipyard play", () => {
  const LOCATIONS: TownLocation[] = [
    "Shipyard",
    "Shipyard",
    "Shipyard",
    ...OTHER_LOCATIONS,
  ]
  const ITEMS: unknown[] = [...FITTINGS, "food", "gold", undefined]
  const QUANTITIES: unknown[] = [1, 2, 5, 10, 0, -3, 2.5, "4", 1e20]
  const SHIP_ITEMS: unknown[] = [...SHIP_TYPE_KEYS, "Rowboat"]

  const isValidInventory = (inventory: Inventory | undefined) =>
    Object.values(inventory ?? {}).every(
      (quantity) => Number.isSafeInteger(quantity) && quantity >= 0
    )

  it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])(
    "keeps the game consistent with seed %i",
    (seed) => {
      const random = createSeededRandom(seed)
      const succeededActions = new Set<number>()

      let player = createTestPlayer({
        character: {
          gold: random.int(0, 20_000),
          title: random.pick(TITLES),
        },
      })

      for (let step = 0; step < 1000; step++) {
        player = {
          ...player,
          character: {
            ...player.character,
            // Sometimes earn gold elsewhere, so the player does not go broke for good
            gold:
              player.character.gold +
              (random.int(0, 9) === 0 ? random.int(0, 20_000) : 0),
            location: random.pick(LOCATIONS),
          },
          // Sometimes ships get damaged, like in a sea battle
          ships:
            random.int(0, 4) === 0
              ? Object.fromEntries(
                  Object.entries(player.ships).map(([id, ship]) => [
                    id,
                    { ...ship, health: random.int(0, 100) },
                  ])
                )
              : player.ships,
        }

        const before = deepFreeze(structuredClone(player))
        const action = random.int(0, 4)
        const shipIds = Object.keys(before.ships)
        const shipId =
          random.int(0, 4) > 0 && shipIds.length
            ? random.pick(shipIds)
            : random.pick(["missing", "constructor"])
        const item = random.pick(ITEMS) as keyof Inventory
        const quantity = random.pick(QUANTITIES) as number
        const context = `seed ${seed}, step ${step}, action ${action}, ${String(item)} x ${String(quantity)}, ship ${shipId}`

        const result =
          action === 0
            ? buyFittings(before, { item, quantity })
            : action === 1
              ? sellFittings(before, { item, quantity })
              : action === 2
                ? buyShip(
                    before,
                    { item: random.pick(SHIP_ITEMS) as ShipType },
                    createShip
                  )
                : action === 3
                  ? sellShip(before, { id: shipId })
                  : repairShip(before, { id: shipId })

        if ("error" in result) {
          expect(result.error, context).toBeTruthy()
          continue
        }

        succeededActions.add(action)

        const after = result.player
        const goldEarned = after.character.gold - before.character.gold
        const goldSpent = before.character.gold - after.character.gold
        const shipsBefore = Object.keys(before.ships).length
        const shipsAfter = Object.keys(after.ships).length

        expect(after.character.location, context).toBe("Shipyard")
        expect(after.character.gold, context).toBeGreaterThanOrEqual(0)
        expect(Number.isSafeInteger(after.character.gold), context).toBe(true)
        expect(isValidInventory(after.inventory), context).toBe(true)
        expect(after.crewMembers, context).toEqual(before.crewMembers)
        expect(shipsAfter, context).toBeLessThanOrEqual(
          TITLE_INFO[after.character.title].maxShips
        )
        Object.values(after.ships).forEach((ship) => {
          expect(ship.health, context).toBeGreaterThanOrEqual(0)
          expect(ship.health, context).toBeLessThanOrEqual(100)
        })

        if (action === 0 || action === 1) {
          const { totalPrice } = result.data as { totalPrice: number }
          const itemChange =
            (after.inventory?.[item] ?? 0) - (before.inventory?.[item] ?? 0)

          expect(action === 0 ? goldSpent : goldEarned, context).toBe(
            totalPrice
          )
          expect(itemChange, context).toBe(action === 0 ? quantity : -quantity)
        } else {
          expect(after.inventory, context).toEqual(before.inventory)
        }

        if (action === 2) {
          const { totalPrice } = result.data as { totalPrice: number }
          expect(goldSpent, context).toBe(totalPrice)
          expect(shipsAfter, context).toBe(shipsBefore + 1)
        }

        if (action === 3) {
          const { ship } = result.data as { ship: Ship }
          expect(goldEarned, context).toBe(SHIP_TYPES[ship.type].sell)
          expect(shipsAfter, context).toBe(shipsBefore - 1)
        }

        if (action === 4) {
          const { ship } = result.data as { ship: Ship }
          expect(goldSpent, context).toBe(
            (100 - ship.health) * SHIP_REPAIR_COST
          )
          expect(goldSpent, context).toBeGreaterThan(0)
          expect(after.ships[shipId].health, context).toBe(100)
        }

        player = after
      }

      // Guards against random play that only ever hits errors
      expect(succeededActions.size).toBe(5)
    }
  )
})
