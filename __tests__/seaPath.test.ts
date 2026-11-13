import { describe, expect, it } from "vitest"

import { TOWN_ANCHOR_SIZE, TOWN_ICON_SIZE } from "@/components/Map/constants"
import {
  getDrawnRoute,
  getTownIconCentre,
  splitRoute,
  stopAtTownIcon,
} from "@/components/Map/seaRoutes"
import { TOWNS } from "@/constants/locations"
import {
  buildWaterGrid,
  computeSeaRoute,
  isPathOnWater,
} from "@/scripts/generate-sea-routes/seaPath"
import { getRouteLength, getSeaRoute } from "@/utils/seaRoutes"

// 30x20 mask with a land wall at x 12-17, open only at the bottom rows
const createMask = () => {
  const width = 30
  const height = 20
  const pixels = new Uint8Array(width * height * 4).fill(255)

  for (let y = 0; y < 16; y++) {
    for (let x = 12; x < 18; x++) pixels[(y * width + x) * 4] = 0
  }

  return { width, height, pixels }
}

describe("seaPath", () => {
  const { width, height, pixels } = createMask()
  const raw = buildWaterGrid(pixels, width, height, 1)

  it("marks dark pixels as land", () => {
    expect(raw.water[5 * width + 14]).toBe(0)
    expect(raw.water[5 * width + 2]).toBe(1)
  })

  it("finds a route around land", () => {
    const route = computeSeaRoute(
      { safe: raw, raw },
      { x: 2, y: 2 },
      { x: 27, y: 2 }
    )

    expect(route).not.toBeNull()
    expect(isPathOnWater(raw, route!)).toBe(true)
    expect(Math.max(...route!.map((p) => p.y))).toBeGreaterThan(16)
  })

  it("snaps start and end points on land to water", () => {
    const route = computeSeaRoute(
      { safe: raw, raw },
      { x: 13, y: 2 },
      { x: 16, y: 2 }
    )

    expect(route).not.toBeNull()
    expect(isPathOnWater(raw, route!)).toBe(true)
  })

  it("splits a route by travelled distance", () => {
    const route = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 10 },
    ]

    expect(splitRoute(route, 0.25).position).toEqual({ x: 5, y: 0 })
    expect(splitRoute(route, 0.75).position).toEqual({ x: 10, y: 5 })
    expect(splitRoute(route, 0.75).heading).toEqual({ x: 0, y: 10 })
    expect(splitRoute(route, 1).position).toEqual({ x: 10, y: 10 })
  })

  it("splits a route using a precomputed length", () => {
    const route = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 10 },
    ]

    expect(getRouteLength(route)).toBe(20)
    expect(splitRoute(route, 0.75, getRouteLength(route))).toEqual(
      splitRoute(route, 0.75)
    )
  })
})

describe("seaRoutes", () => {
  const towns = Object.keys(TOWNS) as Town[]

  it("has a precalculated route between every pair of towns", () => {
    for (const from of towns) {
      for (const to of towns) {
        if (from !== to) {
          expect(getSeaRoute(from, to)).not.toBeNull()
        }
      }
    }
  })

  it("draws every route from the edge of one town icon to the other", () => {
    const half = TOWN_ICON_SIZE / 2
    // How far a point is outside the icon, 0 on its edge
    const distanceOutside = (town: Town, point: { x: number; y: number }) => {
      const { x, y } = TOWNS[town].map
      const centreX = x + TOWN_ANCHOR_SIZE / 2
      const centreY = y + TOWN_ANCHOR_SIZE / 2 - half

      return Math.max(
        Math.abs(point.x - centreX) - half,
        Math.abs(point.y - centreY) - half
      )
    }

    for (const from of towns) {
      for (const to of towns) {
        if (from === to) {
          continue
        }

        const route = getDrawnRoute(from, to)!

        expect(Math.abs(distanceOutside(from, route[0]))).toBeLessThan(0.1)
        expect(Math.abs(distanceOutside(to, route.at(-1)!))).toBeLessThan(0.1)

        for (const point of route.slice(1, -1)) {
          expect(distanceOutside(to, point)).toBeGreaterThan(0)
        }
      }
    }
  })

  it("stops a travelled route at the town icon only once it reaches it", () => {
    const town = towns[0]
    const centre = getTownIconCentre(town)
    const away = { x: centre.x + 40, y: centre.y }
    const nearby = { x: centre.x + 20, y: centre.y }
    const beyond = { x: centre.x - 20, y: centre.y }

    expect(stopAtTownIcon([away, nearby], town)).toEqual([away, nearby])

    const arrived = stopAtTownIcon([away, centre, beyond], town)

    expect(arrived.at(-1)!.x).toBeCloseTo(centre.x + TOWN_ICON_SIZE / 2, 1)
    expect(arrived).toHaveLength(2)
  })

  it("returns reversed routes for the opposite direction", () => {
    const forward = getSeaRoute(towns[0], towns[1])!
    const backward = getSeaRoute(towns[1], towns[0])!

    expect(backward).toEqual([...forward].reverse())
  })
})
