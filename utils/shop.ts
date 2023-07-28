import { MERCHANDISE } from "@/constants/merchandise"

const BARTER_GOODS = ["porcelain", "spices", "tobacco", "rum"]

export const getNecessitiesInfo = (
  crewMembers: CrewMembers["count"],
  days = 1
) => {
  const foodConsumption = Math.ceil(crewMembers * 0.1 * days)
  const waterConsumption = Math.ceil(crewMembers * 0.2 * days)

  const foodCost = MERCHANDISE.food.buy * foodConsumption
  const waterCost = MERCHANDISE.water.buy * waterConsumption

  return {
    foodConsumption,
    waterConsumption,
    cost: foodCost + waterCost,
  }
}

export const getBarterGoodsValue = (inventory: Inventory | undefined) => {
  let value = 0

  Object.entries(inventory || {}).forEach(([item, quantity]) => {
    if (!BARTER_GOODS.includes(item)) {
      return
    }

    value += MERCHANDISE[item as keyof typeof MERCHANDISE].sell * quantity
  })

  return value
}
