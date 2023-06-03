export const prices: Record<keyof Inventory, { buy: number; sell: number }> = {
  food: {
    buy: 16,
    sell: 11,
  },
  water: {
    buy: 12,
    sell: 8,
  },
  porcelain: {
    buy: 35,
    sell: 24,
  },
  spices: {
    buy: 20,
    sell: 14,
  },
  silk: {
    buy: 45,
    sell: 31,
  },
  tobacco: {
    buy: 75,
    sell: 52,
  },
  rum: {
    buy: 150,
    sell: 105,
  },
}
