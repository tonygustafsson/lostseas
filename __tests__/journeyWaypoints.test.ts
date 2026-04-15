import { describe, expect, it } from "vitest"

import { TOWNS } from "@/constants/locations"
import { ROUTES } from "@/constants/routes"
import {
  calculateDayPaths,
  calculateWaypoints,
  getJourneyPath,
} from "@/utils/journeyWaypoints"

const ALL_TOWNS = Object.keys(TOWNS) as Town[]

// ─── Static route data validation ────────────────────────────────────────────

describe("ROUTES (constants/routes.ts)", () => {
  it("covers every ordered town pair", () => {
    const missing: string[] = []
    for (const origin of ALL_TOWNS) {
      for (const dest of ALL_TOWNS) {
        if (origin === dest) continue
        const key = `${origin}->${dest}`
        if (!ROUTES[key]) missing.push(key)
      }
    }
    expect(missing, `Missing routes: ${missing.join(", ")}`).toHaveLength(0)
  })

  it("every route has at least 2 points", () => {
    const short = Object.entries(ROUTES)
      .filter(([, path]) => path.length < 2)
      .map(([key]) => key)
    expect(short, `Routes with <2 points: ${short.join(", ")}`).toHaveLength(0)
  })

  it("every point is within map bounds (850×540)", () => {
    const outOfBounds: string[] = []
    for (const [key, path] of Object.entries(ROUTES)) {
      for (const [x, y] of path) {
        if (x < 0 || x > 850 || y < 0 || y > 540) {
          outOfBounds.push(`${key} (${x},${y})`)
        }
      }
    }
    expect(outOfBounds).toHaveLength(0)
  })

  it("reverse route exists for every forward route", () => {
    const missing: string[] = []
    for (const key of Object.keys(ROUTES)) {
      const [origin, dest] = key.split("->")
      const reverseKey = `${dest}->${origin}`
      if (!ROUTES[reverseKey]) missing.push(reverseKey)
    }
    expect(missing).toHaveLength(0)
  })
})

// ─── getJourneyPath ───────────────────────────────────────────────────────────

describe("getJourneyPath", () => {
  it("returns a path from ROUTES for known town pair", () => {
    const path = getJourneyPath("Charles Towne", "Havana")
    expect(path.length).toBeGreaterThanOrEqual(2)
    path.forEach(({ x, y }) => {
      expect(x).toBeGreaterThanOrEqual(0)
      expect(y).toBeGreaterThanOrEqual(0)
    })
  })

  it("start point is near the origin town", () => {
    const path = getJourneyPath("Barbados", "Panama")
    const first = path[0]
    const origin = TOWNS["Barbados"].map
    // First waypoint should be within 20px of the town coords
    expect(Math.abs(first.x - origin.x)).toBeLessThanOrEqual(20)
    expect(Math.abs(first.y - origin.y)).toBeLessThanOrEqual(20)
  })
})

// ─── calculateWaypoints ───────────────────────────────────────────────────────

describe("calculateWaypoints", () => {
  it("returns exactly totalDays waypoints", () => {
    const waypoints = calculateWaypoints("Charles Towne", "Havana", 5)
    expect(waypoints).toHaveLength(5)
  })

  it("waypoints are numbered 1 to totalDays", () => {
    const waypoints = calculateWaypoints("Port Royale", "Tortuga", 3)
    expect(waypoints.map((w) => w.day)).toEqual([1, 2, 3])
  })

  it("last waypoint is near the destination", () => {
    const dest = "Havana"
    const waypoints = calculateWaypoints("Charles Towne", dest, 5)
    const last = waypoints[waypoints.length - 1]
    const destPos = TOWNS[dest].map
    // Should be within ~30px (snapped to water grid)
    expect(Math.abs(last.x - destPos.x)).toBeLessThanOrEqual(30)
    expect(Math.abs(last.y - destPos.y)).toBeLessThanOrEqual(30)
  })

  it("waypoints are ordered along the path (monotonically increasing distance from origin)", () => {
    const waypoints = calculateWaypoints("Biloxi", "Barbados", 7)
    const origin = TOWNS["Biloxi"].map
    const distances = waypoints.map((w) =>
      Math.sqrt((w.x - origin.x) ** 2 + (w.y - origin.y) ** 2)
    )
    // Each waypoint should generally be further from origin than the previous
    // (with small tolerance for curved paths)
    let nonMonotone = 0
    for (let i = 1; i < distances.length; i++) {
      if (distances[i] < distances[i - 1] - 20) nonMonotone++
    }
    expect(nonMonotone).toBeLessThanOrEqual(1)
  })
})

// ─── calculateDayPaths ────────────────────────────────────────────────────────

describe("calculateDayPaths", () => {
  it("returns exactly totalDays entries", () => {
    const dayPaths = calculateDayPaths("Leogane", "San Juan", 4)
    expect(dayPaths).toHaveLength(4)
  })

  it("each day sub-path has at least 2 points", () => {
    const dayPaths = calculateDayPaths("Havana", "Port Royale", 3)
    dayPaths.forEach((path, i) => {
      expect(path.length, `Day ${i + 1} sub-path`).toBeGreaterThanOrEqual(2)
    })
  })

  it("day sub-paths are contiguous (end of day N ≈ start of day N+1)", () => {
    const dayPaths = calculateDayPaths("Charles Towne", "Barbados", 5)
    for (let i = 0; i < dayPaths.length - 1; i++) {
      const endOfDay = dayPaths[i][dayPaths[i].length - 1]
      const startOfNext = dayPaths[i + 1][0]
      const dist = Math.sqrt(
        (endOfDay.x - startOfNext.x) ** 2 + (endOfDay.y - startOfNext.y) ** 2
      )
      expect(dist, `Gap between day ${i + 1} and ${i + 2}`).toBeLessThanOrEqual(
        10
      )
    }
  })

  it("all points within map bounds", () => {
    const dayPaths = calculateDayPaths("Villa Hermosa", "Martinique", 6)
    for (const path of dayPaths) {
      for (const { x, y } of path) {
        expect(x).toBeGreaterThanOrEqual(0)
        expect(x).toBeLessThanOrEqual(850)
        expect(y).toBeGreaterThanOrEqual(0)
        expect(y).toBeLessThanOrEqual(540)
      }
    }
  })
})
