/**
 * Water detection utility for the sea map using a mask image
 * Black pixels = land, White pixels = water
 */

import { useSyncExternalStore } from "react"

const MAP_WIDTH = 850
const MAP_HEIGHT = 540

// A* pathfinding is done on a downsampled grid for performance
const GRID_SCALE = 4
const GRID_W = Math.ceil(MAP_WIDTH / GRID_SCALE)
const GRID_H = Math.ceil(MAP_HEIGHT / GRID_SCALE)

// Module-level state — treated as an external store for useSyncExternalStore
let maskImageData: ImageData | null = null
let maskImageDataPromise: Promise<void> | null = null
const listeners = new Set<() => void>()

function notifyListeners() {
  listeners.forEach((l) => l())
}

/** Subscribe function for useSyncExternalStore */
export function subscribeToWaterDetection(callback: () => void): () => void {
  listeners.add(callback)
  return () => listeners.delete(callback)
}

/** Snapshot function for useSyncExternalStore — returns true once mask is loaded */
export function getWaterDetectionSnapshot(): boolean {
  return maskImageData !== null
}

/**
 * Kick off loading the water mask. Safe to call multiple times.
 * Notifies useSyncExternalStore subscribers when complete.
 */
export function initializeWaterDetection(): Promise<void> {
  if (maskImageDataPromise) return maskImageDataPromise
  if (maskImageData) return Promise.resolve()

  maskImageDataPromise = new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement("canvas")
      canvas.width = MAP_WIDTH
      canvas.height = MAP_HEIGHT

      const ctx = canvas.getContext("2d")
      if (!ctx) throw new Error("Could not get canvas context")

      const img = new Image()
      img.crossOrigin = "anonymous"

      img.onload = () => {
        try {
          ctx.drawImage(img, 0, 0)
          maskImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          notifyListeners()
          resolve()
        } catch (error) {
          reject(error)
        }
      }

      img.onerror = () => reject(new Error("Failed to load water mask image"))
      img.src = "/img/map/spanish-main-mask.png"

      setTimeout(() => {
        if (!maskImageData) reject(new Error("Water mask loading timeout"))
      }, 5000)
    } catch (error) {
      reject(error)
    }
  })

  return maskImageDataPromise
}

/**
 * Check if a pixel coordinate is in water
 * White pixels (brightness > 128) = water, Black pixels = land
 */
export function isWater(x: number, y: number): boolean {
  if (!maskImageData) return false

  const clampedX = Math.max(0, Math.min(MAP_WIDTH - 1, Math.floor(x)))
  const clampedY = Math.max(0, Math.min(MAP_HEIGHT - 1, Math.floor(y)))

  const pixelIndex = (clampedY * maskImageData.width + clampedX) * 4
  const data = maskImageData.data
  const brightness =
    (data[pixelIndex] + data[pixelIndex + 1] + data[pixelIndex + 2]) / 3

  return brightness > 128
}

function isWaterGrid(gx: number, gy: number): boolean {
  return isWater(gx * GRID_SCALE, gy * GRID_SCALE)
}

function gridKey(gx: number, gy: number): number {
  return gy * GRID_W + gx
}

/** Snap a grid coordinate to the nearest water cell (BFS outward) */
function snapToWaterGrid(
  gx: number,
  gy: number
): { gx: number; gy: number } | null {
  if (isWaterGrid(gx, gy)) return { gx, gy }

  const visited = new Set<number>()
  const queue: [number, number][] = [[gx, gy]]
  visited.add(gridKey(gx, gy))

  while (queue.length > 0) {
    const [cx, cy] = queue.shift()!
    for (const [dx, dy] of [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ]) {
      const nx = cx + dx
      const ny = cy + dy
      if (nx < 0 || nx >= GRID_W || ny < 0 || ny >= GRID_H) continue
      const k = gridKey(nx, ny)
      if (visited.has(k)) continue
      visited.add(k)
      if (isWaterGrid(nx, ny)) return { gx: nx, gy: ny }
      queue.push([nx, ny])
    }
  }

  return null
}

/**
 * Find a path through water only using A* pathfinding.
 * Returns an array of pixel coordinates forming a water-safe route.
 */
export function findWaterPath(
  startX: number,
  startY: number,
  endX: number,
  endY: number
): { x: number; y: number }[] {
  if (!maskImageData) {
    return [
      { x: startX, y: startY },
      { x: endX, y: endY },
    ]
  }

  const clamp = (v: number, max: number) =>
    Math.max(0, Math.min(max - 1, Math.round(v)))

  const rawStartGx = clamp(startX / GRID_SCALE, GRID_W)
  const rawStartGy = clamp(startY / GRID_SCALE, GRID_H)
  const rawEndGx = clamp(endX / GRID_SCALE, GRID_W)
  const rawEndGy = clamp(endY / GRID_SCALE, GRID_H)

  // Snap start and end to nearest water cells — town coords may be on land
  const snappedStart = snapToWaterGrid(rawStartGx, rawStartGy)
  const snappedEnd = snapToWaterGrid(rawEndGx, rawEndGy)

  if (!snappedStart || !snappedEnd) {
    return [
      { x: startX, y: startY },
      { x: endX, y: endY },
    ]
  }

  const startGx = snappedStart.gx
  const startGy = snappedStart.gy
  const endGx = snappedEnd.gx
  const endGy = snappedEnd.gy

  const startKey = gridKey(startGx, startGy)
  const endKey = gridKey(endGx, endGy)

  if (startKey === endKey) {
    return [{ x: startX, y: startY }]
  }

  const heuristic = (gx: number, gy: number) =>
    Math.abs(gx - endGx) + Math.abs(gy - endGy)

  type ANode = { gx: number; gy: number; f: number }
  const openSet = new Map<number, ANode>()
  const cameFrom = new Map<number, number>()
  const gScore = new Map<number, number>()
  const closedSet = new Set<number>()

  openSet.set(startKey, {
    gx: startGx,
    gy: startGy,
    f: heuristic(startGx, startGy),
  })
  gScore.set(startKey, 0)

  // 8-directional movement with corner-cut prevention:
  // a diagonal step (dx,dy) is only allowed if both adjacent cardinal cells
  // are also water — this prevents clipping through land corners.
  const dirs: [number, number, number][] = [
    [0, 1, 1],
    [0, -1, 1],
    [1, 0, 1],
    [-1, 0, 1],
    [1, 1, 1.414],
    [1, -1, 1.414],
    [-1, 1, 1.414],
    [-1, -1, 1.414],
  ]

  while (openSet.size > 0) {
    // Pick node with lowest f score
    let currentKey = -1
    let lowestF = Infinity
    openSet.forEach((n, k) => {
      if (n.f < lowestF) {
        lowestF = n.f
        currentKey = k
      }
    })
    if (currentKey === -1) break

    if (currentKey === endKey) {
      // Reconstruct path
      const path: { x: number; y: number }[] = []
      let k: number | undefined = currentKey
      while (k !== undefined) {
        const gx = k % GRID_W
        const gy = Math.floor(k / GRID_W)
        path.unshift({ x: gx * GRID_SCALE, y: gy * GRID_SCALE })
        k = cameFrom.get(k)
      }
      return path
    }

    const current = openSet.get(currentKey)!
    openSet.delete(currentKey)
    closedSet.add(currentKey)

    for (const [dx, dy, cost] of dirs) {
      const nx = current.gx + dx
      const ny = current.gy + dy
      if (nx < 0 || nx >= GRID_W || ny < 0 || ny >= GRID_H) continue

      const nKey = gridKey(nx, ny)
      if (closedSet.has(nKey) || !isWaterGrid(nx, ny)) continue

      // For diagonals, both shared cardinal neighbours must be water
      // to prevent corner-cutting through a land pixel
      if (dx !== 0 && dy !== 0) {
        if (
          !isWaterGrid(current.gx + dx, current.gy) ||
          !isWaterGrid(current.gx, current.gy + dy)
        )
          continue
      }

      const tentativeG = (gScore.get(currentKey) ?? 0) + cost
      if (tentativeG < (gScore.get(nKey) ?? Infinity)) {
        cameFrom.set(nKey, currentKey)
        gScore.set(nKey, tentativeG)
        openSet.set(nKey, { gx: nx, gy: ny, f: tentativeG + heuristic(nx, ny) })
      }
    }
  }

  // No path found — return direct line as fallback
  return [
    { x: startX, y: startY },
    { x: endX, y: endY },
  ]
}

/**
 * Get a safe water point by sampling around a coordinate
 */
export function findNearestWaterPoint(
  x: number,
  y: number,
  radius: number = 10
): { x: number; y: number } | null {
  if (isWater(x, y)) {
    return { x, y }
  }

  for (let r = 1; r <= radius; r++) {
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
      const checkX = x + r * Math.cos(angle)
      const checkY = y + r * Math.sin(angle)
      if (isWater(checkX, checkY)) {
        return { x: checkX, y: checkY }
      }
    }
  }

  return null
}

// Kick off loading immediately on the client when this module is first imported
if (typeof window !== "undefined") {
  initializeWaterDetection().catch(console.error)
}

/**
 * React hook — returns true once the water mask image is fully loaded.
 * Uses useSyncExternalStore so consumers need no setState or effects.
 */
export function useWaterDetection(): boolean {
  return useSyncExternalStore(
    subscribeToWaterDetection,
    getWaterDetectionSnapshot,
    () => false
  )
}
