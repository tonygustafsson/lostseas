import { existsSync } from "fs"
import { join } from "path"
import { describe, expect, it } from "vitest"

import { MAP_HEIGHT, MAP_WIDTH } from "@/components/Map/constants"
import { TOWNS } from "@/constants/locations"
import { getNpcImage, NPCS } from "@/constants/npcs"
import { getLocationBackground } from "@/utils/location"

const towns = Object.keys(TOWNS) as Town[]
const nations: Nation[] = ["England", "France", "Spain", "Holland"]

describe("towns", () => {
  it("has four towns for each nation", () => {
    expect(towns).toHaveLength(16)

    nations.forEach((nation) => {
      expect(
        towns.filter((town) => TOWNS[town].nation === nation),
        nation
      ).toHaveLength(4)
    })
  })

  it("has unique names and ids that are safe to store and use in paths", () => {
    const names = towns.map((town) => TOWNS[town].name)

    expect(new Set(names).size).toBe(towns.length)

    towns.forEach((town) => {
      expect(town).toMatch(/^[a-z]+(-[a-z]+)*$/)
    })
  })

  it("places every town and harbour on the sea map", () => {
    towns.forEach((town) => {
      const { x, y, harbor } = TOWNS[town].map

      ;[x, y, harbor.x, harbor.y].forEach((value) => {
        expect(value, town).toBeGreaterThanOrEqual(0)
      })
      expect(Math.max(x, harbor.x), town).toBeLessThan(MAP_WIDTH)
      expect(Math.max(y, harbor.y), town).toBeLessThan(MAP_HEIGHT)
    })
  })

  it.each(towns)("%s has an interior for every building", (town) => {
    Object.keys(TOWNS[town].buildings).forEach((location) => {
      const src = getLocationBackground(town, location as TownLocation)

      expect(existsSync(join("public", src)), src).toBe(true)
    })
  })

  it("names every NPC after their town and has their portrait", () => {
    NPCS.forEach((npc) => {
      expect(npc.id.startsWith(`${npc.town}-${npc.placement}-`), npc.id).toBe(
        true
      )
      expect(existsSync(join("public", getNpcImage(npc))), npc.id).toBe(true)
    })
  })
})
