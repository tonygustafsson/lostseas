import { describe, it, expect } from 'vitest'
import { validateShipCrewRequirements } from '../validateCrew'

describe('validateShipCrewRequirements', () => {
  it('calculates min and max crew for various ship types', () => {
    const ships = {
      a: { type: 'Brig' },
      b: { type: 'Merchantman' },
      c: { type: 'Galleon' },
      d: { type: 'Frigate' },
    } as any

    const res = validateShipCrewRequirements(ships)
    // min = 2 + 1 + 4 + 8 = 15
    // max = 20 + 10 + 50 + 100 = 180
    expect(res.minCrew).toBe(15)
    expect(res.maxCrew).toBe(180)
  })

  it('returns zeros for empty ships', () => {
    const res = validateShipCrewRequirements({})
    expect(res.minCrew).toBe(0)
    expect(res.maxCrew).toBe(0)
  })
})
