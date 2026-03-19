import { describe, expect,it } from 'vitest'

import { validateJourney } from '@/utils/validateJourney'

describe('validateJourney', () => {
  it('returns NO_PLAYER when no player provided', () => {
    const res = validateJourney(undefined, 3)
    expect(res.success).toBe(false)
    expect(res.errors).toContain('NO_PLAYER')
  })

  it('detects missing ships and lack of provisions', () => {
    const player = {
      ships: {},
      crewMembers: { count: 5, mood: 50, health: 50 },
      inventory: { food: 0, water: 0 },
    } as any

    const res = validateJourney(player, 2)
    expect(res.errors).toContain('NO_SHIPS')
    expect(res.errors).toContain('NO_FOOD')
    expect(res.errors).toContain('NO_WATER')
  })

  it('detects damaged ships and crew size errors', () => {
    const player = {
      ships: {
        a: { type: 'Galleon', health: 0 },
      },
      crewMembers: { count: 2, mood: 50, health: 50 },
      inventory: { food: 100, water: 100 },
    } as any

    const res = validateJourney(player, 1)
    expect(res.errors).toContain('DAMAGED_SHIPS')
    expect(res.errors).toContain('NOT_ENOUGH_CREW_MEMBERS')
  })
})
