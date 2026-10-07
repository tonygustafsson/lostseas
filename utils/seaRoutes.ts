import { TOWNS } from "@/constants/locations"
import SEA_ROUTES from "@/constants/seaRoutes.json"

import type { Point } from "./seaPath"

const routes = SEA_ROUTES as Record<string, number[]>

const toPoints = (flat: number[]) =>
  Array.from({ length: flat.length / 2 }, (_, i) => ({
    x: flat[i * 2],
    y: flat[i * 2 + 1],
  }))

export const getSeaRoute = (from: Town, to: Town): Point[] | null => {
  const forward = routes[`${from}|${to}`]
  if (forward) return toPoints(forward)

  const backward = routes[`${to}|${from}`]
  if (backward) return toPoints(backward).reverse()

  return null
}

// Older journeys did not store their origin, so guess it from the distance
export const getJourneyOrigin = (journey: Journey) =>
  journey.origin ??
  (Object.keys(TOWNS) as Town[]).find(
    (town) =>
      town !== journey.destination &&
      TOWNS[town].map.distanceTo[journey.destination] === journey.totalDays
  )
