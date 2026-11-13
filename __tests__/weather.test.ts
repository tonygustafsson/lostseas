import { describe, expect, it } from "vitest"

import { getNextWeather, getRandomWeather } from "@/utils/weather"

describe("getRandomWeather", () => {
  it.each([
    [0, "sunny"],
    [0.29, "sunny"],
    [0.3, "partlySunny"],
    [0.49, "partlySunny"],
    [0.5, "rainy"],
    [0.69, "rainy"],
    [0.7, "cloudy"],
    [0.89, "cloudy"],
    [0.9, "foggy"],
    [0.9999, "foggy"],
  ] as const)("turns a roll of %d into %s", (roll, weather) => {
    expect(getRandomWeather(() => roll)).toBe(weather)
  })
})

describe("getNextWeather", () => {
  it("changes the weather on half of the days", () => {
    const rolls = [0.49, 0.95]

    expect(getNextWeather("sunny", () => rolls.shift()!)).toBe("foggy")
    expect(getNextWeather("sunny", () => 0.5)).toBe("sunny")
  })
})
