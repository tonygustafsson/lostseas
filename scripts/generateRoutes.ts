/**
 * Pre-computes water-safe routes between all town pairs using A* pathfinding.
 * Reads the water mask PNG (white=water, black=land) and outputs a static
 * TypeScript file at constants/routes.ts that the app imports at build time.
 *
 * Run: npm run generate:routes
 */

import { readFileSync, writeFileSync } from "fs"
import { dirname, join } from "path"
import { PNG } from "pngjs"
import { fileURLToPath } from "url"

// ─── Map & grid constants (must match waterDetection.ts) ─────────────────────

const MAP_WIDTH = 850
const MAP_HEIGHT = 540
const GRID_SCALE = 4
const GRID_W = Math.ceil(MAP_WIDTH / GRID_SCALE)
const GRID_H = Math.ceil(MAP_HEIGHT / GRID_SCALE)

// Use __dirname-compatible path resolution for both CJS and ESM environments
const __filename = fileURLToPath(
  typeof import.meta?.url !== "undefined"
    ? import.meta.url
    : `file://${__filename}`
)
const __dirname = dirname(__filename)

// ─── Town coordinates ─────────────────────────────────────────────────────────

const TOWNS: Record<string, { x: number; y: number }> = {
  "Charles Towne": { x: 388, y: 47 },
  Barbados: { x: 779, y: 387 },
  "Port Royale": { x: 452, y: 306 },
  Belize: { x: 207, y: 303 },
  Tortuga: { x: 598, y: 262 },
  Leogane: { x: 537, y: 300 },
  Martinique: { x: 752, y: 353 },
  Biloxi: { x: 259, y: 68 },
  Panama: { x: 382, y: 459 },
  Havana: { x: 351, y: 204 },
  "Villa Hermosa": { x: 133, y: 303 },
  "San Juan": { x: 661, y: 283 },
  Bonaire: { x: 610, y: 429 },
  Curacao: { x: 558, y: 405 },
  "St. Martin": { x: 720, y: 301 },
  "St. Eustatius": { x: 741, y: 327 },
}

// ─── Load water mask ──────────────────────────────────────────────────────────

const maskPath = join(__dirname, "../public/img/map/spanish-main-mask.png")
console.log(`Loading mask: ${maskPath}`)
const maskBuffer = readFileSync(maskPath)
const png = PNG.sync.read(maskBuffer)

function isWaterPixel(px: number, py: number): boolean {
  const x = Math.max(0, Math.min(png.width - 1, Math.floor(px)))
  const y = Math.max(0, Math.min(png.height - 1, Math.floor(py)))
  const idx = (y * png.width + x) * 4
  const brightness = (png.data[idx] + png.data[idx + 1] + png.data[idx + 2]) / 3
  return brightness > 128
}

function isWaterGrid(gx: number, gy: number): boolean {
  return isWaterPixel(gx * GRID_SCALE, gy * GRID_SCALE)
}

function gridKey(gx: number, gy: number): number {
  return gy * GRID_W + gx
}

// ─── BFS snap to nearest water cell ──────────────────────────────────────────

function snapToWater(
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

// ─── A* pathfinding ───────────────────────────────────────────────────────────

const DIRS: [number, number, number][] = [
  [0, 1, 1],
  [0, -1, 1],
  [1, 0, 1],
  [-1, 0, 1],
  [1, 1, 1.414],
  [1, -1, 1.414],
  [-1, 1, 1.414],
  [-1, -1, 1.414],
]

function astar(
  startX: number,
  startY: number,
  endX: number,
  endY: number
): [number, number][] {
  const clamp = (v: number, max: number) =>
    Math.max(0, Math.min(max - 1, Math.round(v)))

  const rawStart = snapToWater(
    clamp(startX / GRID_SCALE, GRID_W),
    clamp(startY / GRID_SCALE, GRID_H)
  )
  const rawEnd = snapToWater(
    clamp(endX / GRID_SCALE, GRID_W),
    clamp(endY / GRID_SCALE, GRID_H)
  )

  if (!rawStart || !rawEnd) {
    return [
      [startX, startY],
      [endX, endY],
    ]
  }

  const { gx: sGx, gy: sGy } = rawStart
  const { gx: eGx, gy: eGy } = rawEnd
  const startKey = gridKey(sGx, sGy)
  const endKey = gridKey(eGx, eGy)

  if (startKey === endKey) return [[startX, startY]]

  const heuristic = (gx: number, gy: number) =>
    Math.abs(gx - eGx) + Math.abs(gy - eGy)

  type ANode = { gx: number; gy: number; f: number }
  const openSet = new Map<number, ANode>()
  const cameFrom = new Map<number, number>()
  const gScore = new Map<number, number>()
  const closedSet = new Set<number>()

  openSet.set(startKey, { gx: sGx, gy: sGy, f: heuristic(sGx, sGy) })
  gScore.set(startKey, 0)

  while (openSet.size > 0) {
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
      const path: [number, number][] = []
      let k: number | undefined = currentKey
      while (k !== undefined) {
        const gx = k % GRID_W
        const gy = Math.floor(k / GRID_W)
        path.unshift([gx * GRID_SCALE, gy * GRID_SCALE])
        k = cameFrom.get(k)
      }
      return path
    }

    const current = openSet.get(currentKey)!
    openSet.delete(currentKey)
    closedSet.add(currentKey)

    for (const [dx, dy, cost] of DIRS) {
      const nx = current.gx + dx
      const ny = current.gy + dy
      if (nx < 0 || nx >= GRID_W || ny < 0 || ny >= GRID_H) continue

      const nKey = gridKey(nx, ny)
      if (closedSet.has(nKey) || !isWaterGrid(nx, ny)) continue

      // Corner-cut prevention: both cardinal neighbours must also be water
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

  // Fallback
  return [
    [startX, startY],
    [endX, endY],
  ]
}

// ─── Ramer-Douglas-Peucker path simplification ────────────────────────────────

function rdp(points: [number, number][], epsilon: number): [number, number][] {
  if (points.length <= 2) return points

  const [x1, y1] = points[0]
  const [x2, y2] = points[points.length - 1]
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.sqrt(dx * dx + dy * dy)

  let maxDist = 0
  let maxIdx = 0

  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i]
    const dist =
      len === 0
        ? Math.sqrt((px - x1) ** 2 + (py - y1) ** 2)
        : Math.abs((py - y1) * dx - (px - x1) * dy) / len
    if (dist > maxDist) {
      maxDist = dist
      maxIdx = i
    }
  }

  if (maxDist <= epsilon) return [points[0], points[points.length - 1]]

  const left = rdp(points.slice(0, maxIdx + 1), epsilon)
  const right = rdp(points.slice(maxIdx), epsilon)
  return [...left.slice(0, -1), ...right]
}

// ─── Main: compute all routes ─────────────────────────────────────────────────

const townNames = Object.keys(TOWNS)
const routes: Record<string, [number, number][]> = {}

// RDP epsilon: 2px tolerance — removes collinear points, keeps all turns
const RDP_EPSILON = 2.0

let count = 0
const total = townNames.length * (townNames.length - 1)

for (const origin of townNames) {
  for (const dest of townNames) {
    if (origin === dest) continue

    const reverseKey = `${dest}->${origin}`
    const forwardKey = `${origin}->${dest}`

    if (reverseKey in routes) {
      // Reuse reversed path to save A* computation time
      routes[forwardKey] = [...routes[reverseKey]].reverse()
      count++
      continue
    }

    const { x: sx, y: sy } = TOWNS[origin]
    const { x: ex, y: ey } = TOWNS[dest]

    const rawPath = astar(sx, sy, ex, ey)
    const simplified = rdp(rawPath, RDP_EPSILON)

    routes[forwardKey] = simplified

    count++
    if (count % 20 === 0) {
      process.stdout.write(`\r  Progress: ${count}/${total}`)
    }
  }
}

console.log(`\r  Computed ${total} routes. Simplification stats:`)

const totalPoints = Object.values(routes).reduce((s, r) => s + r.length, 0)
console.log(`  Average points per route: ${(totalPoints / total).toFixed(1)}`)

// ─── Write output file ────────────────────────────────────────────────────────

const outPath = join(__dirname, "../constants/routes.ts")

const lines = [
  "/**",
  " * Pre-computed water-safe routes between all town pairs.",
  " * Auto-generated by scripts/generateRoutes.ts — do not edit manually.",
  " * Run `npm run generate:routes` to regenerate after map or town changes.",
  " *",
  ` * ${total} routes, ${totalPoints} total points (avg ${(totalPoints / total).toFixed(1)} per route)`,
  " */",
  "",
  "// [x, y] tuples along the water-safe A* path between town pairs",
  "export const ROUTES: Record<string, [number, number][]> = {",
]

for (const [key, path] of Object.entries(routes)) {
  const pts = path.map(([x, y]) => `[${x},${y}]`).join(",")
  lines.push(`  ${JSON.stringify(key)}: [${pts}],`)
}

lines.push("}")
lines.push("")

writeFileSync(outPath, lines.join("\n"), "utf-8")
console.log(`\nWritten to: ${outPath}`)
console.log(`File size: ${(lines.join("\n").length / 1024).toFixed(1)} KB`)
