import { TOWNS } from "@/constants/locations"
import { getRouteLength, getSeaRoute, type Point } from "@/utils/seaRoutes"

import { TOWN_ANCHOR_SIZE, TOWN_ICON_SIZE } from "./constants"

// The square the town icon covers, standing on the town's location
const getTownIcon = (town: Town) => {
  const { x, y } = TOWNS[town].map
  const half = TOWN_ICON_SIZE / 2

  return {
    centre: { x: x + TOWN_ANCHOR_SIZE / 2, y: y + TOWN_ANCHOR_SIZE / 2 - half },
    half,
  }
}

const isOnTownIcon = (town: Town, { x, y }: Point) => {
  const { centre, half } = getTownIcon(town)

  return Math.abs(x - centre.x) <= half && Math.abs(y - centre.y) <= half
}

// Where a line from a point towards the town meets the edge of its icon
export const getTownIconEdge = (town: Town, from: Point): Point => {
  const { centre, half } = getTownIcon(town)
  const dx = from.x - centre.x
  const dy = from.y - centre.y
  const scale = half / Math.max(Math.abs(dx), Math.abs(dy), half)

  return { x: centre.x + dx * scale, y: centre.y + dy * scale }
}

// Ends the route where it first touches the town icon, or carries it on to the
// icon when the harbour is beside it
const endAtTownIcon = (route: Point[], town: Town) => {
  const i = route.findIndex((point) => isOnTownIcon(town, point))

  if (i === -1) {
    return [...route, getTownIconEdge(town, route[route.length - 1])]
  }

  if (i === 0) {
    return [getTownIconEdge(town, route[0])]
  }

  // Narrow down where the segment crosses into the icon
  let outside = route[i - 1]
  let inside = route[i]

  for (let step = 0; step < 12; step++) {
    const middle = {
      x: (outside.x + inside.x) / 2,
      y: (outside.y + inside.y) / 2,
    }

    if (isOnTownIcon(town, middle)) {
      inside = middle
    } else {
      outside = middle
    }
  }

  return [...route.slice(0, i), outside]
}

// Starts the route where it last leaves the town icon
export const startAtTownIcon = (route: Point[], town: Town) =>
  endAtTownIcon([...route].reverse(), town).reverse()

// Cuts the route off at the town icon, but only once it has reached it, so a
// route still on its way isn't carried on to the town
export const stopAtTownIcon = (route: Point[], town: Town) =>
  route.some((point) => isOnTownIcon(town, point))
    ? endAtTownIcon(route, town)
    : route

export const getTownIconCentre = (town: Town) => getTownIcon(town).centre

// The sea route runs between the harbours, the drawn line runs between the
// town icons so it is clear which towns it joins
export const getDrawnRoute = (from: Town, to: Town) => {
  const route = getSeaRoute(from, to)

  if (!route) {
    return null
  }

  return endAtTownIcon(startAtTownIcon(route, from), to)
}

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
