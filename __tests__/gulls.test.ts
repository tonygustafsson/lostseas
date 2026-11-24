import { readFileSync } from "node:fs"
import { join } from "node:path"

import { describe, expect, it } from "vitest"

import {
  BUILDING_GULLS,
  getGullArrays,
  HARBOUR_GULLS,
} from "@/components/game-ui/LocationScene/gulls"
import { GULL_SHEET } from "@/components/game-ui/LocationScene/gullSprites"

const TIMES = Array.from({ length: 80 }, (_, i) => i * 3.7)

describe("getGullArrays", () => {
  it("has a gull for every slot of the shader", () => {
    for (const flock of [HARBOUR_GULLS, BUILDING_GULLS]) {
      const { u_gull } = getGullArrays(12, flock)

      expect(u_gull.size).toBe(4)
      expect(u_gull.values).toHaveLength(flock.count * 4)
    }
  })

  it("is the same for the same moment", () => {
    expect(getGullArrays(42.5, BUILDING_GULLS)).toEqual(
      getGullArrays(42.5, BUILDING_GULLS)
    )
  })

  it("keeps gulls near the area they fly over, in a column of the sheet", () => {
    for (const time of TIMES) {
      const { values } = getGullArrays(time, BUILDING_GULLS).u_gull

      for (let i = 0; i < values.length; i += 4) {
        const [x, y, size, frame] = values.slice(i, i + 4)

        expect(x).toBeGreaterThanOrEqual(-0.06)
        expect(x).toBeLessThanOrEqual(1.06)
        expect(y).toBeGreaterThan(0.04)
        expect(y).toBeLessThan(0.06 + BUILDING_GULLS.spread + 0.02)
        expect(size).toBeGreaterThanOrEqual(0.8)
        expect(size).toBeLessThanOrEqual(1.2)
        expect(Number.isInteger(frame)).toBe(true)
        expect(frame).toBeGreaterThanOrEqual(0)
        expect(frame).toBeLessThan(GULL_SHEET.frames)
      }
    }
  })

  it("moves the gulls and beats their wings", () => {
    const frames = new Set(
      TIMES.map((time) => getGullArrays(time, HARBOUR_GULLS).u_gull.values[3])
    )

    expect(getGullArrays(1, HARBOUR_GULLS)).not.toEqual(
      getGullArrays(2, HARBOUR_GULLS)
    )
    expect(frames.size).toBeGreaterThan(1)
  })
})

describe("the gull sheet", () => {
  it("is the size the layout says", () => {
    const png = readFileSync(join(process.cwd(), "public/img/town-gulls.png"))

    expect(png.readUInt32BE(16)).toBe(GULL_SHEET.cellWidth * GULL_SHEET.frames)
    expect(png.readUInt32BE(20)).toBe(GULL_SHEET.cellHeight)
  })
})
