export const MERCHANDISE: Record<
  keyof Inventory,
  {
    buy: number
    sell: number
    singleUnit: string
    unit: string
    description: string
    availableAt: "shop" | "shipyard"
    /** Marks items that can be traded for profit but have no other purpose. */
    isBarterGoods?: true
    /** Marks items that are essential for survival, like food and water. */
    isNecessity?: true
    /** Marks items that are useful for the ship or crew but not essential for survival. */
    isUtility?: true
    /** If set, this item is only buyable/sellable in these specific towns. */
    towns?: Town[]
  }
> = {
  food: {
    buy: 16,
    sell: 11,
    singleUnit: "crate",
    unit: "crates",
    description: "You need food to travel the open seas.",
    availableAt: "shop",
    isNecessity: true,
  },
  water: {
    buy: 12,
    sell: 8,
    singleUnit: "barrel",
    unit: "barrels",
    description: "You need water to travel the open seas.",
    availableAt: "shop",
    isNecessity: true,
  },
  porcelain: {
    buy: 35,
    sell: 24,
    singleUnit: "crate",
    unit: "crates",
    description: "A great trading asset. Not used for anything specific.",
    availableAt: "shop",
    isBarterGoods: true,
    towns: [
      "Port Royale",
      "Barbados",
      "St. Eustatius",
      "St. Martin",
      "Panama",
      "San Juan",
      "Havana",
      "Martinique",
    ],
  },
  spices: {
    buy: 20,
    sell: 14,
    singleUnit: "crate",
    unit: "crates",
    description: "A great trading asset. Not used for anything specific.",
    availableAt: "shop",
    isBarterGoods: true,
    towns: [
      "Charles Towne",
      "Belize",
      "Biloxi",
      "Tortuga",
      "Leogane",
      "Bonaire",
      "Curacao",
      "Villa Hermosa",
    ],
  },
  medicine: {
    buy: 15,
    sell: 10,
    singleUnit: "box",
    unit: "boxes",
    description:
      "You can heal your crew with this mix of willow bark and herbs.",
    availableAt: "shop",
    isUtility: true,
  },
  tobacco: {
    buy: 75,
    sell: 52,
    singleUnit: "crate",
    unit: "crates",
    description: "A great trading asset and can also make your crew happy.",
    availableAt: "shop",
    isBarterGoods: true,
  },
  rum: {
    buy: 150,
    sell: 105,
    singleUnit: "barrel",
    unit: "barrels",
    description: "A great trading asset and can also make your crew happy.",
    availableAt: "shop",
    isBarterGoods: true,
  },
  sugar: {
    buy: 25,
    sell: 17,
    singleUnit: "crate",
    unit: "crates",
    description: "A great trading asset. Not used for anything specific.",
    availableAt: "shop",
    isBarterGoods: true,
    towns: [
      "Barbados",
      "Martinique",
      "Port Royale",
      "Belize",
      "Leogane",
      "Havana",
      "San Juan",
      "Villa Hermosa",
      "Bonaire",
      "St. Eustatius",
    ],
  },
  silk: {
    buy: 45,
    sell: 31,
    singleUnit: "bolt",
    unit: "bolts",
    description: "A great trading asset. Not used for anything specific.",
    availableAt: "shop",
    isBarterGoods: true,
    towns: [
      "Charles Towne",
      "Port Royale",
      "Panama",
      "Havana",
      "Martinique",
      "St. Martin",
      "Biloxi",
      "Curacao",
    ],
  },
  tea: {
    buy: 30,
    sell: 21,
    singleUnit: "crate",
    unit: "crates",
    description: "A great trading asset. Not used for anything specific.",
    availableAt: "shop",
    isBarterGoods: true,
    towns: [
      "Charles Towne",
      "Barbados",
      "St. Eustatius",
      "Bonaire",
      "Tortuga",
      "St. Martin",
      "Curacao",
      "Biloxi",
    ],
  },
  cotton: {
    buy: 22,
    sell: 15,
    singleUnit: "bale",
    unit: "bales",
    description: "A great trading asset. Not used for anything specific.",
    availableAt: "shop",
    isBarterGoods: true,
    towns: [
      "Charles Towne",
      "Belize",
      "Barbados",
      "Leogane",
      "Biloxi",
      "Villa Hermosa",
      "Tortuga",
      "Bonaire",
    ],
  },
  cannons: {
    buy: 300,
    sell: 200,
    singleUnit: "cannon",
    unit: "cannons",
    description:
      "You need cannons to fight other ships. You need 2 crew members per cannon in order to make it functional.",
    availableAt: "shipyard",
  },
  repairKits: {
    buy: 60,
    sell: 40,
    singleUnit: "kit",
    unit: "kits",
    description:
      "Repair a ship anywhere, including at sea. Each kit restores up to 10 percentage points of health to one ship. It's cheaper to repair at the shipyard though.",
    availableAt: "shipyard",
    isUtility: true,
  },
}

/** Items that can be traded for profit but have no functional purpose. */
export const BARTER_GOODS = Object.keys(MERCHANDISE).filter((k) => {
  const item = MERCHANDISE[k as keyof typeof MERCHANDISE]
  return item.availableAt === "shop" && (item.isBarterGoods || item.isUtility)
})

/** Restricted trade goods mapped to the towns where they are available. */
export const TRADE_GOODS_TOWNS = Object.fromEntries(
  Object.entries(MERCHANDISE)
    .filter(([, v]) => v.towns)
    .map(([k, v]) => [k, v.towns!])
) as Record<string, Town[]>

export const isTradeGoodAvailableInTown = (
  item: keyof Inventory,
  town: Town | undefined
): boolean => {
  const towns = MERCHANDISE[item]?.towns

  if (!towns) return true // not town-restricted
  if (!town) return false // restricted but no town context — deny

  return towns.includes(town)
}
