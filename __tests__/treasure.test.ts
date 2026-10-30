import { describe, expect, it, vi } from "vitest"

import { TOWNS } from "@/constants/locations"
import { createTreasure } from "@/utils/createTreasure"
import { pickRandom } from "@/utils/random"

vi.mock("@/utils/random", () => ({ pickRandom: vi.fn() }))

describe("createTreasure", () => {
  it("creates treasure with deterministic selection when random is mocked", () => {
    const uuidSpy = vi
      .spyOn(globalThis.crypto, "randomUUID")
      .mockReturnValue("test-uuid")

    vi.mocked(pickRandom).mockImplementation((list) => list[0])

    const treasure = createTreasure()
    expect(treasure.id).toBe("test-uuid")
    expect(typeof treasure.name).toBe("string")
    expect(Object.keys(TOWNS)).toContain(treasure.rewarder)

    uuidSpy.mockRestore()
  })
})
