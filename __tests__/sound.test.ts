import { describe, expect, it } from "vitest"

import { getSoundEffectFiles, getSoundEffectSrcs } from "@/utils/sound"

import { createSeededRandom } from "./helpers/seededRandom"

// Returns the given values in order, like a scripted Math.random
const sequence =
  (...values: number[]) =>
  () =>
    values.shift() ?? 0

describe("sound utils", () => {
  it("lists a single file for effects without variants", () => {
    expect(getSoundEffectFiles("tools")).toEqual(["soundfx/tools.opus"])
  })

  it("lists every variant of an effect", () => {
    const files = getSoundEffectFiles("victory")

    expect(files).toHaveLength(14)
    expect(files[0]).toBe("soundfx/victory/victory1.opus")
    expect(files[13]).toBe("soundfx/victory/victory14.opus")
  })

  it("plays one file for effects without a companion", () => {
    expect(getSoundEffectSrcs("ship-meeting", sequence(0))).toEqual([
      "soundfx/ship-meeting/ship-meeting1.opus",
    ])
  })

  it("adds the captain's line when the roll is below 1/3", () => {
    expect(getSoundEffectSrcs("defeat", sequence(0.99, 0.2, 0))).toEqual([
      "soundfx/defeat/defeat11.opus",
      "soundfx/defeat-talk/defeat-talk1.opus",
    ])
  })

  it("skips the captain's line when the roll is 1/3 or more", () => {
    expect(getSoundEffectSrcs("victory", sequence(0, 0.34))).toEqual([
      "soundfx/victory/victory1.opus",
    ])
  })

  it("adds the captain's line about a third of the time", () => {
    const random = createSeededRandom(42)
    const rolls = 3000

    const withTalk = Array.from(
      { length: rolls },
      () => getSoundEffectSrcs("victory", random.next).length === 2
    ).filter(Boolean).length

    expect(withTalk / rolls).toBeCloseTo(1 / 3, 1)
  })
})
