import { afterEach, describe, expect, it, vi } from "vitest"

import useSound from "@/app/stores/sound"
import {
  getAmbienceSounds,
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
    expect(files[0]).toBe("/soundfx/victory/victory1.opus")
    expect(files[13]).toBe("/soundfx/victory/victory14.opus")
  })

  it("plays one file for most effects", () => {
    expect(getSoundEffectSrcs("ship-meeting", sequence(0))).toEqual([
      "/soundfx/ship-meeting/ship-meeting1.opus",
    ])
  })

  it("plays the crew and the captain's line together for victory with speech", () => {
    expect(
      getSoundEffectSrcs("victory-with-speech", sequence(0, 0.99))
    ).toEqual([
      "/soundfx/victory/victory1.opus",
      "/soundfx/victory-speech/victory-speech14.opus",
    ])
  })

  it("plays the crew and the captain's line together for defeat with speech", () => {
    expect(getSoundEffectSrcs("defeat-with-speech", sequence(0.99, 0))).toEqual(
      [
        "/soundfx/defeat/defeat11.opus",
        "/soundfx/defeat-speech/defeat-speech1.opus",
      ]
    )
  })

  it("never adds the captain's line to a plain victory or defeat", () => {
    expect(getSoundEffectSrcs("victory", sequence(0, 0))).toEqual([
      "/soundfx/victory/victory1.opus",
    ])
    expect(getSoundEffectSrcs("defeat", sequence(0, 0))).toEqual([
      "/soundfx/defeat/defeat1.opus",
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

describe("ambience sounds", () => {
  it("getAmbienceSounds returns all harbor sounds in the harbor", () => {
    expect(getAmbienceSounds("Harbor")).toEqual([
      "/ambience/harbor/harbor1.opus",
      "/ambience/harbor/harbor2.opus",
      "/ambience/harbor/harbor3.opus",
      "/ambience/harbor/harbor4.opus",
      "/ambience/harbor/harbor5.opus",
      "/ambience/harbor/harbor6.opus",
    ])
  })

  it("getAmbienceSounds returns all market sounds in the market", () => {
    expect(getAmbienceSounds("Market")).toEqual([
      "/ambience/market/market1.opus",
      "/ambience/market/market2.opus",
      "/ambience/market/market3.opus",
      "/ambience/market/market4.opus",
      "/ambience/market/market5.opus",
      "/ambience/market/market6.opus",
      "/ambience/market/market7.opus",
      "/ambience/market/market8.opus",
      "/ambience/market/market9.opus",
      "/ambience/market/market10.opus",
      "/ambience/market/market11.opus",
      "/ambience/market/market12.opus",
      "/ambience/market/market13.opus",
    ])
  })

  it("getAmbienceSounds returns all tavern sounds in the tavern", () => {
    expect(getAmbienceSounds("Tavern")).toEqual([
      "/ambience/tavern/tavern1.opus",
      "/ambience/tavern/tavern2.opus",
      "/ambience/tavern/tavern3.opus",
      "/ambience/tavern/tavern4.opus",
    ])
  })

  it("getAmbienceSounds returns all shipyard sounds in the shipyard", () => {
    expect(getAmbienceSounds("Shipyard")).toEqual([
      "/ambience/shipyard/shipyard1.opus",
      "/ambience/shipyard/shipyard2.opus",
      "/ambience/shipyard/shipyard3.opus",
      "/ambience/shipyard/shipyard4.opus",
      "/ambience/shipyard/shipyard5.opus",
      "/ambience/shipyard/shipyard6.opus",
      "/ambience/shipyard/shipyard7.opus",
    ])
  })

  it("getAmbienceSounds returns all sea sounds at sea", () => {
    expect(getAmbienceSounds("Sea")).toEqual(
      Array.from({ length: 9 }, (_, i) => `/ambience/sea/sea${i + 1}.opus`)
    )
  })

  it("getAmbienceSounds returns undefined for locations without a sound", () => {
    expect(getAmbienceSounds("Shop")).toBeUndefined()
    expect(getAmbienceSounds(undefined)).toBeUndefined()
  })
})
