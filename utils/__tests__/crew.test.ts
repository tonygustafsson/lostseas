import { describe, expect,it } from 'vitest'

import {
  decreaseCrewHealth,
  getGoldEffectiveness,
  getMannedCannons,
  getMedicineEffectiveness,
  increaseCrewMood,
} from '../crew'

describe('crew utils', () => {
  it('getMedicineEffectiveness caps at 100 and floors values', () => {
    expect(getMedicineEffectiveness(5, 95, 10)).toBe(100)
    expect(getMedicineEffectiveness(3, 50, 4)).toBe(63)
  })

  it('getGoldEffectiveness adds gold per crew and floors', () => {
    expect(getGoldEffectiveness(5, 90, 25)).toBe(95)
  })

  it('getMannedCannons returns cannons when crew/2 greater than cannons, else half crew floor', () => {
    expect(getMannedCannons(10 as any, 4 as any)).toBe(4)
    expect(getMannedCannons(3 as any, 5 as any)).toBe(1)
  })

  it('decreaseCrewHealth clamps at zero', () => {
    expect(decreaseCrewHealth(10 as any, 20)).toBe(0)
    expect(decreaseCrewHealth(50 as any, 10)).toBe(40)
  })

  it('increaseCrewMood caps at 100', () => {
    expect(increaseCrewMood(98 as any, 5)).toBe(100)
    expect(increaseCrewMood(10 as any, 5)).toBe(15)
  })
})
