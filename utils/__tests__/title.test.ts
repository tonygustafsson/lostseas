import { describe, it, expect } from 'vitest'
import { getTitleInfoByScore, getNewTitle } from '../title'
import { TITLE_INFO } from '@/constants/title'

describe('title utils', () => {
  it('getTitleInfoByScore returns expected title ranges', () => {
    expect(getTitleInfoByScore(0)).toEqual(TITLE_INFO.Pirate)
    expect(getTitleInfoByScore(15)).toEqual(TITLE_INFO.Ensign)
    expect(getTitleInfoByScore(25)).toEqual(TITLE_INFO.Captain)
    expect(getTitleInfoByScore(35)).toEqual(TITLE_INFO.Major)
    expect(getTitleInfoByScore(45)).toEqual(TITLE_INFO.Colonel)
    expect(getTitleInfoByScore(55)).toEqual(TITLE_INFO.Admiral)
    expect(getTitleInfoByScore(70)).toEqual(TITLE_INFO.Baron)
    expect(getTitleInfoByScore(85)).toEqual(TITLE_INFO.Count)
    expect(getTitleInfoByScore(110)).toEqual(TITLE_INFO.Marquis)
    expect(getTitleInfoByScore(200)).toEqual(TITLE_INFO.Duke)
  })

  it('getNewTitle handles undefined character', () => {
    const res = getNewTitle(undefined)
    expect(res.titleInfo.title).toBe('Pirate')
    expect(res.promotionAvailable).toBe(false)
    expect(res.citizenshipChangeAvailable).toBe(false)
  })

  it('getNewTitle computes promotion and citizenship scenarios', () => {
    const character = {
      title: 'Pirate',
      town: 'Port Royale',
      nationality: 'England',
      battles: {
        France: { won: 15, lost: 0 },
        England: { won: 0, lost: 0 },
      },
    } as any

    // townPort Royale nation is England; warWith is France -> score = enemyWins (France) - friendlyAttacks (England)
    const res = getNewTitle(character)
    expect(res.isHomeNation).toBe(true)
    expect(res.titleInfo.title).toBe('Ensign')
    expect(res.promotionAvailable).toBe(true)

    // citizenship change: if not home nation and score > 0
    const other = { ...character, nationality: 'France' } as any
    const res2 = getNewTitle(other)
    expect(res2.isHomeNation).toBe(false)
    expect(res2.citizenshipChangeAvailable).toBe(true)
  })
})
