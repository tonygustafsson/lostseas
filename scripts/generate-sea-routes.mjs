// Precalculates sea routes between all towns from the water mask.
// Run with: npm run generate:sea-routes
import { readFileSync, writeFileSync } from "node:fs"
import { inflateSync } from "node:zlib"

import { TOWNS } from "../constants/locations.ts"
import { buildWaterGrid, computeSeaRoute } from "../utils/seaPath.ts"

const MASK_PATH = "public/img/map/spanish-main-mask.png"
const OUTPUT_PATH = "constants/seaRoutes.json"
const CELL_SIZE = 3
const COAST_MARGIN = 2
const TOWN_ICON_SIZE = 20

// Minimal decoder for 8-bit, non-interlaced RGBA PNGs
const decodePng = (buffer) => {
  let offset = 8
  let width = 0
  let height = 0
  const idat = []

  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset)
    const type = buffer.toString("ascii", offset + 4, offset + 8)
    const data = buffer.subarray(offset + 8, offset + 8 + length)

    if (type === "IHDR") {
      width = data.readUInt32BE(0)
      height = data.readUInt32BE(4)

      if (data[8] !== 8 || data[9] !== 6 || data[12] !== 0) {
        throw new Error("Mask must be an 8-bit, non-interlaced RGBA PNG")
      }
    }

    if (type === "IDAT") idat.push(data)
    if (type === "IEND") break

    offset += length + 12
  }

  const raw = inflateSync(Buffer.concat(idat))
  const bpp = 4
  const stride = width * bpp
  const pixels = new Uint8Array(width * height * bpp)

  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)]
    const row = y * (stride + 1) + 1

    for (let x = 0; x < stride; x++) {
      const value = raw[row + x]
      const left = x >= bpp ? pixels[y * stride + x - bpp] : 0
      const up = y > 0 ? pixels[(y - 1) * stride + x] : 0
      const upLeft = x >= bpp && y > 0 ? pixels[(y - 1) * stride + x - bpp] : 0

      let predictor = 0
      if (filter === 1) predictor = left
      if (filter === 2) predictor = up
      if (filter === 3) predictor = (left + up) >> 1
      if (filter === 4) {
        const p = left + up - upLeft
        const pa = Math.abs(p - left)
        const pb = Math.abs(p - up)
        const pc = Math.abs(p - upLeft)
        predictor = pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft
      }

      pixels[y * stride + x] = (value + predictor) & 0xff
    }
  }

  return { width, height, pixels }
}

const { width, height, pixels } = decodePng(readFileSync(MASK_PATH))

const grids = {
  safe: buildWaterGrid(pixels, width, height, CELL_SIZE, COAST_MARGIN),
  raw: buildWaterGrid(pixels, width, height, CELL_SIZE),
}

const towns = Object.keys(TOWNS)
const routes = {}

for (let i = 0; i < towns.length; i++) {
  for (let j = i + 1; j < towns.length; j++) {
    const from = TOWNS[towns[i]].map
    const to = TOWNS[towns[j]].map

    const route = computeSeaRoute(
      grids,
      { x: from.x + TOWN_ICON_SIZE / 2, y: from.y + TOWN_ICON_SIZE / 2 },
      { x: to.x + TOWN_ICON_SIZE / 2, y: to.y + TOWN_ICON_SIZE / 2 }
    )

    if (!route) {
      throw new Error(`No sea route between ${towns[i]} and ${towns[j]}`)
    }

    routes[`${towns[i]}|${towns[j]}`] = route.flatMap(({ x, y }) => [
      Math.round(x * 10) / 10,
      Math.round(y * 10) / 10,
    ])
  }
}

writeFileSync(OUTPUT_PATH, `${JSON.stringify(routes)}\n`)

console.log(`Wrote ${Object.keys(routes).length} routes to ${OUTPUT_PATH}`)
