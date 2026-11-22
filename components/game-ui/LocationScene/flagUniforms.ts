import type { AmbienceArrays } from "./ambienceRenderer"

// The same size as in townMapShader.ts
export const MAX_FLAGS = 12

// In the order the shader knows them, a flag stores the index
export const FLAG_NATIONS: Nation[] = ["England", "France", "Spain", "Holland"]

// [x start, x end, top and bottom at the pole, top and bottom at the free end,
// nation, pole], in pixels of the harbour picture. The nation is an index in
// FLAG_NATIONS. The pole is 1 when the shader draws a pole for the flag, which
// grows with it, and 0 when the picture has one.
export type FlagSprite = number[]

// What the shader needs to draw the flags of a harbour picture
export const getFlagArrays = (flags: FlagSprite[]): AmbienceArrays => {
  const used = flags.slice(0, MAX_FLAGS)

  return {
    u_flagEdges: {
      size: 4,
      values: used.flatMap(([x0, x1, topStart, bottomStart]) => [
        x0,
        x1,
        topStart,
        bottomStart,
      ]),
    },
    u_flagFar: {
      size: 4,
      values: used.flatMap(
        ([, , , , topEnd, bottomEnd, nation = 0, pole = 0]) => [
          topEnd,
          bottomEnd,
          nation,
          pole,
        ]
      ),
    },
    u_flagCount: { size: 1, values: [used.length] },
  }
}
