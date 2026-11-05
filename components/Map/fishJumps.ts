// Fish that now and then jump out of the open sea and dive back in with a
// splash, drawn on the sea map canvas in map units

const FISH_LENGTH = 9
const JUMP_DURATION = 900
const JUMP_HEIGHT = 7
const JUMP_DISTANCE = 12
const SPLASH_DURATION = 700
const MAX_FISH = 3
// Time between new jumps, picked at random in this range
const MIN_WAIT = 2400
const MAX_WAIT = 7000
// Most fish are black, some are blue
const BLUE_FISH_CHANCE = 1 / 3
// How far from land a fish may jump
const LAND_MARGIN = 6

type Jump = {
  x: number
  y: number
  direction: 1 | -1
  start: number
  isBlue: boolean
}

export type MapArea = {
  left: number
  top: number
  right: number
  bottom: number
}

type IsOpenWater = (x: number, y: number) => boolean

const waterLookups = new WeakMap<HTMLImageElement, IsOpenWater>()

// Reads the water mask once, so any map point can be checked for open water
export const getWaterLookup = (mask: HTMLImageElement) => {
  const cached = waterLookups.get(mask)

  if (cached) {
    return cached
  }

  const canvas = document.createElement("canvas")
  canvas.width = mask.naturalWidth
  canvas.height = mask.naturalHeight
  const context = canvas.getContext("2d", { willReadFrequently: true })

  if (!context) {
    return null
  }

  context.drawImage(mask, 0, 0)
  const { data, width, height } = context.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  )

  // White in the mask is water
  const isWater = (x: number, y: number) => {
    const px = Math.round(x)
    const py = Math.round(y)

    return (
      px >= 0 &&
      py >= 0 &&
      px < width &&
      py < height &&
      data[(py * width + px) * 4] > 127
    )
  }

  // No land within the margin in any direction
  const isOpenWater: IsOpenWater = (x, y) => {
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2

      if (
        !isWater(
          x + Math.cos(angle) * LAND_MARGIN,
          y + Math.sin(angle) * LAND_MARGIN
        )
      ) {
        return false
      }
    }

    return isWater(x, y)
  }

  waterLookups.set(mask, isOpenWater)

  return isOpenWater
}

const drawSplash = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  age: number,
  color: string
) => {
  context.save()
  context.globalAlpha = 1 - age
  context.strokeStyle = color
  context.fillStyle = color
  context.lineWidth = 0.5

  // Rings spreading out on the surface
  for (const ring of [1, 0.6]) {
    context.beginPath()
    context.ellipse(
      x,
      y,
      1 + age * 5 * ring,
      0.5 + age * 2 * ring,
      0,
      0,
      2 * Math.PI
    )
    context.stroke()
  }

  // Droplets thrown up and falling back
  for (let i = 0; i < 4; i++) {
    const spread = (i - 1.5) * 1.4

    context.beginPath()
    context.arc(
      x + spread * age * 2,
      y - Math.sin(age * Math.PI) * (2.5 + Math.abs(spread)),
      0.4,
      0,
      2 * Math.PI
    )
    context.fill()
  }

  context.restore()
}

const drawFish = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  color: string
) => {
  const half = FISH_LENGTH / 2

  context.save()
  context.translate(x, y)
  context.rotate(angle)
  context.fillStyle = color

  context.beginPath()
  context.ellipse(0, 0, half, FISH_LENGTH / 5, 0, 0, 2 * Math.PI)
  context.fill()

  // Tail fin
  context.beginPath()
  context.moveTo(-half + 1, 0)
  context.lineTo(-half - FISH_LENGTH / 4, -FISH_LENGTH / 5)
  context.lineTo(-half - FISH_LENGTH / 4, FISH_LENGTH / 5)
  context.closePath()
  context.fill()

  context.restore()
}

export const createFishJumps = () => {
  let jumps: Jump[] = []
  let nextJump: number | null = null

  // Starts a new jump now and then, somewhere in open water in view
  const update = (now: number, area: MapArea, isOpenWater: IsOpenWater) => {
    jumps = jumps.filter(
      ({ start }) => now - start < JUMP_DURATION + SPLASH_DURATION
    )

    const wait = MIN_WAIT + Math.random() * (MAX_WAIT - MIN_WAIT)

    // The first fish waits like any other
    nextJump ??= now + wait

    if (now < nextJump || jumps.length >= MAX_FISH) {
      return
    }

    nextJump = now + wait

    // A few tries, the view may be mostly land
    for (let i = 0; i < 10; i++) {
      const x = area.left + Math.random() * (area.right - area.left)
      const y = area.top + Math.random() * (area.bottom - area.top)
      const direction = Math.random() < 0.5 ? 1 : -1

      if (isOpenWater(x, y) && isOpenWater(x + direction * JUMP_DISTANCE, y)) {
        jumps.push({
          x,
          y,
          direction,
          start: now,
          isBlue: Math.random() < BLUE_FISH_CHANCE,
        })

        return
      }
    }
  }

  const draw = (
    context: CanvasRenderingContext2D,
    now: number,
    colors: { fish: string; blueFish: string; splash: string }
  ) => {
    for (const { x, y, direction, start, isBlue } of jumps) {
      const elapsed = now - start
      const landX = x + direction * JUMP_DISTANCE

      if (elapsed < SPLASH_DURATION) {
        drawSplash(context, x, y, elapsed / SPLASH_DURATION, colors.splash)
      }

      if (elapsed < JUMP_DURATION) {
        // Along an arc, nose pointing the way it moves
        const t = elapsed / JUMP_DURATION
        const angle = Math.atan2(
          -JUMP_HEIGHT * 4 * (1 - 2 * t),
          direction * JUMP_DISTANCE
        )

        drawFish(
          context,
          x + direction * JUMP_DISTANCE * t,
          y - JUMP_HEIGHT * 4 * t * (1 - t),
          angle,
          isBlue ? colors.blueFish : colors.fish
        )
      } else {
        const age = (elapsed - JUMP_DURATION) / SPLASH_DURATION

        drawSplash(context, landX, y, age, colors.splash)
      }
    }
  }

  return { update, draw }
}
