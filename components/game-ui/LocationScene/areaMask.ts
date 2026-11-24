// [x, y, x, y, ...], at least three corners
type Shape = number[]

type AreaOptions = {
  // Picture pixels the area grows past its polygons
  bleed: number
  // Blur in pixels of the half size mask
  feather: number
}

const WATER_AREA: AreaOptions = { bleed: 0, feather: 1 }

// The masks of a building are not blurred, their edge is softened by the
// texture filtering, and they are made for every building that is entered
export const BUILDING_AREA: AreaOptions = { bleed: 0, feather: 0 }

// The sky is drawn by hand and never exact, so the darkness of a gloomy day
// uses a copy that grows a little past it and fades, instead of shining
// through trees and round mountains. The clouds use the sharp sky.
export const GLOOM_AREA: AreaOptions = { bleed: 6, feather: 3 }

// The water the shader ripples or the sky it draws clouds in, drawn from the
// polygons in constants/harbor/water.json or sky.json (or the ones of a
// building in constants/buildings/areas) at half the size of the picture, like
// the other masks. Polygons inside polygons are holes. Without polygons there
// is nothing. A canvas can be a texture as it is, which saves encoding it to a
// picture and decoding that again.
export const drawAreaMask = (
  width: number,
  height: number,
  polygons: Shape[],
  { bleed, feather }: AreaOptions = WATER_AREA
) => {
  // Room round the mask, so the feathering has something to blur into
  const padding = Math.max(4, feather * 3)
  const [halfWidth, halfHeight] = [
    Math.round(width / 2),
    Math.round(height / 2),
  ]
  const padded = document.createElement("canvas")
  padded.width = halfWidth + padding * 2
  padded.height = halfHeight + padding * 2

  const context = padded.getContext("2d")!
  context.translate(padding, padding)
  context.scale(0.5, 0.5)
  // A blur over the whole canvas is the slowest part, without feather there is
  // none and the texture filtering softens the edge
  if (feather) {
    context.filter = `blur(${feather}px)`
  }

  context.beginPath()

  // Water that reaches the edge of the picture carries on past it, so the edge
  // is not feathered
  const extend = (value: number, max: number) =>
    value <= 0 ? -padding * 2 : value >= max ? max + padding * 2 : value

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

  if (bleed > 0) {
    context.lineWidth = bleed * 2
    context.lineJoin = "round"
    context.stroke()
  }

  const canvas = document.createElement("canvas")
  canvas.width = halfWidth
  canvas.height = halfHeight
  canvas.getContext("2d")!.drawImage(padded, -padding, -padding)

  return canvas
}

// The same as a picture, for what shows it as an image or a CSS mask
export const makeAreaMaskUrl = (
  width: number,
  height: number,
  polygons: Shape[],
  options?: AreaOptions
) =>
  new Promise<string>((resolve) => {
    drawAreaMask(width, height, polygons, options).toBlob((blob) =>
      resolve(URL.createObjectURL(blob!))
    )
  })
