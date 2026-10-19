import { describe, expect, it } from "vitest"

import { TOWNS } from "@/constants/locations"
import {
  getLocationAmbience,
  getLocationBackground,
  getRandomTown,
  getTownsNationality,
} from "@/utils/location"

describe("location utils", () => {
  it("getTownsNationality returns nation for known town and undefined for falsy", () => {
    expect(getTownsNationality("Charles Towne" as any)).toBe("England")
    expect(getTownsNationality(undefined)).toBeUndefined()
  })

  it("getRandomTown returns a town that belongs to the requested nation", () => {
    const town = getRandomTown("England")
    expect(TOWNS[town].nation).toBe("England")
  })

  it("getLocationBackground returns town image for non-sea locations", () => {
    const path = getLocationBackground("Charles Towne" as any, "Shop" as any)
    expect(path).toBe("/img/location/charles-towne/shop.png")
  })

  it("getLocationAmbience returns the mask paths for a building", () => {
    expect(getLocationAmbience("St. Martin", "City hall")).toEqual({
      sky: "/img/location-sky-masks/st.-martin/city-hall.png",
      water: "/img/location-water-masks/st.-martin/city-hall.png",
      light: "/img/location-light-masks/st.-martin/city-hall.png",
    })
  })

  it("getLocationAmbience returns undefined without a town", () => {
    expect(getLocationAmbience(undefined, "Shop")).toBeUndefined()
  })
})
