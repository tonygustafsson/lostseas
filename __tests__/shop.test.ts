import { describe, expect, it } from "vitest"

import { isTradeGoodAvailableInTown } from "@/constants/merchandise"
import {
  getBarterGoodsValue,
  getDaysWorthOfNecessities,
  getNecessitiesInfo,
} from "@/utils/shop"

describe("shop utils", () => {
  it("getNecessitiesInfo computes needed amounts and cost", () => {
    const info = getNecessitiesInfo({
      crewMembers: 10,
      currentFood: 1,
      currentWater: 2,
      days: 2,
    })
    // foodConsumption = ceil(10 * 0.1 * 2) = 2, water = 4
    expect(info.foodNeeded).toBe(1)
    expect(info.waterNeeded).toBe(2)
    // using MERCHANDISE prices: food.buy = 16, water.buy = 12 => cost = 16*1 + 12*2 = 40
    expect(info.cost).toBe(40)
  })

  it("getDaysWorthOfNecessities returns min days for food and water", () => {
    const days = getDaysWorthOfNecessities({
      crewMembers: 5,
      currentFood: 2,
      currentWater: 4,
    })
    // foodConsumption = 0.5 -> foodDays = floor(2/0.5)=4; waterConsumption =1 -> waterDays=4
    expect(days).toBe(4)
  })

  it("getBarterGoodsValue sums only barter goods sell value", () => {
    const inventory = {
      porcelain: 2,
      spices: 3,
      tobacco: 1,
      rum: 0,
      food: 5,
    } as any
    const value = getBarterGoodsValue({
      inventory,
      character: { town: undefined },
    })
    // porcelain.sell=24*2=48; spices.sell=14*3=42; tobacco.sell=52*1=52 => total 142
    expect(value).toBe(142)
  })

  it("getBarterGoodsValue with town only counts items available in that town", () => {
    const inventory = {
      porcelain: 2, // available in Port Royale, NOT in Charles Towne
      spices: 3, // available in Charles Towne, NOT in Port Royale
      tobacco: 1, // not restricted — always counts
    } as any

    // Port Royale: porcelain + tobacco (spices not available here)
    const portRoyaleValue = getBarterGoodsValue({
      inventory,
      character: { town: "Port Royale" },
    })
    // porcelain.sell=24*2=48; tobacco.sell=52*1=52 => 100
    expect(portRoyaleValue).toBe(100)

    // Charles Towne: spices + tobacco (porcelain not available here)
    const charlesTowneValue = getBarterGoodsValue({
      inventory,
      character: { town: "Charles Towne" },
    })
    // spices.sell=14*3=42; tobacco.sell=52*1=52 => 94
    expect(charlesTowneValue).toBe(94)
  })
})

describe("isTradeGoodAvailableInTown", () => {
  it("unrestricted items are always available regardless of town", () => {
    expect(isTradeGoodAvailableInTown("food", undefined)).toBe(true)
    expect(isTradeGoodAvailableInTown("water", "Port Royale")).toBe(true)
    expect(isTradeGoodAvailableInTown("medicine", "Havana")).toBe(true)
    expect(isTradeGoodAvailableInTown("tobacco", undefined)).toBe(true)
    expect(isTradeGoodAvailableInTown("rum", "Belize")).toBe(true)
    expect(isTradeGoodAvailableInTown("cannons", "Panama")).toBe(true)
  })

  it("restricted trade good is available in a town that carries it", () => {
    expect(isTradeGoodAvailableInTown("porcelain", "Port Royale")).toBe(true)
    expect(isTradeGoodAvailableInTown("spices", "Charles Towne")).toBe(true)
    expect(isTradeGoodAvailableInTown("sugar", "Barbados")).toBe(true)
    expect(isTradeGoodAvailableInTown("silk", "Havana")).toBe(true)
    expect(isTradeGoodAvailableInTown("tea", "Bonaire")).toBe(true)
    expect(isTradeGoodAvailableInTown("cotton", "Belize")).toBe(true)
  })

  it("restricted trade good is NOT available in a town that does not carry it", () => {
    expect(isTradeGoodAvailableInTown("porcelain", "Charles Towne")).toBe(false)
    expect(isTradeGoodAvailableInTown("spices", "Port Royale")).toBe(false)
    expect(isTradeGoodAvailableInTown("sugar", "Panama")).toBe(false)
    expect(isTradeGoodAvailableInTown("silk", "Barbados")).toBe(false)
    expect(isTradeGoodAvailableInTown("tea", "Panama")).toBe(false)
    expect(isTradeGoodAvailableInTown("cotton", "San Juan")).toBe(false)
  })

  it("restricted trade good with undefined town returns false (secure default-deny)", () => {
    expect(isTradeGoodAvailableInTown("porcelain", undefined)).toBe(false)
    expect(isTradeGoodAvailableInTown("spices", undefined)).toBe(false)
    expect(isTradeGoodAvailableInTown("sugar", undefined)).toBe(false)
    expect(isTradeGoodAvailableInTown("silk", undefined)).toBe(false)
    expect(isTradeGoodAvailableInTown("tea", undefined)).toBe(false)
    expect(isTradeGoodAvailableInTown("cotton", undefined)).toBe(false)
  })

  it("every town has at least one restricted trade good available", () => {
    const towns: Town[] = [
      "Charles Towne",
      "Belize",
      "Port Royale",
      "Barbados",
      "Martinique",
      "Biloxi",
      "Tortuga",
      "Leogane",
      "Curacao",
      "St. Eustatius",
      "Bonaire",
      "St. Martin",
      "Panama",
      "San Juan",
      "Havana",
      "Villa Hermosa",
    ]
    const restrictedGoods = [
      "porcelain",
      "spices",
      "sugar",
      "silk",
      "tea",
      "cotton",
    ] as const

    for (const town of towns) {
      const hasAtLeastOne = restrictedGoods.some((item) =>
        isTradeGoodAvailableInTown(item, town)
      )
      expect(hasAtLeastOne, `${town} should have at least one trade good`).toBe(
        true
      )
    }
  })
})
