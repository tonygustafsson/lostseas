import { describe, expect, it } from "vitest"

import { patchDeep } from "@/utils/patchDeep"

describe("patchDeep", () => {
  it("merges nested plain objects without replacing untouched branches", () => {
    const original = {
      name: "Black Pearl",
      ship: {
        hp: 10,
        cargo: {
          food: 4,
          water: 2,
        },
      },
    }

    const updated = patchDeep(original, {
      ship: {
        cargo: {
          food: 7,
        },
      },
    })

    expect(updated).not.toBe(original)
    expect(updated).toEqual({
      name: "Black Pearl",
      ship: {
        hp: 10,
        cargo: {
          food: 7,
          water: 2,
        },
      },
    })
    expect(updated.ship).not.toBe(original.ship)
    expect(updated.ship.cargo).not.toBe(original.ship.cargo)
  })

  it("returns the original object when the patch makes no changes", () => {
    const original = {
      title: "Captain",
      stats: {
        gold: 100,
      },
    }

    const updated = patchDeep(original, {
      stats: {
        gold: 100,
      },
    })

    expect(updated).toBe(original)
  })
})
