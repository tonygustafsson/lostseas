import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { getMannedCannons } from "@/utils/crew"
import { getTownsNationality } from "@/utils/location"
import { getRandomInt } from "@/utils/random"
import {
  calculateAttackSuccess,
  createMeetingShip,
  getLootedMerchandise,
  getNumberOfRecruits,
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

  it("createMeetingShip returns expected structure and uses destination nation when Math.random > 0.5", () => {
    ;(getTownsNationality as any).mockReturnValue("Pirate")
    mathRandomSpy.mockReturnValue(0.8)

    // shipType index, cannons value
    ;(getRandomInt as any)
      .mockImplementationOnce(() => 1)
      .mockImplementationOnce(() => 3)

    const result = createMeetingShip(5, "PortRoyal" as any)

    expect(result).toHaveProperty("nation", "Pirate")
    expect(result).toHaveProperty("shipType")
    expect(result).toHaveProperty("crewMembers")
    expect(result).toHaveProperty("cannons")
    expect(result.cannons).toBeGreaterThanOrEqual(1)
    expect(result.crewMembers).toEqual(result.cannons * 2)
  })

  it("calculateAttackSuccess returns true/false based on mocked scores", () => {
    ;(getMannedCannons as any).mockReturnValue(10)

    // control randomness: first call for playerScore extra, second for opponentScore extra
    ;(getRandomInt as any)
      .mockImplementationOnce(() => 0)
      .mockImplementationOnce(() => 5)

    const success = calculateAttackSuccess(10, { cannons: 5 } as any, 8)
    expect(typeof success).toBe("boolean")
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
})
