import { describe, expect, it } from "vitest"

import { TOWNS } from "@/constants/locations"
import { buildWaterGrid, computeSeaRoute, isPathOnWater } from "@/utils/seaPath"
import {
  getJourneyOrigin,
  getRouteLength,
  getSeaRoute,
  splitRoute,
} from "@/utils/seaRoutes"

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
        if (from !== to) expect(getSeaRoute(from, to)).not.toBeNull()
      }
    }
  })

  it("returns reversed routes for the opposite direction", () => {
    const forward = getSeaRoute(towns[0], towns[1])!
    const backward = getSeaRoute(towns[1], towns[0])!

    expect(backward).toEqual([...forward].reverse())
  })

  it("uses the stored origin, or guesses it from the distance", () => {
    expect(
      getJourneyOrigin({
        origin: "Havana",
        destination: "Biloxi",
        day: 1,
        totalDays: 3,
      })
    ).toBe("Havana")

    const destination = towns[0]
    const totalDays = TOWNS[towns[1]].map.distanceTo[destination]
    const origin = getJourneyOrigin({ destination, day: 1, totalDays })

    expect(TOWNS[origin!].map.distanceTo[destination]).toBe(totalDays)
  })
})
