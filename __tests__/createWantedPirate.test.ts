import { describe, expect, it, vi } from "vitest"

import { TOWNS } from "@/constants/locations"
import { PIRATE_CRIMES } from "@/constants/wantedPirates"
import { createWantedPirate, getPirateCrime } from "@/utils/createWantedPirate"
import { pickRandom } from "@/utils/random"

vi.mock("@/utils/random", () => ({ pickRandom: vi.fn() }))

describe("createWantedPirate", () => {
  it("creates a named pirate with a crime and a rewarding town", () => {
    const uuidSpy = vi
      .spyOn(globalThis.crypto, "randomUUID")
      .mockReturnValue("test-uuid" as never)

    vi.mocked(pickRandom).mockImplementation((list) => list[0])

    const pirate = createWantedPirate()

    expect(pirate).toEqual({
      id: "test-uuid",
      name: 'Jack "Black-eyed" Rourke',
      crimeId: PIRATE_CRIMES[0].id,
      rewarder: Object.keys(TOWNS)[0],
    })

    uuidSpy.mockRestore()
  })
})

describe("getPirateCrime", () => {
  it("finds the crime and bounty of a pirate", () => {
    expect(getPirateCrime({ crimeId: "sacked-town" })?.bounty).toBe(10000)
  })

  it("has unique crime ids", () => {
    const ids = PIRATE_CRIMES.map(({ id }) => id)

    expect(new Set(ids).size).toBe(ids.length)
  })
})
