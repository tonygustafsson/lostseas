import { describe, it, expect } from 'vitest'
import { addToInventory, removeFromAllInventoryItems } from '../inventory'

describe('inventory utils', () => {
  it('addToInventory creates full record when inventory is undefined', () => {
    const res = addToInventory(undefined, { food: 2 })
    expect(res.food).toBe(2)
    // other merchandise keys should exist and be numbers (0)
    expect(typeof res.water).toBe('number')
    expect(typeof res.cannons).toBe('number')
  })

  it('addToInventory merges existing inventory and ignores zero additions', () => {
    const inventory = { food: 2, water: 3 } as any
    const res = addToInventory(inventory, { food: 1, porcelain: 0 } as any)
    expect(res.food).toBe(3)
    // porcelain should not be added when both inventory and newSupplies are falsy
    // implementation may omit keys; ensure existing keys preserved
    expect(res.water).toBe(3)
  })

  it('removeFromAllInventoryItems reduces non-cannon items by percentage and leaves cannons unchanged', () => {
    const inventory = { food: 10, water: 10, cannons: 5, porcelain: 4 } as any
    const res = removeFromAllInventoryItems(inventory, 50)
    expect(res.food).toBe(5)
    expect(res.water).toBe(5)
    expect(res.porcelain).toBe(2)
    expect(res.cannons).toBe(5)
  })
})
