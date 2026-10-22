import { existsSync } from "fs"
import { join } from "path"
import { describe, expect, it } from "vitest"

import {
  CHARACTER_IDS,
  CHARACTERS,
  getCharacterById,
} from "@/constants/characters"

describe("CHARACTERS", () => {
  it("has unique ids", () => {
    expect(new Set(CHARACTER_IDS).size).toBe(CHARACTERS.length)
  })

  it("uses the game's gender values", () => {
    CHARACTERS.forEach((c) => expect(["Male", "Female"]).toContain(c.gender))
  })

  it("points each image at a file on disk", () => {
    CHARACTERS.forEach((c) => {
      expect(existsSync(join("public", c.image))).toBe(true)
    })
  })

  it("finds a character by id and returns undefined for an unknown id", () => {
    expect(getCharacterById("mateo-salazar")?.name).toBe("Mateo Salazar")
    expect(getCharacterById("nobody")).toBeUndefined()
  })
})
