import type { BuildingAreas, Fire, Polygon } from "@/utils/location"

// Almost all building pictures are this size, the masks are made from it at
// half size and the shader reads them by position, so a picture a pixel off
// does not matter
export const BUILDING_WIDTH = 1605
export const BUILDING_HEIGHT = 980

// The flame brightening only reaches the middle of a fire
const FLAME_SIZE = 0.4

const STEPS = 10

// How far dust spreads from an opening, as picture pixels the opening grows
// and is softened by, and how strong the dust is that far out. Stacked, they
// make dust full in the opening and fading slowly into the room, where the
// light is dim.
const DUST_SPREAD = [
  { grow: 0, blur: 0, strength: 1 },
  { grow: 50, blur: 30, strength: 0.7 },
  { grow: 130, blur: 60, strength: 0.5 },
  { grow: 260, blur: 100, strength: 0.35 },
]

// Smaller bits of sky and water, between leaves or round a mast, are not
// openings dust comes from. In square picture pixels, picked so the dust of
// the old hand-drawn openings is matched.
const MIN_DUST_SOURCE = 300

const getArea = (polygon: Polygon) => {
  let area = 0

  for (let i = 0; i < polygon.length; i += 2) {
    const j = (i + 2) % polygon.length

    area += polygon[i] * polygon[j + 1] - polygon[j] * polygon[i + 1]
  }

  return Math.abs(area) / 2
}

// Dust comes in where outdoors can be seen, through the sky and the water of
// the windows and arches. Holes in them (window bars) have the same direction
// as their outline, so the non-zero fill in addDust fills them.
export const getDustSources = ({ sky, water }: BuildingAreas) =>
  [...sky, ...water].filter((polygon) => getArea(polygon) >= MIN_DUST_SOURCE)

// Light is strongest in the middle and fades smoothly to nothing at the edge
const addGlow = (
  context: CanvasRenderingContext2D,
  [x, y, radius]: Fire,
  channel: "green" | "red"
) => {
  const gradient = context.createRadialGradient(x, y, 0, x, y, radius)
  const rgb = channel === "green" ? "0, 255, 0" : "255, 0, 0"

  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS

    // The glow fades slower than the flame, so more of the circle is lit
    const fade = Math.cos((t * Math.PI) / 2) ** (channel === "green" ? 1 : 2)

    gradient.addColorStop(t, `rgba(${rgb}, ${fade})`)
  }

  context.fillStyle = gradient
  context.fillRect(x - radius, y - radius, radius * 2, radius * 2)
}

// Dust is soft, so it is drawn at a quarter of the picture and scaled up. Blurring
// is what takes the time and it takes a sixteenth as long on that.
const DUST_SCALE = 0.25

// Dust comes from the openings and spreads outwards, thinning as it goes. Drawn
// on a small canvas of its own, then added to the light mask.
const addDust = (context: CanvasRenderingContext2D, sources: Polygon[]) => {
  const canvas = document.createElement("canvas")
  canvas.width = Math.round(BUILDING_WIDTH * DUST_SCALE)
  canvas.height = Math.round(BUILDING_HEIGHT * DUST_SCALE)

  const dust = canvas.getContext("2d")!
  dust.scale(DUST_SCALE, DUST_SCALE)
  dust.fillStyle = "#00f"
  dust.strokeStyle = "#00f"
  dust.lineJoin = "round"
  // The copies add up
  dust.globalCompositeOperation = "lighter"

  for (const { grow, blur, strength } of DUST_SPREAD) {
    // The filter works in pixels of this small canvas, not of the picture
    dust.filter = blur ? `blur(${blur * DUST_SCALE}px)` : "none"
    dust.globalAlpha = strength
    dust.lineWidth = grow * 2
    dust.beginPath()

    for (const source of sources) {
      for (let i = 0; i < source.length; i += 2) {
        if (i === 0) {
          dust.moveTo(source[i], source[i + 1])
        } else {
          dust.lineTo(source[i], source[i + 1])
        }
      }

      dust.closePath()
    }

    // Non-zero, so the bars of a window do not leave holes
    dust.fill("nonzero")

    // The edge grows outwards by half the line width
    if (grow) {
      dust.stroke()
    }
  }

  context.drawImage(canvas, 0, 0, BUILDING_WIDTH, BUILDING_HEIGHT)
}

// The light mask of a building from its fires and dust sources. Green is the
// glow round a fire and red its flame, where the shader brightens what the
// picture shows. Blue is where dust floats. Opaque, because the shader reads
// the colours.
export const drawLightMask = (fires: Fire[], dust: Polygon[]) => {
  const canvas = document.createElement("canvas")
  canvas.width = Math.round(BUILDING_WIDTH / 2)
  canvas.height = Math.round(BUILDING_HEIGHT / 2)

  const context = canvas.getContext("2d")!
  context.fillStyle = "#000"
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.scale(0.5, 0.5)

  // Overlapping fires and dust add up
  context.globalCompositeOperation = "lighter"

  for (const fire of fires) {
    addGlow(context, fire, "green")
    addGlow(context, [fire[0], fire[1], fire[2] * FLAME_SIZE], "red")
  }

  if (dust.length) {
    addDust(context, dust)
  }

  return canvas
}
