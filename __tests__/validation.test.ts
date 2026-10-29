import { describe, expect, it } from "vitest"

import { registrationValidationSchema } from "@/utils/validation"

const base = {
  name: "Mateo Salazar",
  characterId: "mateo-salazar",
  musicOn: true,
  ambienceOn: true,
  soundEffectsOn: true,
}

describe("registrationValidationSchema", () => {
  it("accepts a known characterId", () => {
    expect(registrationValidationSchema.safeParse(base).success).toBe(true)
  })

  it("requires the ambience setting", () => {
    const { ambienceOn: _, ...withoutAmbience } = base

    expect(
      registrationValidationSchema.safeParse(withoutAmbience).success
    ).toBe(false)
  })

  it("rejects a missing or unknown characterId", () => {
    const { characterId: _, ...withoutId } = base

    expect(registrationValidationSchema.safeParse(withoutId).success).toBe(
      false
    )
    expect(
      registrationValidationSchema.safeParse({ ...base, characterId: "nobody" })
        .success
    ).toBe(false)
  })
})
