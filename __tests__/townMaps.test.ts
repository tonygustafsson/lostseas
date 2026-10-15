import { existsSync } from "fs"
import { join } from "path"
import { describe, expect, it } from "vitest"

import { TOWNS } from "@/constants/locations"
import { getBuilding, getTownMap } from "@/constants/townMaps"

const TOWN_LOCATIONS: TownLocation[] = [
  "Shop",
  "Tavern",
  "Bank",
  "City hall",
  "Market",
  "Shipyard",
]

const towns = Object.keys(TOWNS) as Town[]

const allImages = towns.flatMap((town) => {
  const { desktop, mobile } = getTownMap(town)!

  return [desktop, mobile]
})

describe("town maps", () => {
  it("returns nothing without a town", () => {
    expect(getTownMap(undefined)).toBeUndefined()
  })

  it.each(allImages)("$src exists", ({ src }) => {
    expect(existsSync(join(process.cwd(), "public", src))).toBe(true)
  })

  it.each(allImages)("$src has every building once", ({ buildings }) => {
    const locations = buildings.map(({ location }) => location)

    expect(locations).toHaveLength(TOWN_LOCATIONS.length)
    expect(new Set(locations)).toEqual(new Set(TOWN_LOCATIONS))
  })

  it.each(allImages)("$src has buildings within the image", ({ buildings }) => {
    buildings.forEach(({ x, y, size }) => {
      expect(x).toBeGreaterThanOrEqual(0)
      expect(x).toBeLessThanOrEqual(100)
      expect(y).toBeGreaterThanOrEqual(0)
      expect(y).toBeLessThanOrEqual(100)
      expect(size).toBeGreaterThan(0)
    })
  })
})

describe("building names", () => {
  it.each(towns)("%s has a name and description for everything", (town) => {
    expect(TOWNS[town].harborDescription).toBeTruthy()

    TOWN_LOCATIONS.forEach((location) => {
      expect(getBuilding(town, location)?.name).toBeTruthy()
      expect(getBuilding(town, location)?.description).toBeTruthy()
    })
  })

  it("returns the town specific name", () => {
    expect(getBuilding("Leogane", "Tavern")?.name).toBe("Blue Heron Tavern")
  })

  it("returns nothing for places without a building", () => {
    expect(getBuilding("Leogane", "Harbor")).toBeUndefined()
    expect(getBuilding(undefined, "Tavern")).toBeUndefined()
  })
})
