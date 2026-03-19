import { describe, expect, it, vi } from 'vitest'

vi.mock('../crew', () => ({ getMannedCannons: vi.fn() }))

import { getMannedCannons } from '../crew'
import { getScore } from '../score'

describe('score utils', () => {
  it('calculates score including title, gold, ships and manned cannons', () => {
    ;(getMannedCannons as any).mockReturnValue(3)

    const player = {
      character: { title: 'Captain', gold: 1200, account: 200, loan: 100 },
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
})
