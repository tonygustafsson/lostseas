import { describe, expect, it } from "vitest"

import { TITLE_INFO } from "@/constants/title"
import { getNewTitle, getTitleInfoByScore } from "@/utils/title"

describe("title utils", () => {
  it("getTitleInfoByScore returns expected title ranges", () => {
    expect(getTitleInfoByScore(-5)).toEqual(TITLE_INFO.Pirate)
    expect(getTitleInfoByScore(0)).toEqual(TITLE_INFO.Pirate)
    expect(getTitleInfoByScore(2)).toEqual(TITLE_INFO.Pirate)
    expect(getTitleInfoByScore(5)).toEqual(TITLE_INFO.Ensign)
    expect(getTitleInfoByScore(9)).toEqual(TITLE_INFO.Captain)
    expect(getTitleInfoByScore(15)).toEqual(TITLE_INFO.Major)
    expect(getTitleInfoByScore(20)).toEqual(TITLE_INFO.Colonel)
    expect(getTitleInfoByScore(30)).toEqual(TITLE_INFO.Admiral)
    expect(getTitleInfoByScore(40)).toEqual(TITLE_INFO.Baron)
    expect(getTitleInfoByScore(50)).toEqual(TITLE_INFO.Count)
    expect(getTitleInfoByScore(60)).toEqual(TITLE_INFO.Marquis)
    expect(getTitleInfoByScore(200)).toEqual(TITLE_INFO.Duke)
  })

  it("each title step needs one more victory than the step before", () => {
    const levels = Object.values(TITLE_INFO).map(({ minLevel }) => minLevel)
    const steps = levels.slice(1).map((level, index) => level - levels[index])

    expect(levels[0]).toBe(0)
    expect(steps).toEqual([3, 4, 5, 6, 7, 8, 9, 10, 11])
  })

  it.each(Object.values(TITLE_INFO))(
    "$title starts exactly at level $minLevel",
    ({ title, minLevel }) => {
      expect(getTitleInfoByScore(minLevel).title).toBe(title)

      if (minLevel > 0) {
        expect(getTitleInfoByScore(minLevel - 1).title).not.toBe(title)
      }
    }
  )

  it("getNewTitle computes promotion and citizenship scenarios", () => {
    const character = {
      title: "Pirate",
      town: "Port Royale",
      nationality: "England",
      battles: {
        France: { won: 5, lost: 0 },
        England: { won: 0, lost: 0 },
      },
    } as any

    // townPort Royale nation is England; warWith is France -> score = enemyWins (France) - friendlyAttacks (England)
    const res = getNewTitle(character)
    expect(res.isHomeNation).toBe(true)
    expect(res.titleInfo.title).toBe("Ensign")
    expect(res.promotionAvailable).toBe(true)

    // citizenship change: if not home nation and score > 0
    const other = { ...character, nationality: "France" } as any
    const res2 = getNewTitle(other)
    expect(res2.isHomeNation).toBe(false)
    expect(res2.citizenshipChangeAvailable).toBe(true)
  })
})
