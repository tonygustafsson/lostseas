import type { Point } from "./seaRoutes"

export const SHIP_SPRITE = "/img/map/ship-sprite.png"
export const SHIP_SPRITE_WIDTH = 1792
export const SHIP_SPRITE_HEIGHT = 896
export const SHIP_SPRITE_FRAME = 448

// Clockwise from sailing right, the order headings are matched in
export const SHIP_DIRECTIONS = [
  "right",
  "down-right",
  "down",
  "down-left",
  "left",
  "up-left",
  "up",
  "up-right",
] as const

export type ShipDirection = (typeof SHIP_DIRECTIONS)[number]

// Narrow views look smaller than the ship seen from the side
const TURNED_SCALE = 1.1

// Where the ship is in each sprite frame. Each ship is cropped to its own
// bounds so it stays centred when it turns.
export const SHIP_FRAMES: Record<
  ShipDirection,
  { x: number; y: number; width: number; height: number; scale: number }
> = {
  right: { x: 896 + 21, y: 27, width: 390, height: 357, scale: 1 },
  "down-right": {
    x: 1344 + 92,
    y: 17,
    width: 317,
    height: 380,
    scale: TURNED_SCALE,
  },
  down: { x: 111, y: 448 + 14, width: 200, height: 399, scale: TURNED_SCALE },
  "down-left": {
    x: 448 + 14,
    y: 448 + 16,
    width: 431,
    height: 382,
    scale: TURNED_SCALE,
  },
  left: { x: 896 + 2, y: 448 + 24, width: 396, height: 356, scale: 1 },
  "up-left": {
    x: 1344 + 42,
    y: 448 + 21,
    width: 257,
    height: 382,
    scale: TURNED_SCALE,
  },
  up: { x: 110, y: 14, width: 182, height: 396, scale: TURNED_SCALE },
  "up-right": {
    x: 448 + 117,
    y: 22,
    width: 274,
    height: 383,
    scale: TURNED_SCALE,
  },
}

// The direction closest to the heading, in steps of 45 degrees
export const getShipDirection = ({ x, y }: Point): ShipDirection => {
  const step = Math.round(Math.atan2(y, x) / (Math.PI / 4))

  return SHIP_DIRECTIONS[(step + 8) % 8]
}
