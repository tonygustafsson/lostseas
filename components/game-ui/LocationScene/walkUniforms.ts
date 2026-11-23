import type { AmbienceArrays } from "./ambienceRenderer"

// The size of the lane lists in townMapShader.ts
export const MAX_LEVELS = 7

// [x start, x end, feet, half width, person size]
export type Lane = number[]

// What the shader needs to know about the streets of a harbour picture
export const getWalkArrays = (
  lanes: Lane[],
  width: number,
  height: number
): AmbienceArrays => {
  const levels = lanes.slice(0, MAX_LEVELS)

  return {
    // The streets are in the pixels of the original picture, which is not
    // the size of the copy the browser loads
    u_mapSize: { size: 2, values: [width, height] },
    u_laneBox: {
      size: 4,
      values: levels.flatMap(([x0, x1, feet, half]) => [x0, x1, feet, half]),
    },
    u_laneCount: { size: 1, values: [levels.length] },
  }
}
