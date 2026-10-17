import {
  BARTER_GOODS,
  isTradeGoodAvailableInTown,
  MERCHANDISE,
} from "@/constants/merchandise"

/**
 * Food and water the crew uses each day at sea: 1 crate of food per 10 crew
 * and 1 barrel of water per 5 crew, rounded to whole units. Any crew uses at
 * least 1 of each per day. No crew uses nothing.
 */
export const getDailyConsumption = (crewMembers: CrewMembers["count"]) => {
  if (crewMembers <= 0) {
    return { food: 0, water: 0 }
  }

  return {
    food: Math.max(1, Math.round(crewMembers / 10)),
    water: Math.max(1, Math.round(crewMembers / 5)),
  }
}

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
  const daily = getDailyConsumption(crewMembers)
  const foodConsumption = daily.food * days
  const waterConsumption = daily.water * days

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
  const daily = getDailyConsumption(crewMembers)

  // Without crew, supplies last forever
  const foodDays = daily.food ? Math.floor(currentFood / daily.food) : Infinity
  const waterDays = daily.water
    ? Math.floor(currentWater / daily.water)
    : Infinity

  return Math.min(foodDays, waterDays)
}

export const getBarterGoodsValue = (player: {
  inventory?: Inventory
  character: Pick<Character, "town">
}) => {
  const {
    inventory,
    character: { town },
  } = player
  let value = 0

  Object.entries(inventory || {}).forEach(([item, quantity]) => {
    if (!BARTER_GOODS.includes(item)) {
      return
    }

    if (town && !isTradeGoodAvailableInTown(item as keyof Inventory, town)) {
      return
    }

    value += MERCHANDISE[item as keyof typeof MERCHANDISE].sell * quantity
  })

  return value
}
