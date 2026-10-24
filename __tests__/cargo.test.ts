import { describe, expect, it } from "vitest"

import { SHIP_TYPES } from "@/constants/ship"
import {
  addsCargo,
  getCargo,
  getCargoAfterTrade,
  getCargoCapacity,
  getCargoLeftForItem,
  getCargoLoad,
  getLootItemMax,
  getLootPreset,
  getShipRemovalCargoWarning,
  getStorableTarget,
  isCargo,
  isOverloaded,
} from "@/utils/cargo"

import { createTestPlayer } from "./helpers/createTestPlayer"

const ship = (id: string, type: ShipType): Ship => ({
  id,
  name: id,
  type,
  health: 100,
  createdDay: 1,
})

describe("cargo", () => {
  it("counts shop goods and leaves out cannons and repair kits", () => {
    expect(isCargo("food")).toBe(true)
    expect(isCargo("medicine")).toBe(true)
    expect(isCargo("rum")).toBe(true)
    expect(isCargo("cannons")).toBe(false)
    expect(isCargo("repairKits")).toBe(false)
  })

  it("adds up the capacity of every ship in the fleet", () => {
    expect(getCargoCapacity(undefined)).toBe(0)
    expect(
      getCargoCapacity({
        a: ship("a", "Brig"),
        b: ship("b", "Merchantman"),
        c: ship("c", "Frigate"),
      })
    ).toBe(
      SHIP_TYPES.Brig.cargoCapacity +
        SHIP_TYPES.Merchantman.cargoCapacity +
        SHIP_TYPES.Frigate.cargoCapacity
    )
  })

  it("gives the Merchantman the most space for its price", () => {
    const perGold = (type: ShipType) =>
      SHIP_TYPES[type].cargoCapacity / SHIP_TYPES[type].buy

    for (const type of ["Brig", "Galleon", "Frigate"] as ShipType[]) {
      expect(perGold("Merchantman")).toBeGreaterThan(perGold(type))
    }
  })

  it("loads one slot per unit of cargo", () => {
    expect(getCargoLoad(undefined)).toBe(0)
    expect(
      getCargoLoad({ food: 10, water: 20, rum: 3, cannons: 50, repairKits: 9 })
    ).toBe(33)
  })

  it("reports free space and overload", () => {
    const fits = createTestPlayer({ inventory: { food: 100, water: 150 } })
    const tooMuch = createTestPlayer({ inventory: { food: 200, water: 150 } })

    expect(getCargo(fits)).toEqual({
      capacity: 300,
      load: 250,
      free: 50,
      overload: 0,
    })
    expect(isOverloaded(fits)).toBe(false)
    expect(getCargo(tooMuch)).toMatchObject({ free: 0, overload: 50 })
    expect(isOverloaded(tooMuch)).toBe(true)
  })

  it("is overloaded without ships when carrying cargo", () => {
    expect(isOverloaded(createTestPlayer({ ships: null }))).toBe(true)
  })

  it("counts the rest of the planned trade when limiting one item", () => {
    // 30 aboard, 300 capacity: selling 10 food frees room for rum
    const player = createTestPlayer({ inventory: { food: 10, water: 20 } })
    const changes = [
      { item: "food" as const, quantity: -10 },
      { item: "rum" as const, quantity: 50 },
      { item: "cannons" as const, quantity: 40 },
    ]

    expect(getCargoAfterTrade(player.inventory, changes)).toBe(70)
    expect(getCargoLeftForItem(player, changes, "rum")).toBe(280)
    expect(getCargoLeftForItem(player, changes, "water")).toBe(230)
    expect(getStorableTarget("water", 20, 230)).toBe(250)
  })

  it("never limits an item below what is owned or limits non-cargo", () => {
    expect(getStorableTarget("food", 40, -25)).toBe(40)
    expect(getStorableTarget("cannons", 4, 0)).toBe(Infinity)
  })

  it("knows when a trade loads cargo", () => {
    expect(addsCargo([{ item: "food", quantity: -5 }])).toBe(false)
    expect(addsCargo([{ item: "cannons", quantity: 5 }])).toBe(false)
    expect(addsCargo([{ item: "rum", quantity: 1 }])).toBe(true)
  })
})

describe("loot", () => {
  const offer = { food: 8, water: 6, rum: 3, silk: 5, cannons: 2 }

  it("takes everything when it fits", () => {
    expect(getLootPreset(offer, 100)).toEqual(offer)
  })

  it("fills supplies first, then the most valuable goods", () => {
    expect(getLootPreset(offer, 16)).toEqual({
      food: 8,
      water: 6,
      rum: 2,
      silk: 0,
      cannons: 2,
    })
  })

  it("always takes items that are not cargo", () => {
    expect(getLootPreset(offer, 0)).toEqual({
      food: 0,
      water: 0,
      rum: 0,
      silk: 0,
      cannons: 2,
    })
  })

  it("limits one item to what fits next to the rest of the choice", () => {
    const choice = { food: 8, water: 6, rum: 0, silk: 0, cannons: 2 }

    expect(getLootItemMax(offer, choice, "silk", 16)).toBe(2)
    expect(getLootItemMax(offer, choice, "silk", 100)).toBe(5)
    expect(getLootItemMax(offer, choice, "silk", 10)).toBe(0)
    expect(getLootItemMax(offer, choice, "cannons", 0)).toBe(2)
  })
})

describe("removing a ship", () => {
  const twoShips = {
    brig: ship("brig", "Brig"),
    merchantman: ship("merchantman", "Merchantman"),
  }

  it("warns when the rest of the fleet cannot carry the cargo", () => {
    const player = createTestPlayer({
      ships: { "ship-1": null, ...twoShips },
      inventory: { food: 200, water: 220 },
    })

    expect(getShipRemovalCargoWarning(player, "merchantman")).toBe(
      "This leaves you overloaded by 120. You cannot leave port until you sell goods or buy another ship."
    )
    expect(getShipRemovalCargoWarning(player, "brig")).toBeUndefined()
  })
})
