export const MERCHANDISE: Record<
  keyof Inventory,
  {
    buy: number
    sell: number
    singleUnit: string
    unit: string
    description: string
  }
> = {
  food: {
    buy: 16,
    sell: 11,
    singleUnit: "crate",
    unit: "crates",
    description: "You need food to travel the open seas.",
  },
  water: {
    buy: 12,
    sell: 8,
    singleUnit: "barrel",
    unit: "barrels",
    description: "You need water to travel the open seas.",
  },
  porcelain: {
    buy: 35,
    sell: 24,
    singleUnit: "crate",
    unit: "crates",
    description: "A great trading asset. Not used for anything specific.",
  },
  spices: {
    buy: 20,
    sell: 14,
    singleUnit: "crate",
    unit: "crates",
    description: "A great trading asset. Not used for anything specific.",
  },
  medicine: {
    buy: 15,
    sell: 10,
    singleUnit: "box",
    unit: "boxes",
    description:
      "You can heal your crew with this mix of willow bark and herbs.",
  },
  tobacco: {
    buy: 75,
    sell: 52,
    singleUnit: "crate",
    unit: "crates",
    description: "A great trading asset and can also make your crew happy.",
  },
  rum: {
    buy: 150,
    sell: 105,
    singleUnit: "barrel",
    unit: "barrels",
    description: "A great trading asset and can also make your crew happy.",
  },
}
