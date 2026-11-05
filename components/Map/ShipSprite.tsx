import { cn } from "@/lib/utils"

import {
  SHIP_FRAMES,
  SHIP_SPRITE,
  SHIP_SPRITE_FRAME,
  SHIP_SPRITE_HEIGHT,
  SHIP_SPRITE_WIDTH,
  type ShipDirection,
} from "./shipFrames"

type Props = {
  direction: ShipDirection
  // Size of a whole sprite frame in pixels, the ship fills most of it
  size?: number
  className?: string
}

const ShipSprite = ({ direction, size = 64, className }: Props) => {
  const frame = SHIP_FRAMES[direction]
  const scale = (size / SHIP_SPRITE_FRAME) * frame.scale

  return (
    <span
      aria-hidden
      className={cn("inline-block bg-no-repeat", className)}
      style={{
        width: frame.width * scale,
        height: frame.height * scale,
        backgroundImage: `url(${SHIP_SPRITE})`,
        backgroundPosition: `${-frame.x * scale}px ${-frame.y * scale}px`,
        backgroundSize: `${SHIP_SPRITE_WIDTH * scale}px ${SHIP_SPRITE_HEIGHT * scale}px`,
      }}
    />
  )
}

export default ShipSprite
