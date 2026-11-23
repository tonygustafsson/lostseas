import { describe, expect, it } from "vitest"

import { TOWNS } from "@/constants/locations"
import {
  getLocationAmbience,
  getLocationBackground,
  getLocationFires,
  getRandomTown,
  getTownsNationality,
} from "@/utils/location"

describe("location utils", () => {
  it("getTownsNationality returns nation for known town and undefined for falsy", () => {
    expect(getTownsNationality("st-georges" as any)).toBe("England")
    expect(getTownsNationality(undefined)).toBeUndefined()
  })

  it("getRandomTown returns a town that belongs to the requested nation", () => {
    const town = getRandomTown("England")
    expect(TOWNS[town].nation).toBe("England")
  })

  it("getLocationBackground returns town image for non-sea locations", () => {
    const path = getLocationBackground("st-georges" as any, "Shop" as any)
    expect(path).toBe("/img/location/st-georges/shop.png")
  })

  it("getLocationAmbience returns the mask paths for a building", () => {
    expect(getLocationAmbience("simpson-bay", "City hall")).toEqual({
      sky: "/img/location-sky-masks/simpson-bay/city-hall.png",
      water: "/img/location-water-masks/simpson-bay/city-hall.png",
      light: "/img/location-light-masks/simpson-bay/city-hall.png",
    })
  })

  it("getLocationAmbience returns undefined without a town", () => {
    expect(getLocationAmbience(undefined, "Shop")).toBeUndefined()
  })

  it("getLocationFires is empty without a town or fires, so the light picture is used", () => {
    expect(getLocationFires(undefined, "Shop")).toEqual([])
    expect(getLocationFires("not-a-town" as any, "Shop")).toEqual([])
  })

  it("getLocationFires gives circles inside the building picture", () => {
    const fires = getLocationFires("kingston", "Tavern")

    expect(fires.length).toBeGreaterThan(0)

    for (const [x, y, radius] of fires) {
      expect(x).toBeGreaterThanOrEqual(0)
      expect(x).toBeLessThanOrEqual(1605)
      expect(y).toBeGreaterThanOrEqual(0)
      expect(y).toBeLessThanOrEqual(980)
      expect(radius).toBeGreaterThan(0)
    }
  })
})
