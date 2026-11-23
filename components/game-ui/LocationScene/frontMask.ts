import { useEffect, useState, useSyncExternalStore } from "react"

import { TOWN_MAP_DESKTOP_MEDIA, type TownMap } from "@/constants/townMaps"

// [x start, y start, x end, y end]
type Box = number[]
// [x, y, x, y, ...], at least three corners
type Shape = number[]

// What people walk behind on a harbour street, drawn from the boxes and shapes
// in constants/harbor/front.json, exactly as given. Alpha marks the
// object, red and green hold the height where it meets the ground in 1/16
// pixels, so somebody whose feet are further back than that is hidden by it. The
// ground is the bottom of a box and the lowest corner of a shape.
export const drawFrontMask = (
  width: number,
  height: number,
  boxes: Box[],
  shapes: Shape[]
) => {
  const data = new Uint8ClampedArray(width * height * 4)

  const fill = (x0: number, x1: number, y: number, base: number) => {
    const feet = Math.round(base * 16)

    for (let x = Math.max(0, x0); x < Math.min(width, x1); x++) {
      const i = (y * width + x) * 4

      // Where objects overlap the one that hides the most wins
      if (data[i + 3] && (data[i] << 8) + data[i + 1] >= feet) {
        continue
      }

      data[i] = feet >> 8
      data[i + 1] = feet & 255
      data[i + 3] = 255
    }
  }

  for (const [x0, y0, x1, y1] of boxes) {
    for (let y = Math.max(0, y0); y < Math.min(height, y1); y++) {
      fill(Math.round(x0), Math.round(x1), y, y1)
    }
  }

  for (const shape of shapes) {
    const xs = shape.filter((_, i) => i % 2 === 0)
    const ys = shape.filter((_, i) => i % 2 === 1)
    const base = Math.max(...ys)

    // Pixel centres against the edges, the same way for every row
    for (
      let y = Math.max(0, Math.floor(Math.min(...ys)));
      y < Math.min(height, Math.ceil(base));
      y++
    ) {
      const crossings: number[] = []

      xs.forEach((x, i) => {
        const next = (i + 1) % xs.length
        const [ya, yb] = [ys[i], ys[next]]

        if (y + 0.5 >= Math.min(ya, yb) && y + 0.5 < Math.max(ya, yb)) {
          crossings.push(x + ((y + 0.5 - ya) / (yb - ya)) * (xs[next] - x))
        }
      })

      crossings.sort((a, b) => a - b)

      for (let k = 0; k + 1 < crossings.length; k += 2) {
        fill(Math.round(crossings[k]), Math.round(crossings[k + 1]), y, base)
      }
    }
  }

  return new ImageData(data, width, height)
}

// The mask as a picture the renderer can load, the caller frees it
export const makeFrontMaskUrl = (
  width: number,
  height: number,
  boxes: Box[],
  shapes: Shape[]
) =>
  new Promise<string>((resolve) => {
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    canvas
      .getContext("2d")!
      .putImageData(drawFrontMask(width, height, boxes, shapes), 0, 0)
    canvas.toBlob((blob) => resolve(URL.createObjectURL(blob!)))
  })

// Room round the water mask, so the feathering has something to blur into
const WATER_PADDING = 4
const WATER_FEATHER = 1

// The water the shader ripples, drawn from the polygons in
// constants/harbor/water.json at half the size of the picture, like the other
// masks. Polygons inside polygons are holes. Without polygons there is no
// water.
export const makeWaterMaskUrl = (
  width: number,
  height: number,
  polygons: Shape[]
) => {
  const [halfWidth, halfHeight] = [
    Math.round(width / 2),
    Math.round(height / 2),
  ]
  const padded = document.createElement("canvas")
  padded.width = halfWidth + WATER_PADDING * 2
  padded.height = halfHeight + WATER_PADDING * 2

  const context = padded.getContext("2d")!
  context.translate(WATER_PADDING, WATER_PADDING)
  context.scale(0.5, 0.5)
  context.filter = `blur(${WATER_FEATHER}px)`
  context.beginPath()

  // Water that reaches the edge of the picture carries on past it, so the edge
  // is not feathered
  const extend = (value: number, max: number) =>
    value <= 0
      ? -WATER_PADDING * 2
      : value >= max
        ? max + WATER_PADDING * 2
        : value

  for (const polygon of polygons) {
    for (let i = 0; i < polygon.length; i += 2) {
      const x = extend(polygon[i], width)
      const y = extend(polygon[i + 1], height)

      if (i === 0) {
        context.moveTo(x, y)
      } else {
        context.lineTo(x, y)
      }
    }

    context.closePath()
  }

  context.fill("evenodd")

  const canvas = document.createElement("canvas")
  canvas.width = halfWidth
  canvas.height = halfHeight
  canvas.getContext("2d")!.drawImage(padded, -WATER_PADDING, -WATER_PADDING)

  return new Promise<string>((resolve) => {
    canvas.toBlob((blob) => resolve(URL.createObjectURL(blob!)))
  })
}

const subscribe = (onChange: () => void) => {
  const query = window.matchMedia(TOWN_MAP_DESKTOP_MEDIA)
  query.addEventListener("change", onChange)

  return () => query.removeEventListener("change", onChange)
}

const getIsDesktop = () => window.matchMedia(TOWN_MAP_DESKTOP_MEDIA).matches

// The front and water masks of the picture that is shown, made in the browser.
// Only that picture, the other is made when the screen switches. Undefined
// until they are ready.
export const useFrontMask = ({ desktop, mobile }: TownMap) => {
  const isDesktop = useSyncExternalStore(subscribe, getIsDesktop, () => true)
  const { src, width, height, things, shapes, water } = isDesktop
    ? desktop
    : mobile
  const [made, setMade] = useState<{
    src: string
    front: string
    water: string
  }>()

  useEffect(() => {
    let isCancelled = false
    let urls: string[] = []

    Promise.all([
      makeFrontMaskUrl(width, height, things, shapes),
      makeWaterMaskUrl(width, height, water),
    ]).then(([front, waterUrl]) => {
      urls = [front, waterUrl]

      if (!isCancelled) {
        setMade({ src, front, water: waterUrl })
      }
    })

    return () => {
      isCancelled = true

      // Kept a moment, the renderer may still be loading them
      setTimeout(() => urls.forEach((url) => URL.revokeObjectURL(url)), 5000)
    }
  }, [src, width, height, things, shapes, water])

  return made?.src === src ? made : undefined
}
