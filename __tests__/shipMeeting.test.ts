import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { getMannedCannons } from "@/utils/crew"
import { getTownsNationality } from "@/utils/location"
import { getRandomInt } from "@/utils/random"
import {
  calculateAttackSuccess,
  createMeetingShip,
  getHitChance,
  getLootedMerchandise,
  getNumberOfRecruits,
  getStolenMerchandise,
} from "@/utils/shipMeeting"

vi.mock("@/utils/random", () => ({
  getRandomInt: vi.fn(),
}))

vi.mock("@/utils/crew", () => ({
  getMannedCannons: vi.fn(),
}))

vi.mock("@/utils/location", () => ({
  getTownsNationality: vi.fn(),
}))

describe("shipMeeting utilities", () => {
  let mathRandomSpy: any

  beforeEach(() => {
    mathRandomSpy = vi.spyOn(Math, "random")
  })

  afterEach(() => {
    vi.resetAllMocks()
    mathRandomSpy.mockRestore()
  })

  it("createMeetingShip returns expected structure and uses destination nation on the last day", () => {
    ;(getTownsNationality as any).mockReturnValue("Spain")
    mathRandomSpy.mockReturnValue(0.79)

    // shipType index, cannons value
    ;(getRandomInt as any)
      .mockImplementationOnce(() => 1)
      .mockImplementationOnce(() => 3)

    const result = createMeetingShip(5, "PortRoyal" as any, true)

    expect(result).toHaveProperty("nation", "Spain")
    expect(result).toHaveProperty("shipType")
    expect(result).toHaveProperty("crewMembers")
    expect(result).toHaveProperty("cannons")
    expect(result.cannons).toBeGreaterThanOrEqual(1)
    expect(result.crewMembers).toEqual(result.cannons * 2)
  })

  it("createMeetingShip picks another nation on the last day when Math.random is 0.8 or more", () => {
    ;(getTownsNationality as any).mockReturnValue("Spain")
    mathRandomSpy.mockReturnValue(0.8)
    ;(getRandomInt as any).mockImplementation(
      (_min: number, max: number) => max
    )

    const result = createMeetingShip(5, "PortRoyal" as any, true)

    // Four nations and pirates, minus the destination's nation
    expect(getRandomInt).toHaveBeenNthCalledWith(1, 0, 3)
    expect(result.nation).not.toBe("Spain")
  })

  it("createMeetingShip picks any nation or pirates before the last day", () => {
    ;(getTownsNationality as any).mockReturnValue("Spain")
    mathRandomSpy.mockReturnValue(0)
    ;(getRandomInt as any).mockImplementation(
      (_min: number, max: number) => max
    )

    const result = createMeetingShip(5, "PortRoyal" as any)

    expect(getRandomInt).toHaveBeenNthCalledWith(1, 0, 4)
    expect(result.nation).toBe("Pirate")
  })

  it("getHitChance is the base chance for an even fight", () => {
    expect(getHitChance(10, 10)).toBeCloseTo(0.44)
  })

  it("getHitChance scales with the cannon ratio and is capped", () => {
    expect(getHitChance(8, 10)).toBeCloseTo(0.352)
    expect(getHitChance(11, 10)).toBeCloseTo(0.484)
    expect(getHitChance(100, 10)).toBe(0.95)
  })

  it("getHitChance never hits without manned cannons", () => {
    expect(getHitChance(0, 5)).toBe(0)
  })

  it("getHitChance treats an opponent without cannons as one cannon", () => {
    expect(getHitChance(1, 0)).toBeCloseTo(0.44)
  })

  it("calculateAttackSuccess hits when the roll is below the hit chance", () => {
    ;(getMannedCannons as any).mockReturnValue(10)

    ;(getRandomInt as any).mockReturnValue(44)
    expect(calculateAttackSuccess(20, 10, 10)).toBe(true)

    ;(getRandomInt as any).mockReturnValue(45)
    expect(calculateAttackSuccess(20, 10, 10)).toBe(false)
  })

  it("getNumberOfRecruits uses different percentage ranges based on opponent size", () => {
    // opponent <= 10: percent 10-40
    ;(getRandomInt as any).mockReturnValue(40)
    expect(getNumberOfRecruits(10)).toBe(4) // floor(10 * 0.4)

    // opponent == 11: percent 2-6
    ;(getRandomInt as any).mockReturnValue(6)
    expect(getNumberOfRecruits(11)).toBe(0) // floor(11 * 0.06) = 0

    // opponent > 11: percent 3-10
    ;(getRandomInt as any).mockReturnValue(10)
    expect(getNumberOfRecruits(20)).toBe(2) // floor(20 * 0.10)
  })

  it("getLootedMerchandise returns an object with possible merchandise counts", () => {
    let call = 0
    ;(getRandomInt as any).mockImplementation((min: number, max: number) => {
      call += 1
      if (min === 0 && max === 2) {
        return call === 1 ? 0 : 1
      }
      if (min === 1 && max === 10) return 3
      return 2
    })

    const looted = getLootedMerchandise()
    expect(typeof looted).toBe("object")
  })

  it("getStolenMerchandise takes all of the rolled number of carried goods", () => {
    // 2 goods, then always the last one left
    ;(getRandomInt as any).mockImplementation((min: number, max: number) =>
      min === 1 ? 2 : max
    )

    expect(
      getStolenMerchandise({ food: 5, water: 0, cannons: 4, rum: 3, silk: 2 })
    ).toEqual({ rum: 3, silk: 2 })
  })

  it("getStolenMerchandise takes everything when carrying fewer goods than rolled", () => {
    ;(getRandomInt as any).mockImplementation((min: number, max: number) =>
      min === 1 ? 3 : max
    )

    expect(getStolenMerchandise({ food: 5, cannons: 4 })).toEqual({ food: 5 })
  })

  it("getStolenMerchandise never takes cannons, repair kits or goods you do not have", () => {
    ;(getRandomInt as any).mockImplementation((min: number, max: number) =>
      min === 1 ? 3 : max
    )

    expect(
      getStolenMerchandise({ water: 0, cannons: 4, repairKits: 8 })
    ).toEqual({})
    expect(getStolenMerchandise(undefined)).toEqual({})
  })
})
