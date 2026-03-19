import { describe, it, expect } from 'vitest'
import {
  getNecessitiesInfo,
  getDaysWorthOfNecessities,
  getBarterGoodsValue,
} from '../shop'

describe('shop utils', () => {
  it('getNecessitiesInfo computes needed amounts and cost', () => {
    const info = getNecessitiesInfo({ crewMembers: 10, currentFood: 1, currentWater: 2, days: 2 })
    // foodConsumption = ceil(10 * 0.1 * 2) = 2, water = 4
    expect(info.foodNeeded).toBe(1)
    expect(info.waterNeeded).toBe(2)
    // using MERCHANDISE prices: food.buy = 16, water.buy = 12 => cost = 16*1 + 12*2 = 40
    expect(info.cost).toBe(40)
  })

  it('getDaysWorthOfNecessities returns min days for food and water', () => {
    const days = getDaysWorthOfNecessities({ crewMembers: 5, currentFood: 2, currentWater: 4 })
    // foodConsumption = 0.5 -> foodDays = floor(2/0.5)=4; waterConsumption =1 -> waterDays=4
    expect(days).toBe(4)
  })

  it('getBarterGoodsValue sums only barter goods sell value', () => {
    const inventory = { porcelain: 2, spices: 3, tobacco: 1, rum: 0, food: 5 } as any
    const value = getBarterGoodsValue(inventory)
    // porcelain.sell=24*2=48; spices.sell=14*3=42; tobacco.sell=52*1=52 => total 142
    expect(value).toBe(142)
  })
})
