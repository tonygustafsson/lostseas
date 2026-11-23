import { readFileSync } from "node:fs"
import { join } from "node:path"

import { describe, expect, it } from "vitest"

import {
  CATS,
  getWalkerArrays,
  getWalkers,
  RATS,
  WALKER_COUNT,
  WALKERS,
} from "@/components/game-ui/LocationScene/walkers"
import {
  WALKER_SHEET,
  WALKER_SHEET_ROWS,
} from "@/components/game-ui/LocationScene/walkSprites"

// x start, x end, feet, half width, person size
const LANES = [
  [200, 1800, 560, 8, 2.26],
  [400, 1500, 640, 6, 2.8],
]

const TIMES = Array.from({ length: 60 }, (_, i) => i * 7.3)

describe("getWalkers", () => {
  it("lists rats, then cats, then people", () => {
    const walkers = getWalkers(30, LANES, 1)

    expect(walkers).toHaveLength(WALKER_COUNT)
    expect(WALKER_COUNT).toBe(RATS + CATS + WALKERS)
  })

  it("is the same for the same moment", () => {
    expect(getWalkers(123.4, LANES, 1)).toEqual(getWalkers(123.4, LANES, 1))
  })

  it("shows nobody without streets", () => {
    getWalkers(30, [], 1).forEach((walker) => expect(walker.alpha).toBe(0))
  })

  it("shows nobody when nobody is out", () => {
    TIMES.forEach((time) =>
      getWalkers(time, LANES, 0).forEach((walker) =>
        expect(walker.alpha).toBe(0)
      )
    )
  })

  it("keeps everybody on a street and on a pose of the sheet", () => {
    let seen = 0

    TIMES.forEach((time) =>
      getWalkers(time, LANES, 1)
        .filter((walker) => walker.alpha > 0)
        .forEach((walker) => {
          seen++

          expect(
            LANES.some(
              ([start, end, feet, half]) =>
                walker.x >= start &&
                walker.x <= end &&
                walker.y >= feet - half &&
                walker.y <= feet + half
            )
          ).toBe(true)
          expect(Math.abs(walker.facing)).toBe(1)
          expect(walker.alpha).toBeLessThanOrEqual(1)
          expect(walker.column).toBeGreaterThanOrEqual(0)
          expect(walker.column).toBeLessThan(WALKER_SHEET.columns)
          expect(walker.row).toBeGreaterThanOrEqual(0)
          expect(walker.row).toBeLessThan(WALKER_SHEET_ROWS)
        })
    )

    expect(seen).toBeGreaterThan(0)
  })

  it("moves people along the street", () => {
    const person = (time: number) => getWalkers(time, LANES, 1)[RATS + CATS]
    const moving = TIMES.map((time) => [person(time), person(time + 1)]).filter(
      ([now, later]) => now.alpha > 0 && later.alpha > 0 && now.x !== later.x
    )

    expect(moving.length).toBeGreaterThan(0)
  })
})

describe("getWalkerArrays", () => {
  it("gives two lists of vec4 for the shader", () => {
    const { u_walkA, u_walkB } = getWalkerArrays(30, LANES, 1)

    expect(u_walkA.size).toBe(4)
    expect(u_walkA.values).toHaveLength(WALKER_COUNT * 4)
    expect(u_walkB.values).toHaveLength(WALKER_COUNT * 4)
  })
})

describe("the sprite sheet", () => {
  it("is the size the shader expects", () => {
    const png = readFileSync(join(process.cwd(), "public/img/town-walkers.png"))

    expect(png.readUInt32BE(16)).toBe(
      WALKER_SHEET.columns * WALKER_SHEET.cellWidth
    )
    expect(png.readUInt32BE(20)).toBe(
      WALKER_SHEET_ROWS * WALKER_SHEET.cellHeight
    )
  })
})
