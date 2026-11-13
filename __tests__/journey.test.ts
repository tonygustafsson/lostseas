import { describe, expect, it } from "vitest"

import { TOWNS } from "@/constants/locations"
import {
  getDistanceKm,
  getJourneyLength,
  getLongestJourneyLength,
  getShortestJourneyLength,
} from "@/utils/journey"
import { getSeaRoute } from "@/utils/seaRoutes"

const towns = Object.keys(TOWNS) as Town[]

const pairs = towns.flatMap((from, index) =>
  towns.slice(index + 1).map((to) => [from, to] as const)
)

describe("sea distances", () => {
  it("has a drawn sea route between every pair of towns", () => {
    pairs.forEach(([from, to]) => {
      expect(getSeaRoute(from, to)).not.toBeNull()
    })
  })

  it("is the same in both directions", () => {
    pairs.forEach(([from, to]) => {
      expect(getDistanceKm(from, to)).toBe(getDistanceKm(to, from))
      expect(getJourneyLength(from, to)).toBe(getJourneyLength(to, from))
    })
  })

  it("takes between 1 and 20 days", () => {
    pairs.forEach(([from, to]) => {
      expect(getDistanceKm(from, to)).toBeGreaterThan(0)
      expect(getJourneyLength(from, to)).toBeGreaterThanOrEqual(1)
      expect(getJourneyLength(from, to)).toBeLessThanOrEqual(20)
    })
  })

  it("follows the map", () => {
    expect(getJourneyLength("Bonaire", "Curacao")).toBe(2)
    expect(getJourneyLength("Havana", "Port Royale")).toBe(7)
    expect(getJourneyLength("Villa Hermosa", "Barbados")).toBe(20)

    // Tortuga is drawn further east than Leogane
    expect(getDistanceKm("Villa Hermosa", "Tortuga")).toBeGreaterThan(
      getDistanceKm("Villa Hermosa", "Leogane")
    )
  })

  // Regenerating the sea routes can move voyages by a day. Check the changes
  // and update the snapshot with `npx vitest -u` when they are intended.
  it("keeps the same voyage lengths", () => {
    const days = Object.fromEntries(
      pairs.map(([from, to]) => [`${from} - ${to}`, getJourneyLength(from, to)])
    )

    expect(days).toMatchSnapshot()
  })

  it("is zero to the town you are in", () => {
    expect(getDistanceKm("Havana", "Havana")).toBe(0)
  })

  it("finds the nearest and farthest towns", () => {
    expect(getShortestJourneyLength("Bonaire")).toBe(2)
    expect(getLongestJourneyLength("Barbados")).toBe(20)
  })
})
