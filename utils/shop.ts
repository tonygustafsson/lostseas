import { MERCHANDISE } from "@/constants/merchandise"

const BARTER_GOODS = ["porcelain", "spices", "tobacco", "rum"]

export const getNecessitiesInfo = ({
  crewMembers,
  currentFood = 0,
  currentWater = 0,
  days = 1,
}: {
  crewMembers: CrewMembers["count"]
  currentFood?: Inventory["food"]
  currentWater?: Inventory["water"]
  days?: number
}) => {
  const foodConsumption = Math.ceil(crewMembers * 0.1 * days)
  const waterConsumption = Math.ceil(crewMembers * 0.2 * days)

  const foodNeeded =
    foodConsumption - currentFood > 0 ? foodConsumption - currentFood : 0
  const waterNeeded =
    waterConsumption - currentWater > 0 ? waterConsumption - currentWater : 0

  const foodCost = MERCHANDISE.food.buy * foodNeeded
  const waterCost = MERCHANDISE.water.buy * waterNeeded

  return {
    foodNeeded,
    waterNeeded,
    cost: foodCost + waterCost,
  }
}

export const getDaysWorthOfNecessities = ({
  crewMembers,
  currentFood = 0,
  currentWater = 0,
}: {
  crewMembers: CrewMembers["count"]
  currentFood?: Inventory["food"]
  currentWater?: Inventory["water"]
}) => {
  const foodConsumption = crewMembers * 0.1
  const waterConsumption = crewMembers * 0.2

  const foodDays = Math.floor(currentFood / foodConsumption)
  const waterDays = Math.floor(currentWater / waterConsumption)

  return Math.min(foodDays, waterDays)
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
