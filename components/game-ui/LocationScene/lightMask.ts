import type { DustSource, Fire } from "@/utils/location"

// Almost all building pictures are this size, the light mask is made from it at
// half size and the shader reads it by position, so a picture a pixel off does
// not matter
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

// Dust comes from the openings and spreads outwards, thinning as it goes
const addDust = (context: CanvasRenderingContext2D, sources: DustSource[]) => {
  context.fillStyle = "#00f"
  context.strokeStyle = "#00f"
  context.lineJoin = "round"

  for (const { grow, blur, strength } of DUST_SPREAD) {
    // The filter works in pixels of the half size mask, not of the picture
    context.filter = blur ? `blur(${blur / 2}px)` : "none"
    context.globalAlpha = strength
    context.lineWidth = grow * 2
    context.beginPath()

    for (const source of sources) {
      for (let i = 0; i < source.length; i += 2) {
        if (i === 0) {
          context.moveTo(source[i], source[i + 1])
        } else {
          context.lineTo(source[i], source[i + 1])
        }
      }

      context.closePath()
    }

    context.fill()

    // The edge grows outwards by half the line width
    if (grow) {
      context.stroke()
    }
  }

  context.filter = "none"
  context.globalAlpha = 1
}

// The light mask of a building from its fires and dust sources, in the same
// channels as the light pictures in public/img/location-light-masks. Green is
// the glow round a fire and red its flame, where the shader brightens what the
// picture shows. Blue is where dust floats. Opaque, because the shader reads
// the colours.
export const makeLightMaskUrl = (fires: Fire[], dust: DustSource[]) => {
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

  return new Promise<string>((resolve) => {
    canvas.toBlob((blob) => resolve(URL.createObjectURL(blob!)))
  })
}
