/**
 * Small seeded random generator (mulberry32) so random game play is replayable.
 * The same seed always produces the same sequence.
 */
export const createSeededRandom = (seed: number) => {
  let state = seed >>> 0

  const next = () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  const int = (min: number, max: number) =>
    Math.floor(next() * (max - min + 1)) + min

  const pick = <T>(items: readonly T[]) => items[int(0, items.length - 1)]

  return { next, int, pick }
}
