// Draws the people, cats and rats of the harbours into public/img/town-walkers.png.
// The pixel art used to be GLSL in townMapShader.ts, which made the shader slow
// to build. The layout must match components/game-ui/LocationScene/walkSprites.ts.
//
// npm run generate:walker-sprites

import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

import { encodePng } from "../lib/png.mjs"

const CELL_W = 12
const CELL_H = 26
const COLUMNS = 4
const LOOKS = 12
const CATS = 2
const RATS = 1
const ROWS = LOOKS + CATS + RATS
const FEET_ROW = 23

const OUTPUT = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../public/img/town-walkers.png"
)

const fract = (x) => x - Math.floor(x)
const hash = (n) => fract(Math.sin(n * 127.1) * 43758.5453)
const mix = (a, b, t) => a.map((v, i) => v * (1 - t) + b[i] * t)
const scale = (c, f) => c.map((v) => v * f)

const DARK = [0.12, 0.1, 0.1]
const LINEN = [0.86, 0.82, 0.72]
const WIG = [0.82, 0.8, 0.78]

const COATS = [
  [0.45, 0.28, 0.2],
  [0.2, 0.27, 0.42],
  [0.55, 0.48, 0.34],
  [0.28, 0.38, 0.26],
  [0.5, 0.22, 0.2],
  [0.36, 0.34, 0.33],
]

// Twelve people, each coat once on a man and once on a woman. Skin, hat and
// hair come from the same hash the shader used.
const looks = Array.from({ length: LOOKS }, (_, i) => {
  const woman = i % 4 >= 2
  const tone = hash(i * 3.7 + 21)

  return {
    coat: COATS[i % 6],
    skin: mix([0.86, 0.66, 0.52], [0.45, 0.3, 0.2], tone * tone),
    woman,
    wig: !woman && (i === 1 || i === 5),
    hat: mix([0.13, 0.11, 0.1], [0.24, 0.2, 0.3], hash(i * 3.7 + 24)),
    hair: mix([0.25, 0.15, 0.08], [0.7, 0.55, 0.3], hash(i * 3.7 + 25)),
  }
})

// A person on a grid 7 wide and 21 tall with the head at the top. Frame 0 and
// 2 are the two strides, frame 1 has the feet together. Returns a colour or null.
const person = (look, col, row, frame) => {
  const { coat, skin, woman, wig, hat, hair } = look
  const r = row - 1

  if (r >= 1 && r <= 3) {
    if (col >= 2 && col <= 4) {
      return skin
    }

    if (col === 1 || col === 5) {
      if (wig) {
        return WIG
      }

      if (woman && r <= 2) {
        return hair
      }
    }
  }

  if (r === -1 && col >= 2 && col <= 4) {
    return woman ? LINEN : wig ? WIG : hat
  }

  if (r === 0) {
    if (woman && col >= 1 && col <= 5) {
      return LINEN
    }

    if (wig && col >= 1 && col <= 5) {
      return WIG
    }

    if (!woman && !wig) {
      return col === 0 || col === 6 ? scale(hat, 1.7) : hat
    }
  }

  if (r === 4 && col >= 1 && col <= 5) {
    return coat
  }

  const armLeft = frame > 1.5 ? 1 : 0
  const armRight = frame < 0.5 ? 1 : 0

  if (r >= 5 && r <= 9 && col >= 2 && col <= 4) {
    return r === 5 && woman ? LINEN : coat
  }

  if (col === 1) {
    if (r >= 5 && r <= 8 + armLeft) {
      return scale(coat, 0.85)
    }

    if (r === 9 + armLeft) {
      return skin
    }
  }

  if (col === 5) {
    if (r >= 5 && r <= 8 + armRight) {
      return coat
    }

    if (r === 9 + armRight) {
      return skin
    }
  }

  if (r === 9 && col >= 2 && col <= 4) {
    return woman ? LINEN : DARK
  }

  if (woman) {
    const flare = r >= 13 ? 1 : 0

    if (r >= 10 && r <= 18 && col >= 2 - flare && col <= 4 + flare) {
      return r >= 17 ? scale(coat, 0.7) : scale(coat, 0.9)
    }

    const shoes = frame < 0.5 ? 1 : frame > 1.5 ? 3 : 2

    if (r === 19 && (col === shoes || col === shoes + 2)) {
      return DARK
    }

    return null
  }

  if (r >= 10 && r <= 14) {
    const hem = r >= 13 ? 1 : 0

    if (col >= 2 - hem && col <= 4 + hem) {
      return scale(coat, col === 2 - hem || col === 4 + hem ? 0.8 : 1)
    }
  }

  const farLeg = frame < 0.5 ? 1 : frame > 1.5 ? 5 : 2
  const nearLeg = frame < 0.5 ? 5 : frame > 1.5 ? 1 : 4

  if (r >= 15 && r <= 18) {
    if (col === nearLeg) {
      return LINEN
    }

    if (col === farLeg) {
      return scale(LINEN, 0.72)
    }
  }

  if (r === 19) {
    if (col === nearLeg || col === nearLeg + 1) {
      return DARK
    }

    if (col === farLeg || col === farLeg + 1) {
      return scale(DARK, 1.4)
    }
  }

  return null
}

// A cat on a grid 10 wide and 6 tall. Frames 0 to 2 are strides, 3 is sitting
// up. Kind 0 is a ginger tabby, kind 1 is black with white socks and chest.
const cat = (kind, col, row, frame) => {
  const ginger = kind === 0
  const base = ginger ? [0.84, 0.52, 0.24] : [0.17, 0.17, 0.19]
  const stripe = ginger ? [0.6, 0.32, 0.13] : [0.26, 0.26, 0.29]
  const light = ginger ? [0.95, 0.84, 0.68] : [0.92, 0.92, 0.9]
  const striped = col % 2 === 0

  if (frame > 2.5) {
    if (row === 0 && (col === 6 || col === 8)) {
      return base
    }

    if (row >= 1 && row <= 2 && col >= 6 && col <= 8) {
      return row === 2 && col === 8 ? light : base
    }

    if (row >= 3 && row <= 4 && col >= 6 && col <= 7) {
      return ginger ? base : light
    }

    if (row === 3 && col >= 4 && col <= 5) {
      return striped ? stripe : base
    }

    if (row === 4 && col >= 3 && col <= 5) {
      return striped ? stripe : base
    }

    if (row === 5 && col >= 3 && col <= 6) {
      return scale(base, 0.9)
    }

    if (row === 5 && col >= 7 && col <= 8) {
      return light
    }

    if (row === 5 && col >= 0 && col <= 2) {
      return striped ? stripe : base
    }

    if (row === 4 && col === 0) {
      return base
    }

    return null
  }

  if (col === 0 && row >= 0 && row <= 2) {
    return row === 1 ? stripe : base
  }

  if (row === 0 && (col === 7 || col === 9)) {
    return base
  }

  if (row >= 1 && row <= 3 && col >= 7 && col <= 9) {
    return row === 3 && col >= 8 ? light : base
  }

  if (row === 2 && col >= 1 && col <= 6) {
    return striped ? stripe : base
  }

  if (row === 3 && col >= 1 && col <= 6) {
    return ginger ? light : base
  }

  const rear = frame < 0.5 ? 1 : frame > 1.5 ? 3 : 2
  const front = frame < 0.5 ? 7 : frame > 1.5 ? 5 : 6

  if (row >= 4 && row <= 5) {
    const paw = row === 5

    if (col === rear + 1 || col === front + 1) {
      return paw ? light : base
    }

    if (col === rear || col === front) {
      return scale(paw ? light : base, 0.75)
    }
  }

  return null
}

// A rat on a grid 8 wide and 4 tall. Frames 0 to 2 are scurrying strides,
// frame 3 is a rat frozen in a hunch.
const rat = (col, row, frame) => {
  const fur = [0.34, 0.29, 0.26]
  const pink = [0.72, 0.5, 0.48]

  if (frame > 2.5) {
    if (row === 3 && col >= 0 && col <= 2) {
      return pink
    }

    if (row >= 1 && row <= 3 && col >= 3 && col <= 5) {
      return scale(fur, row === 1 ? 1.1 : 0.9)
    }

    if (row >= 2 && row <= 3 && col >= 6 && col <= 7) {
      return col === 7 && row === 3 ? pink : fur
    }

    if (row === 1 && col === 6) {
      return scale(fur, 0.8)
    }

    return null
  }

  if (row === 2 && col <= 1) {
    return pink
  }

  if (row >= 1 && row <= 2 && col >= 2 && col <= 5) {
    return scale(fur, row === 1 ? 1.1 : 0.9)
  }

  if (row === 2 && col >= 6 && col <= 7) {
    return col === 7 ? pink : fur
  }

  if (row === 1 && col === 6) {
    return scale(fur, 0.8)
  }

  const back = frame < 0.5 ? 2 : frame > 1.5 ? 3 : 2.5
  const front = frame < 0.5 ? 6 : frame > 1.5 ? 5 : 5.5

  if (row === 3 && (col === Math.floor(back) || col === Math.floor(front))) {
    return scale(fur, 0.7)
  }

  return null
}

// What a kind of sprite needs to be baked: where its feet row is, how it lines
// up in the cell, the outline and where a shadow lies
const SPRITES = {
  person: {
    feet: 21,
    shiftX: 3,
    size: [-1, 8, -1, 22],
    outline: [0.08, 0.06, 0.05, 0.9],
    shadow: [1, 5, 0.22],
  },
  cat: {
    feet: 6,
    shiftX: 1,
    size: [-1, 11, -1, 7],
    outline: [0.08, 0.06, 0.05, 0.85],
    shadow: [1, 8, 0.2],
  },
  rat: {
    feet: 4,
    shiftX: 2,
    size: [-1, 9, -1, 5],
    outline: [0.07, 0.05, 0.04, 0.8],
    shadow: null,
  },
}

const pixels = Buffer.alloc(COLUMNS * CELL_W * ROWS * CELL_H * 4)
const sheetWidth = COLUMNS * CELL_W

const put = (x, y, [r, g, b, a]) => {
  const at = (y * sheetWidth + x) * 4
  const byte = (v) => Math.round(Math.min(Math.max(v, 0), 1) * 255)

  pixels[at] = byte(r)
  pixels[at + 1] = byte(g)
  pixels[at + 2] = byte(b)
  pixels[at + 3] = byte(a)
}

// Draws one pose into its cell with a dark outline where a neighbour is drawn
// and a little shadow under the feet
const bake = (kind, draw, cellColumn, cellRow) => {
  const { feet, shiftX, size, outline, shadow } = SPRITES[kind]
  const shiftY = FEET_ROW - feet
  const [colFrom, colTo, rowFrom, rowTo] = size

  for (let row = rowFrom; row <= rowTo; row++) {
    for (let col = colFrom; col <= colTo; col++) {
      const x = cellColumn * CELL_W + col + shiftX
      const y = cellRow * CELL_H + row + shiftY

      if (x < cellColumn * CELL_W || x >= (cellColumn + 1) * CELL_W) {
        continue
      }

      const here = draw(col, row)

      if (here) {
        put(x, y, [...here, 1])
      } else if (
        [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ].some(([dx, dy]) => draw(col + dx, row + dy))
      ) {
        put(x, y, outline)
      } else if (
        shadow &&
        row === feet &&
        col >= shadow[0] &&
        col <= shadow[1]
      ) {
        put(x, y, [0, 0, 0, shadow[2]])
      }
    }
  }
}

looks.forEach((look, row) => {
  for (let frame = 0; frame < 3; frame++) {
    bake("person", (col, r) => person(look, col, r, frame), frame, row)
  }
})

for (let kind = 0; kind < CATS; kind++) {
  for (let frame = 0; frame < 4; frame++) {
    bake("cat", (col, r) => cat(kind, col, r, frame), frame, LOOKS + kind)
  }
}

for (let frame = 0; frame < 4; frame++) {
  bake("rat", (col, r) => rat(col, r, frame), frame, LOOKS + CATS)
}

const width = sheetWidth
const height = ROWS * CELL_H
const png = encodePng(width, height, pixels)

mkdirSync(dirname(OUTPUT), { recursive: true })
writeFileSync(OUTPUT, png)
console.log(`Wrote ${OUTPUT} (${width} x ${height})`)
