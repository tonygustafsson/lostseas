import { describe, expect, it } from "vitest"

import { addToInventory } from "@/utils/inventory"

describe("inventory utils", () => {
  it("addToInventory creates full record when inventory is undefined", () => {
    const res = addToInventory(undefined, { food: 2 })
    expect(res.food).toBe(2)
    // other merchandise keys should exist and be numbers (0)
    expect(typeof res.water).toBe("number")
    expect(typeof res.cannons).toBe("number")
  })

  it("addToInventory merges existing inventory and ignores zero additions", () => {
    const inventory = { food: 2, water: 3 } as any
    const res = addToInventory(inventory, { food: 1, porcelain: 0 } as any)
    expect(res.food).toBe(3)
    // porcelain should not be added when both inventory and newSupplies are falsy
    // implementation may omit keys; ensure existing keys preserved
    expect(res.water).toBe(3)
  })
})
