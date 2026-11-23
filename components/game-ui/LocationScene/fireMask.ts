import type { Fire } from "@/utils/location"

// Almost all building pictures are this size, the light mask is made from it at
// half size and the shader reads it by position, so a picture a pixel off does
// not matter
export const BUILDING_WIDTH = 1605
export const BUILDING_HEIGHT = 980

// The flame brightening only reaches the middle of a fire
const FLAME_SIZE = 0.4

const STEPS = 10

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

// The light mask of a building from its fires, in the same channels as the
// light pictures in public/img/location-light-masks. Green is the glow round
// a fire and red its flame, where the shader brightens what the picture shows.
// There is no blue, so no dust. Opaque, because the shader reads the colours.
export const makeFireMaskUrl = (fires: Fire[]) => {
  const canvas = document.createElement("canvas")
  canvas.width = Math.round(BUILDING_WIDTH / 2)
  canvas.height = Math.round(BUILDING_HEIGHT / 2)

  const context = canvas.getContext("2d")!
  context.fillStyle = "#000"
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.scale(0.5, 0.5)

  // Overlapping fires add up
  context.globalCompositeOperation = "lighter"

  for (const fire of fires) {
    addGlow(context, fire, "green")
    addGlow(context, [fire[0], fire[1], fire[2] * FLAME_SIZE], "red")
  }

  return new Promise<string>((resolve) => {
    canvas.toBlob((blob) => resolve(URL.createObjectURL(blob!)))
  })
}
