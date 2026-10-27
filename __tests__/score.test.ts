import { describe, expect, it, vi } from "vitest"

import { getMannedCannons } from "@/utils/crew"
import { getNetWorth, getScore, getScoreBreakdown } from "@/utils/score"

vi.mock("@/utils/crew", () => ({ getMannedCannons: vi.fn() }))

describe("score utils", () => {
  it("calculates score including title, gold, ships and manned cannons", () => {
    ;(getMannedCannons as any).mockReturnValue(3)

    const player = {
      character: { title: "Captain", gold: 1200, account: 200, loan: 100 },
      ships: { a: {}, b: {} },
      crewMembers: { count: 6 },
      inventory: { cannons: 6 },
    } as any

    const score = getScore(player)
    // base for Captain = 100
    // totalGold = 1200+200-100 = 1300 => + floor(1300/500)=2
    // ships = 2 => +20
    // mannedCannons mocked=3 => +30
    expect(score).toBe(100 + 2 + 20 + 30)
  })

  it("splits the score into title, wealth, ships and cannons", () => {
    ;(getMannedCannons as any).mockReturnValue(3)

    const player = {
      character: { title: "Captain", gold: 1200, account: 200, loan: 100 },
      ships: { a: {}, b: {} },
      crewMembers: { count: 6 },
      inventory: { cannons: 6 },
    } as any

    expect(getScoreBreakdown(player)).toEqual({
      title: 100,
      wealth: 2,
      ships: 20,
      cannons: 30,
    })
  })

  it("calculates net worth from carried gold, savings, stakes and loan", () => {
    const player = {
      character: {
        gold: 1200,
        account: 200,
        loan: 100,
        ventures: { silverFleet: { investedDay: 1, returnDay: 43 } },
      },
    } as any

    // silverFleet stake = 6000
    expect(getNetWorth(player)).toBe(1200 + 200 + 6000 - 100)
  })

  it("counts stakes held in ventures as gold", () => {
    ;(getMannedCannons as any).mockReturnValue(0)

    const player = {
      character: {
        title: "Pirate",
        gold: 0,
        ventures: { silverFleet: { investedDay: 1, returnDay: 43 } },
      },
      ships: {},
      crewMembers: { count: 0 },
    } as any

    // silverFleet stake = 6000 => + floor(6000/500)=12
    expect(getScore(player)).toBe(12)
  })
})
