import { TOWNS } from "@/constants/locations"
import { getDailyConsumption } from "@/utils/shop"

/** Days assumed for supplies when the distance is unknown, like at sea. */
const UNKNOWN_JOURNEY_LENGTH = 5

/** Days at sea between two towns. */
export const getJourneyLength = (from: Town | undefined, to: Town) =>
  (from && TOWNS[from].map.distanceTo[to]) || UNKNOWN_JOURNEY_LENGTH

/** Days at sea to the nearest town, the least a departure needs supplies for. */
export const getShortestJourneyLength = (from: Town | undefined) => {
  if (!from) return UNKNOWN_JOURNEY_LENGTH

  const distances = Object.values(TOWNS[from].map.distanceTo).filter(Boolean)

  return Math.min(...distances)
}

/** Days at sea to the farthest town. */
export const getLongestJourneyLength = (from: Town | undefined) => {
  if (!from) return UNKNOWN_JOURNEY_LENGTH

  return Math.max(...Object.values(TOWNS[from].map.distanceTo))
}

/** How many days the food and water lasts, and which runs out first. */
export const getSuppliesDays = (player: Player) => {
  const daily = getDailyConsumption(player.crewMembers.count)

  // Without crew, supplies last forever
  const daysOf = (amount = 0, perDay: number) =>
    perDay ? Math.floor(amount / perDay) : Infinity

  const food = daysOf(player.inventory?.food, daily.food)
  const water = daysOf(player.inventory?.water, daily.water)

  return {
    days: Math.min(food, water),
    limitedBy: food <= water ? ("food" as const) : ("water" as const),
  }
}

/** Food and water the crew needs for a journey, and whether the player has it. */
export const getJourneySupplies = (player: Player, days: number) => {
  const daily = getDailyConsumption(player.crewMembers.count)
  const food = days * daily.food
  const water = days * daily.water

  return {
    food,
    water,
    hasEnoughFood: (player.inventory?.food || 0) >= food,
    hasEnoughWater: (player.inventory?.water || 0) >= water,
  }
}
