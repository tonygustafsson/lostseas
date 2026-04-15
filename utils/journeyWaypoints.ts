/**
 * Waypoint calculation for ship journeys.
 * Uses pre-computed static routes (see constants/routes.ts) and distributes
 * waypoints evenly along the path — zero runtime A* computation.
 */

import { TOWNS } from "@/constants/locations"
import { ROUTES } from "@/constants/routes"

export type Waypoint = {
  x: number
  y: number
  day: number
}

export type DayPath = { x: number; y: number }[]

function getCachedPath(
  origin: Town,
  destination: Town
): { x: number; y: number }[] {
  const key = `${origin}->${destination}`
  const route = ROUTES[key]
  if (route && route.length > 0) {
    return route.map(([x, y]) => ({ x, y }))
  }
  // Fallback (should not happen if generate:routes was run)
  const startPos = TOWNS[origin].map
  const endPos = TOWNS[destination].map
  return [
    { x: startPos.x, y: startPos.y },
    { x: endPos.x, y: endPos.y },
  ]
}

/** Interpolate a point at `targetDist` along a path with cumulative distances. */
function interpolateAlongPath(
  path: { x: number; y: number }[],
  cumDist: number[],
  targetDist: number
): { x: number; y: number } {
  let segIdx = path.length - 2
  for (let i = 1; i < cumDist.length; i++) {
    if (cumDist[i] >= targetDist) {
      segIdx = i - 1
      break
    }
  }
  const segLen = cumDist[segIdx + 1] - cumDist[segIdx]
  const t = segLen === 0 ? 0 : (targetDist - cumDist[segIdx]) / segLen
  const s = path[segIdx]
  const e = path[segIdx + 1]
  return { x: s.x + (e.x - s.x) * t, y: s.y + (e.y - s.y) * t }
}

function buildCumDist(path: { x: number; y: number }[]): number[] {
  const cumDist: number[] = [0]
  for (let i = 1; i < path.length; i++) {
    const dx = path[i].x - path[i - 1].x
    const dy = path[i].y - path[i - 1].y
    cumDist.push(cumDist[i - 1] + Math.sqrt(dx * dx + dy * dy))
  }
  return cumDist
}

/**
 * Returns the full A* water path between two towns as pixel coordinates.
 * Useful for drawing the route on the map.
 */
export function getJourneyPath(
  origin: Town,
  destination: Town
): { x: number; y: number }[] {
  return getCachedPath(origin, destination)
}

export function calculateWaypoints(
  origin: Town,
  destination: Town,
  totalDays: number
): Waypoint[] {
  const path = getCachedPath(origin, destination)

  if (path.length < 2) {
    const startPos = TOWNS[origin].map
    return [{ x: startPos.x, y: startPos.y, day: 1 }]
  }

  const cumDist = buildCumDist(path)
  const totalDist = cumDist[cumDist.length - 1]

  return Array.from({ length: totalDays }, (_, i) => {
    const day = i + 1
    const pt = interpolateAlongPath(
      path,
      cumDist,
      (day / totalDays) * totalDist
    )
    return { ...pt, day }
  })
}

/**
 * Calculate per-day sub-paths along the A* route.
 * Each entry contains all A* path nodes for that day's segment so Framer
 * Motion keyframes follow the water-safe path exactly (no straight-line cuts).
 */
export function calculateDayPaths(
  origin: Town,
  destination: Town,
  totalDays: number
): DayPath[] {
  const path = getCachedPath(origin, destination)

  if (path.length < 2) {
    const startPos = TOWNS[origin].map
    const endPos = TOWNS[destination].map
    const fallback = [
      { x: startPos.x, y: startPos.y },
      { x: endPos.x, y: endPos.y },
    ]
    return Array.from({ length: totalDays }, () => [...fallback])
  }

  const cumDist = buildCumDist(path)
  const totalDist = cumDist[cumDist.length - 1]

  return Array.from({ length: totalDays }, (_, i) => {
    const day = i + 1
    const startDist = ((day - 1) / totalDays) * totalDist
    const endDist = (day / totalDays) * totalDist

    const subPath: DayPath = []

    subPath.push(interpolateAlongPath(path, cumDist, startDist))

    for (let j = 0; j < path.length; j++) {
      if (cumDist[j] > startDist && cumDist[j] < endDist) {
        subPath.push(path[j])
      }
    }

    subPath.push(interpolateAlongPath(path, cumDist, endDist))

    return subPath
  })
}
