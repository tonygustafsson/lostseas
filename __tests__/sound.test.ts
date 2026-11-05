import { afterEach, describe, expect, it, vi } from "vitest"

import useSound from "@/app/stores/sound"
import {
  getSoundEffectFiles,
  getSoundEffectSrcs,
  playSoundEffect,
} from "@/utils/sound"

// Returns the given values in order, like a scripted Math.random
const sequence =
  (...values: number[]) =>
  () =>
    values.shift() ?? 0

describe("sound utils", () => {
  it("lists every variant of an effect", () => {
    const files = getSoundEffectFiles("victory")

    expect(files).toHaveLength(14)
    expect(files[0]).toBe("soundfx/victory/victory1.opus")
    expect(files[13]).toBe("soundfx/victory/victory14.opus")
  })

  it("plays one file for most effects", () => {
    expect(getSoundEffectSrcs("ship-meeting", sequence(0))).toEqual([
      "soundfx/ship-meeting/ship-meeting1.opus",
    ])
  })

  it("plays the crew and the captain's line together for victory with speech", () => {
    expect(
      getSoundEffectSrcs("victory-with-speech", sequence(0, 0.99))
    ).toEqual([
      "soundfx/victory/victory1.opus",
      "soundfx/victory-speech/victory-speech14.opus",
    ])
  })

  it("plays the crew and the captain's line together for defeat with speech", () => {
    expect(getSoundEffectSrcs("defeat-with-speech", sequence(0.99, 0))).toEqual(
      [
        "soundfx/defeat/defeat11.opus",
        "soundfx/defeat-speech/defeat-speech1.opus",
      ]
    )
  })

  it("never adds the captain's line to a plain victory or defeat", () => {
    expect(getSoundEffectSrcs("victory", sequence(0, 0))).toEqual([
      "soundfx/victory/victory1.opus",
    ])
    expect(getSoundEffectSrcs("defeat", sequence(0, 0))).toEqual([
      "soundfx/defeat/defeat1.opus",
    ])
  })
})

describe("playSoundEffect", () => {
  const play = vi.fn(() => Promise.resolve())

  vi.stubGlobal(
    "Audio",
    vi.fn(function () {
      return { play }
    })
  )

  afterEach(() => {
    vi.clearAllMocks()
  })

  it("plays every effect when called back to back", () => {
    useSound.setState({ soundEffectsOn: true })

    playSoundEffect("transaction")
    playSoundEffect("transaction")
    playSoundEffect("defeat")

    expect(Audio).toHaveBeenCalledTimes(3)
    expect(play).toHaveBeenCalledTimes(3)
  })

  it("stays silent when sound effects are off", () => {
    useSound.setState({ soundEffectsOn: false })

    playSoundEffect("transaction")

    expect(Audio).not.toHaveBeenCalled()
  })
})
