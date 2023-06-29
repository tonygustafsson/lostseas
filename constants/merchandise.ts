export const MERCHANDISE: Record<
  keyof Inventory,
  {
    buy: number
    sell: number
    singleUnit: string
    unit: string
    description: string
    availableAt: "shop" | "shipyard"
  }
> = {
  food: {
    buy: 16,
    sell: 11,
    singleUnit: "crate",
    unit: "crates",
    description: "You need food to travel the open seas.",
    availableAt: "shop",
  },
  water: {
    buy: 12,
    sell: 8,
    singleUnit: "barrel",
    unit: "barrels",
    description: "You need water to travel the open seas.",
    availableAt: "shop",
  },
  porcelain: {
    buy: 35,
    sell: 24,
    singleUnit: "crate",
    unit: "crates",
    description: "A great trading asset. Not used for anything specific.",
    availableAt: "shop",
  },
  spices: {
    buy: 20,
    sell: 14,
    singleUnit: "crate",
    unit: "crates",
    description: "A great trading asset. Not used for anything specific.",
    availableAt: "shop",
  },
  medicine: {
    buy: 15,
    sell: 10,
    singleUnit: "box",
    unit: "boxes",
    description:
      "You can heal your crew with this mix of willow bark and herbs.",
    availableAt: "shop",
  },
  tobacco: {
    buy: 75,
    sell: 52,
    singleUnit: "crate",
    unit: "crates",
    description: "A great trading asset and can also make your crew happy.",
    availableAt: "shop",
  },
  rum: {
    buy: 150,
    sell: 105,
    singleUnit: "barrel",
    unit: "barrels",
    description: "A great trading asset and can also make your crew happy.",
    availableAt: "shop",
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
}
