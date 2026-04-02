import { afterEach, describe, expect, it, vi } from "vitest"

import getShipName from "@/utils/names/getShipName"
import { createNewShip, reduceShipsHealth } from "@/utils/ship"

vi.mock("@/utils/names/getShipName", () => ({
  default: vi.fn(),
}))

describe("ship utilities", () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it("createNewShip returns a new ship with the expected shape", () => {
    const uuidSpy = vi
      .spyOn(globalThis.crypto, "randomUUID")
      .mockReturnValue("ship-uuid")

    ;(getShipName as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      "Black Pearl"
    )

    const ship = createNewShip("Brig", 12)

    expect(ship).toEqual({
      id: "ship-uuid",
      name: "Black Pearl",
      type: "Brig",
      health: 100,
      createdDay: 12,
    })

    uuidSpy.mockRestore()
  })

  it("reduceShipsHealth returns nested ship updates", () => {
    const result = reduceShipsHealth(
      {
        shipA: { id: "shipA", name: "A", type: "Brig", health: 40 } as Ship,
        shipB: { id: "shipB", name: "B", type: "Frigate", health: 8 } as Ship,
      },
      10
    )

    expect(result).toEqual({
      shipA: { id: "shipA", name: "A", type: "Brig", health: 30 },
      shipB: { id: "shipB", name: "B", type: "Frigate", health: 0 },
    })
  })
})
