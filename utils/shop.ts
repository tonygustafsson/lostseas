import { MERCHANDISE } from "@/constants/merchandise"

const BARTER_GOODS = ["porcelain", "spices", "tobacco", "rum"]

export const getBarterGoodsValue = (inventory: Inventory | undefined) => {
  let moneyBack = 0

  Object.entries(inventory || {}).forEach(([item, quantity]) => {
    if (!BARTER_GOODS.includes(item)) {
      return
    }

    moneyBack += MERCHANDISE[item as keyof typeof MERCHANDISE].sell * quantity
  })

  return moneyBack
}
