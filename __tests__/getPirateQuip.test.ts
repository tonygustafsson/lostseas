import { afterEach, describe, expect, it, vi } from "vitest"

import {
  getAttackFailureQuip,
  getAttackSuccessQuip,
  getHarborArrivedQuip,
  getHarborBlockedQuip,
  getPirateQuip,
} from "@/utils/getPirateQuip"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const crew = (overrides?: Partial<CrewMembers>): CrewMembers => ({
  count: 10,
  mood: 50,
  health: 100,
  ...overrides,
})

// Known days for each weather type (derived from getWeatherType logic):
//   rainy       → day % 5 === 2                    → e.g. day 2, 7, 12
//   partlySunny → day % 4 === 0 || day % 3 === 0   → e.g. day 3, 4, 6
//   cloudy      → day % 3 === 1 (partlySunny miss)  → e.g. day 1, 10
//   sunny       → everything else                   → e.g. day 5, 11

const RAINY_DAY = 2 // 2 % 5 === 2
const PARTLY_SUNNY_DAY = 3 // 3 % 3 === 0
const CLOUDY_DAY = 1 // 1 % 3 === 1
const SUNNY_DAY = 11 // falls through all conditions

// First-element samples for exported simple-quip functions
const harborArrivedQuipSamples = [
  "Heads up!",
  "Squawk! A word before ye wander off, Cap'n!",
]
const harborBlockedQuipSamples = [
  "Not so fast!",
  "Squawk! Hold yer anchor, Cap'n — we ain't ready to sail!",
]
const attackSuccessQuipSamples = [
  "Success, Captain!",
  "Squawk! We did it, Cap'n! Victory is ours!",
]
const attackFailureQuipSamples = [
  "Yarr, we failed!",
  "Squawk! They got the better of us this time, Cap'n...",
]

const weatherQuipSnippets: Record<string, string> = {
  sunny: "The sun be blazin'",
  rainy: "heavens be pourin'",
  cloudy: "grey as Davy Jones",
  partlySunny: "Sun and clouds battlin'",
}

// Snippet from generalQuips[0] — used to assert general quips appear in the pool
const GENERAL_QUIP_SNIPPET = "Pieces of eight"

const highMoodSnippet = "singin' sea shanties" // highMoodQuips[0]
const lowMoodSnippet = "grumblin' from the crew" // lowMoodQuips[0]
const lowHealthSnippet = "green in the gills" // lowHealthQuips[0]
const bigCrewSnippet = "fleet of sea dogs" // bigCrewQuips[0]
const smallCrewSnippet = "Just the few of us" // smallCrewQuips[0]

// ---------------------------------------------------------------------------
// Mock helpers
//
// getPirateQuip builds a `pool` array then calls:
//   pool[Math.floor(Math.random() * pool.length)]
//
// Pool build order for a valid crew + day:
//   1. weatherQuips[weather]   → always 3 items   (indices 0–2)
//   2. crew-specific quips     → pushed conditionally (indices 3+)
//   3. generalQuips            → always 9 items, pushed last
//
// To deterministically pick index `i` in a pool of size `n` we return
// (i + 0.5) / n, so Math.floor((i+0.5)/n * n) === i (the +0.5 avoids
// floating-point rounding issues with exact fractions).
// ---------------------------------------------------------------------------

function mockIndex(index: number, poolSize: number) {
  vi.spyOn(Math, "random").mockReturnValue((index + 0.5) / poolSize)
}

// Index 0 — always a weather quip (weather quips are at the start of the pool)
function mockPickFirst() {
  mockIndex(0, 100)
}

// Picks the last item — always a general quip (general quips pushed last)
function mockPickLast() {
  vi.spyOn(Math, "random").mockReturnValue(0.9999)
}

afterEach(() => vi.restoreAllMocks())

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("getPirateQuip", () => {
  describe("fallback to generalQuips", () => {
    it("returns a general quip when day is 0", () => {
      // !day → short-circuits to pickRandom(generalQuips); index 0 = "Pieces of eight"
      mockPickFirst()
      expect(getPirateQuip(crew(), 0)).toContain(GENERAL_QUIP_SNIPPET)
    })

    it("returns a general quip when day is undefined (default)", () => {
      mockPickFirst()
      expect(getPirateQuip(crew())).toContain(GENERAL_QUIP_SNIPPET)
    })

    it("returns a general quip when crew is undefined", () => {
      mockPickFirst()
      expect(getPirateQuip(undefined, 5)).toContain(GENERAL_QUIP_SNIPPET)
    })

    it("returns a non-empty string when both crew and day are undefined", () => {
      const result = getPirateQuip(undefined, undefined)
      expect(typeof result).toBe("string")
      expect(result.length).toBeGreaterThan(0)
    })
  })

  describe("weather quips", () => {
    it("includes a rainy quip on a rainy day", () => {
      mockPickFirst()
      expect(getPirateQuip(crew(), RAINY_DAY)).toContain(
        weatherQuipSnippets.rainy
      )
    })

    it("includes a partly sunny quip on a partly sunny day", () => {
      mockPickFirst()
      expect(getPirateQuip(crew(), PARTLY_SUNNY_DAY)).toContain(
        weatherQuipSnippets.partlySunny
      )
    })

    it("includes a cloudy quip on a cloudy day", () => {
      mockPickFirst()
      expect(getPirateQuip(crew(), CLOUDY_DAY)).toContain(
        weatherQuipSnippets.cloudy
      )
    })

    it("includes a sunny quip on a sunny day", () => {
      mockPickFirst()
      expect(getPirateQuip(crew(), SUNNY_DAY)).toContain(
        weatherQuipSnippets.sunny
      )
    })

    // Exhaustive boundary verification for the getWeatherType logic
    it.each([
      [2, "rainy"],
      [7, "rainy"],
      [12, "rainy"],
      [3, "partlySunny"],
      [4, "partlySunny"],
      [6, "partlySunny"],
      [1, "cloudy"],
      [10, "cloudy"],
      [5, "sunny"],
      [11, "sunny"],
    ])("day %i produces %s weather", (day, expectedWeather) => {
      mockPickFirst()
      expect(getPirateQuip(crew(), day)).toContain(
        weatherQuipSnippets[expectedWeather]
      )
    })
  })

  describe("crew health quips", () => {
    it("includes a low-health quip when crew health is below 40", () => {
      // pool: [3 sunny] + [3 lowHealth] + [9 general] = 15 → index 3 = lowHealthQuips[0]
      mockIndex(3, 15)
      expect(getPirateQuip(crew({ health: 39 }), SUNNY_DAY)).toContain(
        lowHealthSnippet
      )
    })

    it("does NOT include a low-health quip at health exactly 40", () => {
      // health === 40 is not < 40 → no lowHealth quips in pool
      mockPickLast()
      expect(getPirateQuip(crew({ health: 40 }), SUNNY_DAY)).not.toContain(
        lowHealthSnippet
      )
    })

    it("does NOT include a low-health quip for a healthy crew", () => {
      mockPickLast()
      expect(getPirateQuip(crew({ health: 100 }), SUNNY_DAY)).not.toContain(
        lowHealthSnippet
      )
    })
  })

  describe("crew mood quips", () => {
    it("includes a low-mood quip when crew mood is below 40", () => {
      // pool: [3 sunny] + [3 lowMood] + [9 general] = 15 → index 3 = lowMoodQuips[0]
      mockIndex(3, 15)
      expect(getPirateQuip(crew({ mood: 39 }), SUNNY_DAY)).toContain(
        lowMoodSnippet
      )
    })

    it("does NOT include a low-mood quip at mood exactly 40", () => {
      // mood === 40 is not < 40 → no lowMood quips in pool
      mockPickLast()
      expect(getPirateQuip(crew({ mood: 40 }), SUNNY_DAY)).not.toContain(
        lowMoodSnippet
      )
    })

    it("includes a high-mood quip when crew mood is above 70", () => {
      // pool: [3 sunny] + [3 highMood] + [9 general] = 15 → index 3 = highMoodQuips[0]
      mockIndex(3, 15)
      expect(getPirateQuip(crew({ mood: 71 }), SUNNY_DAY)).toContain(
        highMoodSnippet
      )
    })

    it("does NOT include a high-mood quip at mood exactly 70", () => {
      // mood === 70 is not > 70 → no highMood quips in pool
      mockPickLast()
      expect(getPirateQuip(crew({ mood: 70 }), SUNNY_DAY)).not.toContain(
        highMoodSnippet
      )
    })

    it("does NOT include mood quips in the neutral range (40–70)", () => {
      mockPickLast()
      const result = getPirateQuip(crew({ mood: 55 }), SUNNY_DAY)
      expect(result).not.toContain(lowMoodSnippet)
      expect(result).not.toContain(highMoodSnippet)
    })

    it("low-mood and high-mood branches are mutually exclusive", () => {
      // With mood < 40 only the lowMood branch fires; highMood is never in the pool
      mockPickLast()
      expect(getPirateQuip(crew({ mood: 10 }), SUNNY_DAY)).not.toContain(
        highMoodSnippet
      )
    })
  })

  describe("crew size quips", () => {
    it("includes a big-crew quip when crew count is exactly 30", () => {
      // pool: [3 sunny] + [2 bigCrew] + [9 general] = 14 → index 3 = bigCrewQuips[0]
      mockIndex(3, 14)
      expect(getPirateQuip(crew({ count: 30 }), SUNNY_DAY)).toContain(
        bigCrewSnippet
      )
    })

    it("includes a big-crew quip when crew count is above 30", () => {
      mockIndex(3, 14)
      expect(getPirateQuip(crew({ count: 50 }), SUNNY_DAY)).toContain(
        bigCrewSnippet
      )
    })

    it("does NOT include a big-crew quip for a crew of 29", () => {
      mockPickLast()
      expect(getPirateQuip(crew({ count: 29 }), SUNNY_DAY)).not.toContain(
        bigCrewSnippet
      )
    })

    it("includes a small-crew quip when crew count is exactly 3", () => {
      // pool: [3 sunny] + [2 smallCrew] + [9 general] = 14 → index 3 = smallCrewQuips[0]
      mockIndex(3, 14)
      expect(getPirateQuip(crew({ count: 3 }), SUNNY_DAY)).toContain(
        smallCrewSnippet
      )
    })

    it("includes a small-crew quip when crew count is 1", () => {
      mockIndex(3, 14)
      expect(getPirateQuip(crew({ count: 1 }), SUNNY_DAY)).toContain(
        smallCrewSnippet
      )
    })

    it("does NOT include a small-crew quip for a crew of 4", () => {
      mockPickLast()
      expect(getPirateQuip(crew({ count: 4 }), SUNNY_DAY)).not.toContain(
        smallCrewSnippet
      )
    })

    it("does NOT include crew-size quips when crew count is 0", () => {
      // count === 0 skips the entire crew-specific section
      mockPickLast()
      const result = getPirateQuip(crew({ count: 0 }), SUNNY_DAY)
      expect(result).not.toContain(bigCrewSnippet)
      expect(result).not.toContain(smallCrewSnippet)
    })
  })

  describe("general quips are always in the pool", () => {
    it("can produce a general quip with a mid-range crew on a sunny day", () => {
      // pool: [3 sunny] + [9 general] = 12 → index 3 = generalQuips[0] = "Pieces of eight"
      mockIndex(3, 12)
      expect(
        getPirateQuip(crew({ count: 10, mood: 50, health: 100 }), SUNNY_DAY)
      ).toContain(GENERAL_QUIP_SNIPPET)
    })

    it("can produce a general quip even when crew quips are also in the pool", () => {
      // pool: [3 sunny] + [3 lowHealth] + [9 general] = 15 → index 6 = generalQuips[0]
      mockIndex(6, 15)
      expect(getPirateQuip(crew({ health: 39 }), SUNNY_DAY)).toContain(
        GENERAL_QUIP_SNIPPET
      )
    })
  })

  describe("always returns a non-empty string", () => {
    const cases: [CrewMembers | undefined, number | undefined][] = [
      [undefined, undefined],
      [undefined, 5],
      [crew({ count: 0 }), 0],
      [crew({ count: 1, mood: 10, health: 10 }), RAINY_DAY],
      [crew({ count: 50, mood: 100, health: 100 }), SUNNY_DAY],
    ]

    it.each(cases)("for crew=%o, day=%s", (c, day) => {
      const result = getPirateQuip(c, day)
      expect(typeof result).toBe("string")
      expect(result.length).toBeGreaterThan(0)
    })
  })
})

describe("getHarborArrivedQuip", () => {
  it("returns a string", () => {
    expect(typeof getHarborArrivedQuip()).toBe("string")
  })

  it("returns a known harbor arrival quip", () => {
    mockPickFirst()
    expect(harborArrivedQuipSamples).toContain(getHarborArrivedQuip())
  })
})

describe("getHarborBlockedQuip", () => {
  it("returns a string", () => {
    expect(typeof getHarborBlockedQuip()).toBe("string")
  })

  it("returns a known harbor blocked quip", () => {
    mockPickFirst()
    expect(harborBlockedQuipSamples).toContain(getHarborBlockedQuip())
  })
})

describe("getAttackSuccessQuip", () => {
  it("returns a string", () => {
    expect(typeof getAttackSuccessQuip()).toBe("string")
  })

  it("returns a known attack success quip", () => {
    mockPickFirst()
    expect(attackSuccessQuipSamples).toContain(getAttackSuccessQuip())
  })
})

describe("getAttackFailureQuip", () => {
  it("returns a string", () => {
    expect(typeof getAttackFailureQuip()).toBe("string")
  })

  it("returns a known attack failure quip", () => {
    mockPickFirst()
    expect(attackFailureQuipSamples).toContain(getAttackFailureQuip())
  })
})
