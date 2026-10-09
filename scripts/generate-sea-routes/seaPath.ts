// Builds the sea routes in constants/seaRoutes.json, see ./index.mjs

import type { Point } from "../../components/Map/seaRoutes"

type WaterGrid = {
  width: number
  height: number
  cellSize: number
  water: Uint8Array
}

const NEIGHBOURS = [
  [1, 0, 1],
  [-1, 0, 1],
  [0, 1, 1],
  [0, -1, 1],
  [1, 1, Math.SQRT2],
  [1, -1, Math.SQRT2],
  [-1, 1, Math.SQRT2],
  [-1, -1, Math.SQRT2],
] as const

// White pixels in the RGBA mask are water
export const buildWaterGrid = (
  pixels: ArrayLike<number>,
  imageWidth: number,
  imageHeight: number,
  cellSize: number,
  margin = 0
): WaterGrid => {
  const width = Math.ceil(imageWidth / cellSize)
  const height = Math.ceil(imageHeight / cellSize)
  const water = new Uint8Array(width * height)

  for (let cy = 0; cy < height; cy++) {
    for (let cx = 0; cx < width; cx++) {
      let isWater = 1

      const maxY = Math.min((cy + 1) * cellSize, imageHeight)
      const maxX = Math.min((cx + 1) * cellSize, imageWidth)

      for (let y = cy * cellSize; y < maxY && isWater; y++) {
        for (let x = cx * cellSize; x < maxX; x++) {
          if (pixels[(y * imageWidth + x) * 4] < 128) {
            isWater = 0
            break
          }
        }
      }

      water[cy * width + cx] = isWater
    }
  }

  if (margin <= 0) return { width, height, cellSize, water }

  const eroded = new Uint8Array(water)

  for (let cy = 0; cy < height; cy++) {
    for (let cx = 0; cx < width; cx++) {
      if (!water[cy * width + cx]) continue

      for (let dy = -margin; dy <= margin; dy++) {
        for (let dx = -margin; dx <= margin; dx++) {
          const nx = cx + dx
          const ny = cy + dy

          if (
            nx >= 0 &&
            ny >= 0 &&
            nx < width &&
            ny < height &&
            !water[ny * width + nx]
          ) {
            eroded[cy * width + cx] = 0
          }
        }
      }
    }
  }

  return { width, height, cellSize, water: eroded }
}

const isWaterCell = (grid: WaterGrid, cx: number, cy: number) =>
  cx >= 0 &&
  cy >= 0 &&
  cx < grid.width &&
  cy < grid.height &&
  grid.water[cy * grid.width + cx] === 1

const isWaterAt = (grid: WaterGrid, point: Point) =>
  isWaterCell(
    grid,
    Math.floor(point.x / grid.cellSize),
    Math.floor(point.y / grid.cellSize)
  )

const cellCenter = (grid: WaterGrid, index: number): Point => ({
  x: ((index % grid.width) + 0.5) * grid.cellSize,
  y: (Math.floor(index / grid.width) + 0.5) * grid.cellSize,
})

const snapToWater = (grid: WaterGrid, point: Point) => {
  const startX = Math.min(
    grid.width - 1,
    Math.max(0, Math.floor(point.x / grid.cellSize))
  )
  const startY = Math.min(
    grid.height - 1,
    Math.max(0, Math.floor(point.y / grid.cellSize))
  )
  const start = startY * grid.width + startX
  const visited = new Uint8Array(grid.width * grid.height)
  const queue = [start]
  visited[start] = 1

  for (let i = 0; i < queue.length; i++) {
    const index = queue[i]
    if (grid.water[index]) return index

    const cx = index % grid.width
    const cy = Math.floor(index / grid.width)

    for (const [dx, dy] of NEIGHBOURS) {
      const nx = cx + dx
      const ny = cy + dy
      if (nx < 0 || ny < 0 || nx >= grid.width || ny >= grid.height) continue

      const next = ny * grid.width + nx
      if (visited[next]) continue

      visited[next] = 1
      queue.push(next)
    }
  }

  return null
}

const octile = (grid: WaterGrid, a: number, b: number) => {
  const dx = Math.abs((a % grid.width) - (b % grid.width))
  const dy = Math.abs(Math.floor(a / grid.width) - Math.floor(b / grid.width))

  return Math.max(dx, dy) + (Math.SQRT2 - 1) * Math.min(dx, dy)
}

const findPath = (grid: WaterGrid, start: number, goal: number) => {
  const size = grid.width * grid.height
  const cost = new Float64Array(size).fill(Infinity)
  const cameFrom = new Int32Array(size).fill(-1)
  const closed = new Uint8Array(size)

  // Binary min-heap of [priority, index]
  const heap: [number, number][] = []

  const push = (item: [number, number]) => {
    heap.push(item)
    let i = heap.length - 1

    while (i > 0) {
      const parent = (i - 1) >> 1
      if (heap[parent][0] <= heap[i][0]) break
      ;[heap[parent], heap[i]] = [heap[i], heap[parent]]
      i = parent
    }
  }

  const pop = () => {
    const top = heap[0]
    const last = heap.pop()!

    if (heap.length > 0) {
      heap[0] = last
      let i = 0

      while (true) {
        const left = i * 2 + 1
        const right = left + 1
        let smallest = i

        if (left < heap.length && heap[left][0] < heap[smallest][0])
          smallest = left
        if (right < heap.length && heap[right][0] < heap[smallest][0])
          smallest = right
        if (smallest === i) break
        ;[heap[smallest], heap[i]] = [heap[i], heap[smallest]]
        i = smallest
      }
    }

    return top
  }

  cost[start] = 0
  push([octile(grid, start, goal), start])

  while (heap.length > 0) {
    const [, current] = pop()

    if (current === goal) {
      const path = [current]
      while (cameFrom[path[0]] !== -1) path.unshift(cameFrom[path[0]])
      return path
    }

    if (closed[current]) continue
    closed[current] = 1

    const cx = current % grid.width
    const cy = Math.floor(current / grid.width)

    for (const [dx, dy, stepCost] of NEIGHBOURS) {
      const nx = cx + dx
      const ny = cy + dy
      if (!isWaterCell(grid, nx, ny)) continue

      // Never cut diagonally past a land corner
      if (
        dx &&
        dy &&
        (!isWaterCell(grid, cx + dx, cy) || !isWaterCell(grid, cx, cy + dy))
      )
        continue

      const next = ny * grid.width + nx
      const nextCost = cost[current] + stepCost

      if (nextCost < cost[next]) {
        cost[next] = nextCost
        cameFrom[next] = current
        push([nextCost + octile(grid, next, goal), next])
      }
    }
  }

  return null
}

const hasLineOfSight = (grid: WaterGrid, a: Point, b: Point) => {
  const distance = Math.hypot(b.x - a.x, b.y - a.y)
  const steps = Math.max(1, Math.ceil(distance / (grid.cellSize / 4)))

  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    if (
      !isWaterAt(grid, { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t })
    )
      return false
  }

  return true
}

export const isPathOnWater = (grid: WaterGrid, points: Point[]) =>
  points.every(
    (point, i) => i === 0 || hasLineOfSight(grid, points[i - 1], point)
  )

const simplifyByLineOfSight = (grid: WaterGrid, points: Point[]) => {
  if (points.length <= 2) return points

  const result = [points[0]]
  let i = 0

  while (i < points.length - 1) {
    let j = points.length - 1
    while (j > i + 1 && !hasLineOfSight(grid, points[i], points[j])) j--

    result.push(points[j])
    i = j
  }

  return result
}

const smoothPath = (points: Point[], spacing = 4) => {
  if (points.length <= 2) return points

  const result: Point[] = []

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(points.length - 1, i + 2)]
    const samples = Math.max(
      1,
      Math.ceil(Math.hypot(p2.x - p1.x, p2.y - p1.y) / spacing)
    )

    for (let s = 0; s < samples; s++) {
      const t = s / samples
      const t2 = t * t
      const t3 = t2 * t

      const catmullRom = (a: number, b: number, c: number, d: number) =>
        0.5 *
        (2 * b +
          (c - a) * t +
          (2 * a - 5 * b + 4 * c - d) * t2 +
          (3 * b - a - 3 * c + d) * t3)

      result.push({
        x: catmullRom(p0.x, p1.x, p2.x, p3.x),
        y: catmullRom(p0.y, p1.y, p2.y, p3.y),
      })
    }
  }

  result.push(points[points.length - 1])

  return result
}

const reducePoints = (points: Point[], tolerance: number): Point[] => {
  if (points.length <= 2) return points

  const first = points[0]
  const last = points[points.length - 1]
  const length = Math.hypot(last.x - first.x, last.y - first.y) || 1

  let maxDistance = 0
  let index = 0

  for (let i = 1; i < points.length - 1; i++) {
    const distance =
      Math.abs(
        (last.x - first.x) * (first.y - points[i].y) -
          (first.x - points[i].x) * (last.y - first.y)
      ) / length

    if (distance > maxDistance) {
      maxDistance = distance
      index = i
    }
  }

  if (maxDistance <= tolerance) return [first, last]

  return [
    ...reducePoints(points.slice(0, index + 1), tolerance).slice(0, -1),
    ...reducePoints(points.slice(index), tolerance),
  ]
}

// Tries a route with a coastal margin first, then hugging the coast
export const computeSeaRoute = (
  grids: { safe: WaterGrid; raw: WaterGrid },
  from: Point,
  to: Point
) => {
  for (const grid of [grids.safe, grids.raw]) {
    const start = snapToWater(grid, from)
    const goal = snapToWater(grid, to)
    if (start === null || goal === null) continue

    const cells = findPath(grid, start, goal)
    if (!cells) continue

    const simplified = simplifyByLineOfSight(
      grid,
      cells.map((index) => cellCenter(grid, index))
    )
    const smoothed = reducePoints(smoothPath(simplified), 0.3)

    return isPathOnWater(grids.raw, smoothed) ? smoothed : simplified
  }

  return null
}
