import { KM_PER_DAY, KM_PER_PIXEL, TOWNS } from "@/constants/locations"
import { getRouteLength, getSeaRoute } from "@/utils/seaRoutes"
import { getDaysOfSupply, getSuppliesNeeded } from "@/utils/shop"

const TOWN_NAMES = Object.keys(TOWNS) as Town[]

// Each route is measured the first time it's asked for, the map and advisor
// look distances up on every render. Both directions share one entry.
const distancesKm = new Map<string, number>()

/** Sailing distance in kilometres along the route drawn on the map. */
export const getDistanceKm = (from: Town, to: Town) => {
  if (from === to) {
    return 0
  }

  const key = [from, to].sort().join("|")
  const cached = distancesKm.get(key)

  if (cached !== undefined) {
    return cached
  }

  const route = getSeaRoute(from, to)

  if (!route) {
    throw new Error(
      `No sea route from ${from} to ${to}. Run npm run generate:sea-routes.`
    )
  }

  const km = Math.round((getRouteLength(route) * KM_PER_PIXEL) / 10) * 10
  distancesKm.set(key, km)

  return km
}

/** Days at sea between two towns. Every voyage takes at least one day. */
export const getJourneyLength = (from: Town, to: Town) =>
  Math.max(1, Math.round(getDistanceKm(from, to) / KM_PER_DAY))

const getJourneyLengthsFrom = (from: Town) =>
  TOWN_NAMES.filter((town) => town !== from).map((town) =>
    getJourneyLength(from, town)
  )

/** Days at sea to the nearest town, the least a departure needs supplies for. */
export const getShortestJourneyLength = (from: Town) =>
  Math.min(...getJourneyLengthsFrom(from))

/** Days at sea to the farthest town. */
export const getLongestJourneyLength = (from: Town) =>
  Math.max(...getJourneyLengthsFrom(from))

/** How many days the food and water lasts, and which runs out first. */
export const getSuppliesDays = (player: Player) => {
  const crew = player.crewMembers.count
  const food = getDaysOfSupply("food", player.inventory?.food || 0, crew)
  const water = getDaysOfSupply("water", player.inventory?.water || 0, crew)

  return {
    days: Math.min(food, water),
    limitedBy: food <= water ? ("food" as const) : ("water" as const),
  }
}

/** Food and water the crew needs for a journey, and whether the player has it. */
export const getJourneySupplies = (player: Player, days: number) => {
  const { food, water } = getSuppliesNeeded(player.crewMembers.count, days)

  return {
    food,
    water,
    hasEnoughFood: (player.inventory?.food || 0) >= food,
    hasEnoughWater: (player.inventory?.water || 0) >= water,
  }
}
