import { describe, expect, it } from "vitest"

import { isTradeGoodAvailableInTown } from "@/constants/merchandise"
import {
  applyTradeChanges,
  describeItems,
  formatAmountChange,
  formatGoldChange,
  formatQuantity,
  formatSigned,
  getAffordableTarget,
  getChangeGold,
  getDailyConsumption,
  getDaysWorthOfNecessities,
  getGoldLeftForItem,
  getItemChange,
  getNecessitiesTargets,
  getPlannedAmount,
  getSellBarterGoodsTargets,
  getShopItems,
  getTradeChanges,
  getTradeGold,
  getTradeToast,
  getUnit,
  hasPlannedBarterGoods,
} from "@/utils/shop"

import { createTestPlayer, deepFreeze } from "./helpers/createTestPlayer"
import { createSeededRandom } from "./helpers/seededRandom"

describe("shop utils", () => {
  it.each([
    [0, 0, 0],
    [1, 1, 1],
    [4, 1, 1],
    [5, 1, 1],
    [14, 1, 3],
    [15, 2, 3],
    [25, 3, 5],
    [100, 10, 20],
  ])(
    "getDailyConsumption: %i crew use %i food and %i water a day",
    (crew, food, water) => {
      expect(getDailyConsumption(crew)).toEqual({ food, water })
    }
  )

  it("getDaysWorthOfNecessities returns min days for food and water", () => {
    const days = getDaysWorthOfNecessities({
      crewMembers: 5,
      food: 2,
      water: 4,
    })
    // 5 crew use at least 1 food and 1 water a day, so 2 food lasts 2 days
    expect(days).toBe(2)
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

describe("trade draft utils", () => {
  it("getTradeChanges only lists items whose target differs", () => {
    expect(
      getTradeChanges({ food: 10, water: 20 }, { food: 4, water: 20, rum: 3 })
    ).toEqual([
      { item: "food", quantity: -6 },
      { item: "rum", quantity: 3 },
    ])
  })

  it("getChangeGold pays the sell price below and the buy price above", () => {
    expect(getChangeGold({ item: "food", quantity: -2 })).toBe(22)
    expect(getChangeGold({ item: "food", quantity: 2 })).toBe(-32)
  })

  it("getTradeGold adds up the whole trade", () => {
    expect(
      getTradeGold([
        { item: "food", quantity: -10 },
        { item: "water", quantity: 9 },
      ])
    ).toBe(110 - 108)
    expect(getTradeGold([])).toBe(0)
  })

  it("getAffordableTarget buys what the gold allows on top of what is owned", () => {
    expect(getAffordableTarget("food", 5, 50)).toBe(8)
    expect(getAffordableTarget("food", 5, -40)).toBe(5)
  })

  it("getNecessitiesTargets tops up food and water for the days", () => {
    // 20 crew use 2 food and 4 water a day
    expect(
      getNecessitiesTargets({ crewMembers: 20, food: 10, water: 50 }, 10)
    ).toEqual({ food: 20, water: 50 })
  })

  it("getNecessitiesTargets keeps a planned purchase larger than it needs", () => {
    // The player plans to own 100 water, more than 10 days need
    expect(
      getNecessitiesTargets({ crewMembers: 20, food: 0, water: 100 }, 10)
    ).toEqual({ food: 20, water: 100 })
  })

  it("getNecessitiesTargets tops up from a planned sale", () => {
    // The player planned to sell all food, so the preset buys it back
    expect(
      getNecessitiesTargets({ crewMembers: 20, food: 0, water: 40 }, 5)
    ).toEqual({ food: 10, water: 40 })
  })

  it("getNecessitiesTargets always lasts the requested days and never lowers", () => {
    const random = createSeededRandom(42)

    for (let i = 0; i < 2000; i++) {
      const crewMembers = random.int(1, 300)
      const days = random.int(1, 60)
      const food = random.int(0, 100)
      const water = random.int(0, 200)

      const targets = getNecessitiesTargets({ crewMembers, food, water }, days)
      const context = `crew ${crewMembers}, days ${days}, ${food} food, ${water} water`

      expect(targets.food, context).toBeGreaterThanOrEqual(food)
      expect(targets.water, context).toBeGreaterThanOrEqual(water)
      expect(
        getDaysWorthOfNecessities({
          crewMembers,
          food: targets.food,
          water: targets.water,
        }),
        context
      ).toBeGreaterThanOrEqual(days)
    }
  })

  it("getSellBarterGoodsTargets sets every barter good the local shop accepts to zero", () => {
    // Port Royale trades porcelain but not spices
    const targets = getSellBarterGoodsTargets(
      getShopItems("Port Royale").barterGoods
    )

    expect(targets).toMatchObject({ rum: 0, tobacco: 0, porcelain: 0 })
    expect(targets).not.toHaveProperty("spices")
    expect(Object.values(targets).every((target) => target === 0)).toBe(true)
  })

  it("getSellBarterGoodsTargets also undoes planned purchases", () => {
    // Porcelain is not owned, but the draft plans to buy 5
    const targets = { porcelain: 5, food: 4 }
    const changes = getTradeChanges(
      { food: 10 },
      {
        ...targets,
        ...getSellBarterGoodsTargets(getShopItems("Port Royale").barterGoods),
      }
    )

    expect(changes).toEqual([{ item: "food", quantity: -6 }])
  })

  it("getSellBarterGoodsTargets never sells medicine, since it is a utility", () => {
    expect(
      getSellBarterGoodsTargets(getShopItems("Port Royale").barterGoods)
    ).not.toHaveProperty("medicine")
  })

  it("getShopItems groups the items this town trades", () => {
    const { necessities, utilities, barterGoods } = getShopItems("Port Royale")

    expect(necessities).toEqual(["food", "water"])
    expect(utilities).toEqual(["medicine"])
    expect(barterGoods).not.toContain("medicine")
    expect(barterGoods).toContain("porcelain")
    expect(barterGoods).not.toContain("spices")
  })
})

describe("planned trade utils", () => {
  const portRoyaleBarterGoods = getShopItems("Port Royale").barterGoods

  it("getPlannedAmount prefers the target, then what is owned, then zero", () => {
    expect(getPlannedAmount({ food: 10 }, { food: 4 }, "food")).toBe(4)
    expect(getPlannedAmount({ food: 10 }, { water: 4 }, "food")).toBe(10)
    expect(getPlannedAmount(undefined, {}, "rum")).toBe(0)
  })

  it("getPlannedAmount keeps a planned zero", () => {
    expect(getPlannedAmount({ food: 10 }, { food: 0 }, "food")).toBe(0)
  })

  it("hasPlannedBarterGoods sees owned and planned barter goods", () => {
    expect(hasPlannedBarterGoods(portRoyaleBarterGoods, { rum: 2 }, {})).toBe(
      true
    )
    expect(
      hasPlannedBarterGoods(portRoyaleBarterGoods, {}, { porcelain: 1 })
    ).toBe(true)
  })

  it("hasPlannedBarterGoods ignores sold goods, medicine and goods this port does not trade", () => {
    expect(
      hasPlannedBarterGoods(portRoyaleBarterGoods, { rum: 2 }, { rum: 0 })
    ).toBe(false)
    expect(
      hasPlannedBarterGoods(portRoyaleBarterGoods, { medicine: 5 }, {})
    ).toBe(false)
    // Port Royale does not trade spices
    expect(
      hasPlannedBarterGoods(portRoyaleBarterGoods, { spices: 5 }, {})
    ).toBe(false)
  })

  it("getGoldLeftForItem counts every other change but not the item itself", () => {
    const changes = [
      { item: "food" as const, quantity: -10 },
      { item: "water" as const, quantity: 5 },
    ]

    // 100 gold plus 110 from food. The planned water does not count against water.
    expect(getGoldLeftForItem(100, changes, "water")).toBe(210)
    // 100 gold minus 60 for water. The planned food sale does not count for food.
    expect(getGoldLeftForItem(100, changes, "food")).toBe(40)
    expect(getGoldLeftForItem(100, [], "rum")).toBe(100)
  })

  it("Buy max uses gold from selling other items", () => {
    // Sell 10 food for 110 gold, then buy as much water as 210 gold allows
    const changes = [{ item: "food" as const, quantity: -10 }]
    const goldLeft = getGoldLeftForItem(100, changes, "water")

    expect(getAffordableTarget("water", 20, goldLeft)).toBe(20 + 17)
  })

  it("applyTradeChanges updates gold and inventory without changing the player", () => {
    const player = deepFreeze(createTestPlayer())

    const after = applyTradeChanges(player, [
      { item: "food", quantity: -4 },
      { item: "rum", quantity: 1 },
    ])

    expect(after.character.gold).toBe(1000 + 44 - 150)
    expect(after.inventory).toMatchObject({ food: 6, water: 20, rum: 1 })
    expect(player.inventory).toEqual({ food: 10, water: 20 })
  })
})

describe("trade text utils", () => {
  it("getUnit uses the single unit only for one", () => {
    expect(getUnit("food", 1)).toBe("crate")
    expect(getUnit("food", 0)).toBe("crates")
    expect(getUnit("medicine", 2)).toBe("boxes")
  })

  it("formatQuantity adds the unit", () => {
    expect(formatQuantity("water", 1)).toBe("1 barrel")
    expect(formatQuantity("water", 35)).toBe("35 barrels")
  })

  it("describeItems lists items with units", () => {
    expect(
      describeItems([
        { item: "food", quantity: 5 },
        { item: "water", quantity: 1 },
      ])
    ).toBe("5 crates of food, 1 barrel of water")
    expect(describeItems([])).toBe("")
  })

  it("formatAmountChange shows the change only when there is one", () => {
    expect(formatAmountChange("food", 20, 10)).toBe("20 → 10 crates")
    expect(formatAmountChange("food", 0, 1)).toBe("0 → 1 crate")
    expect(formatAmountChange("water", 35, 35)).toBe("35 barrels")
  })

  it("getItemChange describes selling, buying and no change", () => {
    expect(getItemChange("food", 20, 10)).toEqual({
      action: "Sell",
      amount: 10,
      gold: 110,
    })
    expect(getItemChange("water", 35, 37)).toEqual({
      action: "Buy",
      amount: 2,
      gold: -24,
    })
    expect(getItemChange("rum", 3, 3)).toMatchObject({
      action: null,
      amount: 0,
    })
  })

  it("formatSigned and formatGoldChange show the sign and group thousands", () => {
    expect(formatSigned(110)).toBe("+110")
    expect(formatSigned(-1250)).toBe("−1,250")
    expect(formatSigned(0)).toBe("0")
    expect(formatGoldChange(-24)).toBe("−24 gold")
    expect(formatGoldChange(0)).toBe("0 gold")
  })

  it("getTradeToast sums up a mixed trade", () => {
    expect(
      getTradeToast({
        sold: [{ item: "food", quantity: 10 }],
        bought: [{ item: "water", quantity: 1 }],
        gold: 98,
      })
    ).toEqual({
      title: "You received 98 gold",
      message: "Sold 10 crates of food. Bought 1 barrel of water.",
    })
  })

  it("getTradeToast handles paying and breaking even", () => {
    expect(
      getTradeToast({
        sold: [],
        bought: [{ item: "rum", quantity: 2 }],
        gold: -300,
      })
    ).toEqual({
      title: "You paid 300 gold",
      message: "Bought 2 barrels of rum.",
    })

    expect(getTradeToast({ sold: [], bought: [], gold: 0 }).title).toBe(
      "The trade evened out"
    )
  })
})
