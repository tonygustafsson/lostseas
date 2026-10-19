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
    description:
      "Salt pork, hard tack and the odd weevil. Every 10 crew eat a crate a day, and no captain leaves port without 5 days' worth.",
    availableAt: "shop",
    isNecessity: true,
  },
  water: {
    buy: 12,
    sell: 8,
    singleUnit: "barrel",
    unit: "barrels",
    description:
      "Fresh water in oak barrels, worth more than gold when the wind dies. Every 5 crew drink a barrel a day.",
    availableAt: "shop",
    isNecessity: true,
  },
  porcelain: {
    buy: 35,
    sell: 24,
    singleUnit: "crate",
    unit: "crates",
    description:
      "Delicate blue and white china from the far East. Pack it in straw and sell it where the wealthy dine.",
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
    description:
      "Pepper, cloves and nutmeg, once worth more than their weight in silver. Only a few ports have the taste for them.",
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
      "Willow bark, bitter herbs and a splash of something stronger. Give it to your crew to bring their health back up.",
    availableAt: "shop",
    isUtility: true,
  },
  tobacco: {
    buy: 75,
    sell: 52,
    singleUnit: "crate",
    unit: "crates",
    description:
      "Fragrant leaf, cured and pressed into rolls. Every shop in the Caribbean will take it off your hands.",
    availableAt: "shop",
    isBarterGoods: true,
  },
  rum: {
    buy: 150,
    sell: 105,
    singleUnit: "barrel",
    unit: "barrels",
    description:
      "Dark cane rum, sold in every port. Keep it under lock and key, it is cargo for trading, not for the crew.",
    availableAt: "shop",
    isBarterGoods: true,
  },
  sugar: {
    buy: 25,
    sell: 17,
    singleUnit: "crate",
    unit: "crates",
    description:
      "Sacks of white gold from the island plantations, bound for the sweet tooth of Europe.",
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
    description:
      "Shimmering bolts that started their journey half a world away. Light to carry and dear to buy.",
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
    description:
      "Chests of fragrant leaves that fetch a fine price from homesick governors and merchants.",
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
    description:
      "Soft bales from the colonial fields. Plain to look at, but weavers and sailmakers always want more.",
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
      "Iron guns that settle arguments at sea. Each one needs 2 crew members to load and fire it.",
    availableAt: "shipyard",
  },
  repairKits: {
    buy: 60,
    sell: 40,
    singleUnit: "kit",
    unit: "kits",
    description:
      "Planks, pitch, nails and oakum for patching a hull anywhere, even at sea. Each kit restores up to 10 percentage points of health to one ship, though the shipyard does it cheaper.",
    availableAt: "shipyard",
    isUtility: true,
  },
}

/** Items that can be traded for profit but have no functional purpose. */
export const BARTER_GOODS = Object.keys(MERCHANDISE).filter((k) => {
  const item = MERCHANDISE[k as keyof typeof MERCHANDISE]
  return item.availableAt === "shop" && item.isBarterGoods
})

export const isTradeGoodAvailableInTown = (
  item: keyof Inventory,
  town: Town | undefined
): boolean => {
  const towns = MERCHANDISE[item]?.towns

  if (!towns) return true // not town-restricted
  if (!town) return false // restricted but no town context — deny

  return towns.includes(town)
}
