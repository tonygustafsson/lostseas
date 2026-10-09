import { TOWNS } from "@/constants/locations"
import SEA_ROUTES from "@/constants/seaRoutes.json"

export type Point = { x: number; y: number }

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

export const getRouteLength = (route: Point[]) =>
  route.reduce(
    (total, point, i) =>
      i === 0
        ? 0
        : total +
          Math.hypot(point.x - route[i - 1].x, point.y - route[i - 1].y),
    0
  )

// Splits the route at a progress between 0 and 1
export const splitRoute = (
  route: Point[],
  progress: number,
  routeLength = getRouteLength(route)
) => {
  const target = routeLength * Math.min(1, Math.max(0, progress))
  let travelled = 0

  for (let i = 1; i < route.length; i++) {
    const a = route[i - 1]
    const b = route[i]
    const segment = Math.hypot(b.x - a.x, b.y - a.y)

    if (travelled + segment >= target) {
      const t = segment === 0 ? 0 : (target - travelled) / segment
      const position = { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }

      return {
        position,
        heading: { x: b.x - a.x, y: b.y - a.y },
        travelledRoute: [...route.slice(0, i), position],
      }
    }

    travelled += segment
  }

  const last = route[route.length - 1]
  const beforeLast = route[route.length - 2] ?? last

  return {
    position: last,
    heading: { x: last.x - beforeLast.x, y: last.y - beforeLast.y },
    travelledRoute: route,
  }
}
