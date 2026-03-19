import { describe, expect, it, vi } from 'vitest'

import { TOWNS } from '@/constants/locations'
import { createTreasure } from '@/utils/createTreasure'
import { getRandomInt } from '@/utils/random'

vi.mock('@/utils/random', () => ({ getRandomInt: vi.fn() }))

describe('createTreasure', () => {
  it('creates treasure with deterministic selection when random is mocked', () => {
    const uuidSpy = vi.spyOn(globalThis.crypto, 'randomUUID').mockReturnValue('test-uuid')

    ;(getRandomInt as any).mockImplementationOnce(() => 0).mockImplementationOnce(() => 0)

    const treasure = createTreasure()
    expect(treasure.id).toBe('test-uuid')
    expect(typeof treasure.name).toBe('string')
    expect(Object.keys(TOWNS)).toContain(treasure.rewarder)

    uuidSpy.mockRestore()
  })
})
