import { describe, expect, it } from "vitest"

import { getDustSources } from "@/components/game-ui/LocationScene/lightMask"
import { TOWNS } from "@/constants/locations"
import {
  getLocationBackground,
  getLocationFires,
  getRandomTown,
  getTownsNationality,
  loadLocationAreas,
} from "@/utils/location"

const BUILDINGS = [
  "Bank",
  "City hall",
  "Market",
  "Shipyard",
  "Shop",
  "Tavern",
] as TownLocation[]

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

  it("getLocationFires is empty without a town or fires", () => {
    expect(getLocationFires(undefined, "Shop")).toEqual([])
    expect(getLocationFires("not-a-town" as any, "Shop")).toEqual([])
  })

  it("loadLocationAreas is undefined without a town or polygons", async () => {
    expect(await loadLocationAreas(undefined, "Shop")).toBeUndefined()
    expect(await loadLocationAreas("not-a-town" as any, "Shop")).toBeUndefined()
  })

  it("every building has sky and water polygons inside the building picture", async () => {
    for (const town of Object.keys(TOWNS) as Town[]) {
      for (const location of BUILDINGS) {
        const areas = await loadLocationAreas(town, location)

        expect(areas, `${town} ${location}`).toBeDefined()

        for (const polygon of [...areas!.sky, ...areas!.water]) {
          // At least three corners, as x and y pairs
          expect(polygon.length).toBeGreaterThanOrEqual(6)
          expect(polygon.length % 2).toBe(0)

          polygon.forEach((value: number, i: number) => {
            expect(value).toBeGreaterThanOrEqual(0)
            expect(value).toBeLessThanOrEqual(i % 2 ? 980 : 1605)
          })
        }
      }
    }
  })

  it("getDustSources takes the openings, not the specks of sky between leaves", async () => {
    const areas = (await loadLocationAreas("kingston", "Tavern"))!
    const sources = getDustSources(areas)

    expect(sources.length).toBeGreaterThan(0)
    expect(sources.length).toBeLessThanOrEqual(
      areas.sky.length + areas.water.length
    )
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
