import { describe, expect, it, vi } from 'vitest'

vi.mock('../random', () => ({ getRandomInt: vi.fn() }))

import {TOWNS } from '@/constants/locations'

import {
  getAllSeaLocationBackgrounds,
  getAllTownLocationBackgrounds,
  getLocationBackground,
  getRandomTown,
  getTownsNationality,
} from '../location'
import { getRandomInt } from '../random'

describe('location utils', () => {
  it('getTownsNationality returns nation for known town and undefined for falsy', () => {
    expect(getTownsNationality('Charles Towne' as any)).toBe('England')
    expect(getTownsNationality(undefined)).toBeUndefined()
  })

  it('getRandomTown returns a town that belongs to the requested nation', () => {
    const town = getRandomTown('England')
    expect(TOWNS[town].nation).toBe('England')
  })

  it('getLocationBackground returns ship-meeting image when shipMeeting provided', () => {
    ;(getRandomInt as any).mockReturnValue(5)
    const path = getLocationBackground('Charles Towne' as any, 'Sea' as any, { cannons: 2 } as any)
    expect(path).toContain('/img/location/ship-meeting/ship-meeting5.webp')
  })

  it('getLocationBackground returns sea image when location is Sea and no shipMeeting', () => {
    ;(getRandomInt as any).mockReturnValue(7)
    const path = getLocationBackground('Charles Towne' as any, 'Sea' as any, null)
    expect(path).toContain('/img/location/sea/sea7.webp')
  })

  it('getLocationBackground returns town image for non-sea locations', () => {
    const path = getLocationBackground('Charles Towne' as any, 'Shop' as any)
    expect(path).toBe('/img/location/charles-towne/shop.webp')
  })

  it('getAllTownLocationBackgrounds contains town-specific images and excludes Sea', () => {
    const images = getAllTownLocationBackgrounds('Charles Towne' as any)
    expect(images.length).toBeGreaterThan(0)
    expect(images).toContain('/img/location/charles-towne/shop.webp')
    // ensure none of the images include '/img/location/sea'
    expect(images.some((p) => p.includes('/img/location/sea'))).toBe(false)
  })

  it('getAllSeaLocationBackgrounds returns 37 images (21 sea + 16 ship-meeting)', () => {
    const images = getAllSeaLocationBackgrounds()
    expect(images.length).toBe(37)
    expect(images[0]).toBe('/img/location/sea/sea1.webp')
    expect(images[20]).toBe('/img/location/sea/sea21.webp')
    expect(images[21]).toBe('/img/location/ship-meeting/ship-meeting1.webp')
  })
})
