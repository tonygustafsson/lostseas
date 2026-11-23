import type { AmbienceArrays } from "./ambienceRenderer"
import { WALKER_ANCHOR, WALKER_ROWS, WALKER_SHEET } from "./walkSprites"
import type { Lane } from "./walkUniforms"
import { MAX_LEVELS } from "./walkUniforms"

// Rats first and people last, they are drawn in this order
export const RATS = 2
export const CATS = 2
export const WALKERS = 8
export const WALKER_COUNT = RATS + CATS + WALKERS

const WALK_SLOT = 110
const CAT_SLOT = 55
const RAT_SLOT = 40

// Picture pixels in a sprite pixel of a person on the reference level, speeds
// and distances were tuned there and scale with the level's size
const REFERENCE_SIZE = 2.26

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max)
const mix = (a: number, b: number, t: number) => a + (b - a) * t
const fract = (x: number) => x - Math.floor(x)

const hash = (n: number) => fract(Math.sin(n * 127.1) * 43758.5453)

// A random number for every walk, so nobody repeats
const walkRandom = (slot: number, k: number) =>
  hash(slot * 13.37 + k * 71.13 + 3)

// Four poses to a double step, 0 and 2 are the strides and 1 has the feet together
const stride = (travelled: number, length: number) => {
  const step = Math.floor(travelled / length) % 4

  return step === 0 ? 0 : step === 2 ? 2 : 1
}

type Level = {
  start: number
  end: number
  feet: number
  half: number
  size: number
}

// One sprite to draw: where its feet are, how big its pixels are, which way it
// faces, which cell of the sheet and how visible it is
type Walker = {
  x: number
  y: number
  size: number
  facing: number
  column: number
  row: number
  alpha: number
  anchor: number
}

const HIDDEN: Walker = {
  x: 0,
  y: 0,
  size: 1,
  facing: 1,
  column: 0,
  row: 0,
  alpha: 0,
  anchor: 0,
}

// Streets stop a little short of their ends
const isOnLane = (level: Level, x: number) =>
  x >= level.start + 2 && x <= level.end - 2

// How many of the town's people are about, from everybody on a fine day down to
// a few in the rain. All or nothing, a soft edge would leave walks whose number
// is close to the weather's half see-through.
const isOut = (slot: number, activity: number) =>
  activity >= walkRandom(slot, 13)

const pickLevel = (levels: Level[], slot: number) =>
  levels[Math.floor(walkRandom(slot, 12) * levels.length)]

const getPerson = (
  time: number,
  index: number,
  levels: Level[],
  activity: number
): Walker => {
  // Each walker runs on its own clock, so they set off at different moments
  const clock = time + index * 17
  const cycle = Math.floor(clock / WALK_SLOT)
  const local = clock - cycle * WALK_SLOT
  const slot = cycle + index * 97
  const level = pickLevel(levels, slot)
  const { size } = level
  const direction = walkRandom(slot, 1) > 0.5 ? 1 : -1
  // A stroll, about 1.2 metres a second for a person this tall
  const speed = mix(26, 38, walkRandom(slot, 2)) * (size / REFERENCE_SIZE)
  const delay = walkRandom(slot, 3) * 12
  const turnsBack = walkRandom(slot, 5) > 0.55
  const lane = level.end - level.start
  const reach = mix(0.25, 0.5, walkRandom(slot, 7)) * lane
  const pathLength = turnsBack ? 2 * reach : lane
  const walkTime = pathLength / speed

  // Stops once or twice for a good while, to look around or talk
  const stopAt = mix(0.1, 0.45, walkRandom(slot, 4)) * walkTime
  const stopFor = mix(3, 9, walkRandom(slot, 6))
  const laterAt = mix(0.55, 0.9, walkRandom(slot, 9)) * walkTime + stopFor
  const laterFor =
    walkRandom(slot, 10) > 0.45 ? mix(3, 8, walkRandom(slot, 11)) : 0
  const elapsed = local - delay
  const held = clamp(elapsed - stopAt, 0, stopFor)
  const heldLater = clamp(elapsed - laterAt, 0, laterFor)
  const travelled = speed * (elapsed - held - heldLater)

  if (elapsed < 0 || travelled > pathLength) {
    return HIDDEN
  }

  const returning = turnsBack && travelled > reach
  const along = returning ? 2 * reach - travelled : travelled
  const x = (direction > 0 ? level.start : level.end) + direction * along

  if (!isOnLane(level, x)) {
    return HIDDEN
  }

  const paused =
    (held > 0 && held < stopFor) || (heldLater > 0 && heldLater < laterFor)
  const frame = paused ? 1 : stride(travelled, 4.1 * size)
  // Fades in and out at the ends of the lane
  const fade =
    clamp(elapsed / 0.6) * clamp((pathLength - travelled) / (speed * 0.6))

  return {
    x,
    y: level.feet + (walkRandom(slot, 8) * 2 - 1) * level.half,
    size,
    facing: returning ? -direction : direction,
    column: frame,
    row:
      WALKER_ROWS.person +
      Math.floor(walkRandom(slot, 14) * WALKER_SHEET.looks),
    alpha: fade * Number(isOut(slot, activity)),
    anchor: WALKER_ANCHOR.person,
  }
}

// A cat turns up somewhere on a lane, sits for a while, wanders a short way and
// sits down again until it is time to move on. Cat 0 is a ginger tabby and
// cat 1 a black cat.
const getCat = (
  time: number,
  index: number,
  levels: Level[],
  activity: number
): Walker => {
  const clock = time + index * 23
  const cycle = Math.floor(clock / CAT_SLOT)
  const local = clock - cycle * CAT_SLOT
  const slot = cycle + 211 + index * 131
  const level = pickLevel(levels, slot)
  const scale = level.size / REFERENCE_SIZE
  const direction = walkRandom(slot, 1) > 0.5 ? 1 : -1
  const speed = mix(22, 42, walkRandom(slot, 2)) * scale
  const startX = mix(level.start + 150, level.end - 150, walkRandom(slot, 3))
  const distance = mix(120, 520, walkRandom(slot, 4)) * scale
  const sitFor = mix(3, 10, walkRandom(slot, 5))

  const travelled = clamp((local - sitFor) * speed, 0, distance)
  const walking = local > sitFor && travelled < distance
  const x = clamp(
    startX + direction * travelled,
    level.start + 20,
    level.end - 20
  )

  if (!isOnLane(level, x)) {
    return HIDDEN
  }

  // Slightly finer pixels than a person, a cat is smaller
  const size = level.size * 0.9
  const fade = clamp(local / 0.8) * clamp((CAT_SLOT - local) / 0.8)

  return {
    x,
    y: level.feet + (walkRandom(slot, 8) * 2 - 1) * level.half,
    size,
    facing: direction,
    column: walking ? stride(travelled, 5 * size) : 3,
    row: WALKER_ROWS.cat + index,
    alpha: fade * Number(isOut(slot, activity)),
    anchor: WALKER_ANCHOR.cat,
  }
}

// A rat freezes, then darts a short way along the foot of the wall, freezes
// again, and so on, four times in a row.
const getRat = (
  time: number,
  index: number,
  levels: Level[],
  activity: number
): Walker => {
  const clock = time + index * 11
  const cycle = Math.floor(clock / RAT_SLOT)
  const local = clock - cycle * RAT_SLOT
  const slot = cycle + 1001 + index * 113
  const level = pickLevel(levels, slot)
  const scale = level.size / REFERENCE_SIZE
  let x = mix(level.start + 100, level.end - 100, walkRandom(slot, 3))
  let facing = walkRandom(slot, 4) > 0.5 ? 1 : -1
  let moving = false
  let travelled = 0

  for (let k = 0; k < 4; k++) {
    const startAt = k * 9 + walkRandom(slot, 20 + k) * 3
    const dash = mix(40, 170, walkRandom(slot, 30 + k)) * scale
    const direction = walkRandom(slot, 40 + k) > 0.5 ? 1 : -1
    const speed = mix(90, 140, walkRandom(slot, 50 + k)) * scale
    const moved = clamp((local - startAt) * speed, 0, dash)

    x += direction * moved

    if (local > startAt) {
      facing = direction
      moving = moved < dash
      travelled = moved
    }
  }

  x = clamp(x, level.start + 20, level.end - 20)

  if (!isOnLane(level, x)) {
    return HIDDEN
  }

  const size = level.size * 0.6
  const fade = clamp(local / 0.8) * clamp((RAT_SLOT - local) / 0.8)

  return {
    x,
    // Along the foot of the wall, at the near edge of the lane
    y: level.feet + level.half * 0.9,
    size,
    facing,
    column: moving ? stride(travelled, 3 * size) : 3,
    row: WALKER_ROWS.rat,
    alpha: fade * Number(isOut(slot, activity)),
    anchor: WALKER_ANCHOR.rat,
  }
}

// The people, cats and rats of a harbour at a moment in seconds. Activity runs
// from 0 to 1, how many are out in this weather.
export const getWalkers = (
  time: number,
  lanes: Lane[],
  activity: number
): Walker[] => {
  const levels = lanes
    .slice(0, MAX_LEVELS)
    .map(([start, end, feet, half, size]) => ({
      start,
      end,
      feet,
      half,
      size,
    }))

  if (!levels.length) {
    return Array.from({ length: WALKER_COUNT }, () => HIDDEN)
  }

  return [
    ...Array.from({ length: RATS }, (_, i) =>
      getRat(time, i, levels, activity)
    ),
    ...Array.from({ length: CATS }, (_, i) =>
      getCat(time, i, levels, activity)
    ),
    ...Array.from({ length: WALKERS }, (_, i) =>
      getPerson(time, i, levels, activity)
    ),
  ]
}

// The same as uniform arrays for the shader, see walkerLayer there
export const getWalkerArrays = (
  time: number,
  lanes: Lane[],
  activity: number
): AmbienceArrays => {
  const walkers = getWalkers(time, lanes, activity)

  return {
    u_walkA: {
      size: 4,
      values: walkers.flatMap((w) => [w.x, w.y, w.size, w.facing]),
    },
    u_walkB: {
      size: 4,
      values: walkers.flatMap((w) => [w.column, w.row, w.alpha, w.anchor]),
    },
  }
}
