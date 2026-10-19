import { describe, expect, it } from "vitest"

import { isRemedy } from "@/constants/apothecary"
import {
  getRemedyHealing,
  getRemedyPrice,
  getRemedyResult,
} from "@/utils/apothecary"

describe("apothecary utils", () => {
  it("getRemedyHealing gives the remedy's points, capped at full health", () => {
    expect(getRemedyHealing(60, "willow-bark-tea")).toBe(25)
    expect(getRemedyHealing(60, "comfrey-poultice")).toBe(40)
    expect(getRemedyHealing(60, "theriac-draught")).toBe(40)
    expect(getRemedyHealing(100, "willow-bark-tea")).toBe(0)
    expect(getRemedyHealing(120, "theriac-draught")).toBe(0)
    expect(getRemedyHealing(-10, "theriac-draught")).toBe(100)
  })

  it("getRemedyPrice charges 0.6 gold per crew member for the remedy's full points", () => {
    expect(getRemedyPrice(50, "willow-bark-tea")).toBe(750)
    expect(getRemedyPrice(3, "comfrey-poultice")).toBe(90)
    expect(getRemedyPrice(1, "jesuits-bark-tonic")).toBe(45)
    expect(getRemedyPrice(10, "theriac-draught")).toBe(600)
    expect(getRemedyPrice(0, "theriac-draught")).toBe(0)
  })

  it("isRemedy accepts only remedy keys", () => {
    expect(isRemedy("theriac-draught")).toBe(true)
    expect(isRemedy("toString")).toBe(false)
    expect(isRemedy(5)).toBe(false)
  })

  it("getRemedyResult works out healing, new health and price together", () => {
    expect(
      getRemedyResult({ count: 50, health: 45 }, "comfrey-poultice")
    ).toEqual({
      hasCrew: true,
      currentHealth: 45,
      healed: 50,
      newHealth: 95,
      price: 1500,
    })
    expect(
      getRemedyResult({ count: 50, health: 45 }, "theriac-draught")
    ).toEqual({
      hasCrew: true,
      currentHealth: 45,
      healed: 55,
      newHealth: 100,
      price: 3000,
    })
    expect(
      getRemedyResult({ count: 50, health: 120 }, "willow-bark-tea")
    ).toEqual({
      hasCrew: true,
      currentHealth: 100,
      healed: 0,
      newHealth: 100,
      price: 750,
    })
  })

  it.each([undefined, NaN, 0, -5])(
    "getRemedyResult has no crew and no price when the count is %s",
    (count) => {
      expect(
        getRemedyResult(
          { count: count as never, health: 50 },
          "willow-bark-tea"
        )
      ).toMatchObject({ hasCrew: false, price: 0 })
    }
  )

  it.each([undefined, NaN])(
    "getRemedyResult heals nothing when health is %s",
    (health) => {
      expect(
        getRemedyResult(
          { count: 50, health: health as never },
          "willow-bark-tea"
        )
      ).toMatchObject({ healed: 0 })
    }
  )
})
