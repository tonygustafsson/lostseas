// Draws the seagulls into public/img/town-gulls.png, one wing position in each
// column from the wings down (left) to the wings up (right). The layout must
// match components/game-ui/LocationScene/gullSprites.ts.
//
// npm run generate:gull-sprites

import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

import { encodePng } from "../lib/png.mjs"

const CELL_W = 21
const CELL_H = 13
const FRAMES = 5
// The column of the body, wings reach 10 pixels to each side
const MIDDLE = 10
const BODY_ROW = 6
const REACH = 10
// How far the wing tips move up or down from the body
const FLAP_ROWS = 5

const OUTPUT = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../public/img/town-gulls.png"
)

const WHITE = [0.98, 0.98, 0.98, 1]
const BELLY = [0.88, 0.89, 0.93, 1]
const WING = [0.86, 0.88, 0.92, 1]
const FEATHER = [0.55, 0.57, 0.64, 1]
// Dark tips, like a real gull's, which also show against white clouds
const TIP = [0.16, 0.16, 0.19, 1]
// Keeps a gull readable against a cloud or a white wall
const OUTLINE = [0.2, 0.22, 0.28, 0.65]

const sheetWidth = FRAMES * CELL_W
const pixels = Buffer.alloc(sheetWidth * CELL_H * 4)

// A gull seen from the front, wings from the body out to the tips. Flap runs
// from -1 (wings down) to 1 (wings up), and the tips move most.
const gull = (flap) => {
  const cells = new Map()
  const set = (col, row, colour) => {
    if (row >= 0 && row < CELL_H) {
      cells.set(`${col},${row}`, colour)
    }
  }

  for (let reach = 1; reach <= REACH; reach++) {
    // The wing bends up at the elbow, so the tips lag behind
    const row = BODY_ROW - Math.round(flap * FLAP_ROWS * (reach / REACH) ** 1.3)
    const colour =
      reach >= REACH - 1 ? TIP : reach >= REACH - 3 ? FEATHER : WING

    // A wing is a little broader near the body and one pixel thin further out
    for (const side of [-1, 1]) {
      set(MIDDLE + side * reach, row, colour)

      if (reach <= 2) {
        set(MIDDLE + side * reach, row + 1, WING)
      }
    }
  }

  // A slim body three pixels wide for two rows, with a narrow head on top
  for (let col = -1; col <= 1; col++) {
    set(MIDDLE + col, BODY_ROW, WHITE)
    set(MIDDLE + col, BODY_ROW + 1, BELLY)
  }

  set(MIDDLE, BODY_ROW + 2, BELLY)
  set(MIDDLE, BODY_ROW - 1, WHITE)
  set(MIDDLE, BODY_ROW - 2, WHITE)

  return cells
}

const put = (x, y, [r, g, b, a]) => {
  const at = (y * sheetWidth + x) * 4
  const byte = (v) => Math.round(Math.min(Math.max(v, 0), 1) * 255)

  pixels[at] = byte(r)
  pixels[at + 1] = byte(g)
  pixels[at + 2] = byte(b)
  pixels[at + 3] = byte(a)
}

for (let frame = 0; frame < FRAMES; frame++) {
  const cells = gull((frame / (FRAMES - 1)) * 2 - 1)

  for (let row = 0; row < CELL_H; row++) {
    for (let col = 0; col < CELL_W; col++) {
      const here = cells.get(`${col},${row}`)
      const x = frame * CELL_W + col

      if (here) {
        put(x, row, here)
      } else if (
        [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ].some(([dx, dy]) => cells.has(`${col + dx},${row + dy}`))
      ) {
        put(x, row, OUTLINE)
      }
    }
  }
}

mkdirSync(dirname(OUTPUT), { recursive: true })
writeFileSync(OUTPUT, encodePng(sheetWidth, CELL_H, pixels))
console.log(`Wrote ${OUTPUT} (${sheetWidth} x ${CELL_H})`)
