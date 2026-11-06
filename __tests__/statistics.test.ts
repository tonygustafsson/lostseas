import { describe, expect, it } from "vitest"

import {
  getBattleRecordByNation,
  getBattleTotals,
  getStatisticsSnapshot,
} from "@/utils/statistics"

import { createTestPlayer } from "./helpers/createTestPlayer"

describe("getBattleTotals", () => {
  it("adds up wins and losses against every nation", () => {
    expect(
      getBattleTotals({
        England: { won: 2, lost: 1 },
        Pirate: { won: 3 },
        Spain: { lost: 2 },
      } as Character["battles"])
    ).toEqual({ won: 5, lost: 3 })
  })

  it("counts no battles as zero", () => {
    expect(getBattleTotals(undefined)).toEqual({ won: 0, lost: 0 })
  })
})

describe("getBattleRecordByNation", () => {
  it("lists each nation fought with its wins and losses", () => {
    expect(
      getBattleRecordByNation({
        Spain: { won: 4, lost: 1 },
        Pirate: { lost: 2 },
        France: {},
      } as Character["battles"])
    ).toEqual([
      { nation: "Spain", won: 4, lost: 1 },
      { nation: "Pirate", won: 0, lost: 2 },
    ])
  })

  it("is empty before the first battle", () => {
    expect(getBattleRecordByNation(undefined)).toEqual([])
  })
})

describe("getStatisticsSnapshot", () => {
  it("records net worth, cannons, battles and the score in parts", () => {
    const player = createTestPlayer({
      character: {
        title: "Captain",
        gold: 1000,
        account: 2000,
        loan: 500,
        day: 12,
        battles: { Spain: { won: 4, lost: 1 } },
      },
      crewMembers: { count: 10 },
      inventory: { cannons: 8 },
    })

    expect(getStatisticsSnapshot(player)).toEqual({
      day: 12,
      score: 100 + 5 + 10 + 50,
      netWorth: 2500,
      scoreTitle: 100,
      scoreWealth: 5,
      scoreShips: 10,
      scoreCannons: 50,
      mannedCannons: 5,
      cannons: 8,
      battlesWon: 4,
      battlesLost: 1,
    })
  })

  it("has score parts that add up to the score", () => {
    const snapshot = getStatisticsSnapshot(createTestPlayer())

    expect(
      snapshot.scoreTitle +
        snapshot.scoreWealth +
        snapshot.scoreShips +
        snapshot.scoreCannons
    ).toBe(snapshot.score)
  })
})
