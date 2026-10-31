import { describe, expect, it } from "vitest"

import { TOWNS } from "@/constants/locations"
import {
  getLocationAmbience,
  getLocationAmbienceSounds,
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

  it("getLocationAmbienceSounds returns all harbor sounds in the harbor", () => {
    expect(getLocationAmbienceSounds("Harbor")).toEqual([
      "ambience/harbor/harbor1.opus",
      "ambience/harbor/harbor2.opus",
      "ambience/harbor/harbor3.opus",
      "ambience/harbor/harbor4.opus",
      "ambience/harbor/harbor5.opus",
      "ambience/harbor/harbor6.opus",
    ])
  })

  it("getLocationAmbienceSounds returns all market sounds in the market", () => {
    expect(getLocationAmbienceSounds("Market")).toEqual([
      "ambience/market/market1.opus",
      "ambience/market/market2.opus",
      "ambience/market/market3.opus",
    ])
  })

  it("getLocationAmbienceSounds returns all tavern sounds in the tavern", () => {
    expect(getLocationAmbienceSounds("Tavern")).toEqual([
      "ambience/tavern/tavern1.opus",
      "ambience/tavern/tavern2.opus",
      "ambience/tavern/tavern3.opus",
      "ambience/tavern/tavern4.opus",
    ])
  })

  it("getLocationAmbienceSounds returns all shipyard sounds in the shipyard", () => {
    expect(getLocationAmbienceSounds("Shipyard")).toEqual([
      "ambience/shipyard/shipyard1.opus",
      "ambience/shipyard/shipyard2.opus",
      "ambience/shipyard/shipyard3.opus",
    ])
  })

  it("getLocationAmbienceSounds returns all sea sounds at sea", () => {
    expect(getLocationAmbienceSounds("Sea")).toEqual(
      Array.from({ length: 9 }, (_, i) => `ambience/sea/sea${i + 1}.opus`)
    )
  })

  it("getLocationAmbienceSounds returns undefined for locations without a sound", () => {
    expect(getLocationAmbienceSounds("Shop")).toBeUndefined()
    expect(getLocationAmbienceSounds(undefined)).toBeUndefined()
  })
})
