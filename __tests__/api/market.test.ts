import { beforeEach, describe, expect, it, vi } from "vitest"

import { POST as accept } from "@/app/api/market/accept/route"

import { createTestPlayer } from "../helpers/createTestPlayer"

// The game rules are tested in actions/market.test.ts.
// These tests only check what the route adds: auth, saving and responses.

const mocks = vi.hoisted(() => ({
  playerId: "test-player" as string | undefined,
  player: undefined as Player | undefined,
  savePlayer: vi.fn(),
}))

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: () => (mocks.playerId ? { value: mocks.playerId } : undefined),
  }),
}))

vi.mock("@/firebase/db", () => ({
  getPlayer: async () => mocks.player,
  savePlayer: mocks.savePlayer,
}))

const call = () =>
  accept(
    new Request("http://localhost/api/market/accept", {
      method: "POST",
      body: JSON.stringify({ item: "rum" }),
    })
  )

beforeEach(() => {
  vi.clearAllMocks()
  mocks.playerId = "test-player"
  mocks.player = createTestPlayer({
    character: { location: "Market" },
    inventory: { rum: 1 },
    locationStates: {
      market: { visited: true, items: { rum: { quantity: 2, price: 80 } } },
    },
  })
  mocks.savePlayer.mockImplementation(async (player: Player) => player)
})

describe("POST /api/market/accept", () => {
  it("returns 401 without a player cookie", async () => {
    mocks.playerId = undefined

    const response = await call()

    expect(response.status).toBe(401)
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })

  it("returns 401 when the player does not exist", async () => {
    mocks.player = undefined

    const response = await call()

    expect(response.status).toBe(401)
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })

  it("returns 400 with the game error and item, and saves nothing", async () => {
    mocks.player = createTestPlayer({ character: { location: "Shop" } })

    const response = await call()

    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({
      error: "You must be at Market to do this.",
      item: "rum",
    })
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })

  it("saves the new player with a log and returns it", async () => {
    const response = await call()
    const body = await response.json()

    expect(response.status).toBe(200)

    const [savedPlayer, savedLog] = mocks.savePlayer.mock.calls[0]

    expect(savedLog).toBe("Bought 2 barrels of rum in the market for 160 gold.")
    expect(body).toEqual({
      success: true,
      updatedPlayer: savedPlayer,
      item: "rum",
      quantity: 2,
      totalQuantity: 3,
      totalPrice: 160,
    })
  })

  it("returns 500 when saving fails", async () => {
    mocks.savePlayer.mockRejectedValue("Database down")

    const response = await call()

    expect(response.status).toBe(500)
    expect(await response.json()).toEqual({
      error: "Database down",
      item: "rum",
    })
  })
})
