import type { AmbienceArrays } from "./ambienceRenderer"
import { GULL_SHEET } from "./gullSprites"

// The seagulls of a scene. Their flight is worked out here, once for each
// frame, and reaches the shader as a uniform list, so the GPU only has to look
// up the sprite where a gull is. Everything is a share of the area they fly
// over, which is the picture of a harbour or a building.
type GullFlock = {
  count: number
  // How far down the area they fly, as a share of its height
  spread: number
}

// The harbour is seen in one go, so a few gulls are enough there
export const HARBOUR_GULLS: GullFlock = { count: 5, spread: 0.3 }

// A building only shows the sky through its windows
export const BUILDING_GULLS: GullFlock = { count: 12, spread: 0.75 }

// How far past the edge a gull goes before it comes back in
const MARGIN = 0.05

const fract = (value: number) => value - Math.floor(value)

// The same hash as the shaders
const hash = (n: number) => fract(Math.sin(n * 127.1) * 43758.5453)

const smoothstep = (from: number, to: number, value: number) => {
  const t = Math.min(Math.max((value - from) / (to - from), 0), 1)

  return t * t * (3 - 2 * t)
}

// Each gull is x, y, size and wing position. Position is the middle of the
// gull and size scales its pixels, the wing position is a column of the sheet.
export const getGullArrays = (
  time: number,
  { count, spread }: GullFlock
): AmbienceArrays => {
  const values = new Array<number>(count * 4)
  const span = 1 + MARGIN * 2

  for (let i = 0; i < count; i++) {
    const speed = 0.02 + 0.015 * hash(i + 1)
    const along = ((time * speed + hash(i + 7) * span) % span) - MARGIN
    // Half of them fly the other way
    const x = hash(i + 11) > 0.5 ? along : 1 - along
    const y = 0.06 + spread * hash(i + 5) + Math.sin(time * 0.4 + i * 2) * 0.012

    // A few wing beats, then a glide with the wings held up
    const beat = Math.sin(time * (7 + 2 * hash(i + 13)) + i * 3)
    const glide = smoothstep(0.2, 0.7, Math.sin(time * 0.5 + i * 1.7))
    const flap = beat + (0.7 - beat) * glide
    const frame = Math.round(((flap + 1) / 2) * (GULL_SHEET.frames - 1))

    values.splice(i * 4, 4, x, y, 0.8 + 0.4 * hash(i + 3), frame)
  }

  return { u_gull: { size: 4, values } }
}
