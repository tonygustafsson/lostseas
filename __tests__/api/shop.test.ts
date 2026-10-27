import { beforeEach, describe, expect, it, vi } from "vitest"

import { POST as trade } from "@/app/api/shop/trade/route"

import { createTestPlayer } from "../helpers/createTestPlayer"

// The game rules are tested in actions/shop.test.ts.
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

const request = (body: unknown) =>
  new Request("http://localhost/api/shop/trade", {
    method: "POST",
    body: JSON.stringify(body),
  })

const sellFood = () =>
  trade(request({ changes: [{ item: "food", quantity: -2 }] }))

beforeEach(() => {
  vi.clearAllMocks()
  mocks.playerId = "test-player"
  mocks.player = createTestPlayer()
  mocks.savePlayer.mockImplementation(async (player: Player) => player)
})

describe("POST /api/shop/trade", () => {
  it("returns 401 without a player cookie", async () => {
    mocks.playerId = undefined

    const response = await sellFood()

    expect(response.status).toBe(401)
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })

  it("returns 401 when the player does not exist", async () => {
    mocks.player = undefined

    const response = await sellFood()

    expect(response.status).toBe(401)
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })

  it("returns 400 with the game error and saves nothing", async () => {
    mocks.player = createTestPlayer({ character: { location: "Tavern" } })

    const response = await sellFood()

    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({
      error: "You must be at Shop to do this.",
    })
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })

  it.each([{}, { changes: [] }, { changes: "food" }, null])(
    "returns 400 for the body %j",
    async (body) => {
      const response = await trade(request(body))

      expect(response.status).toBe(400)
      expect(await response.json()).toEqual({ error: "Nothing to trade" })
      expect(mocks.savePlayer).not.toHaveBeenCalled()
    }
  )

  it("saves the whole trade once, with a log, and returns it", async () => {
    const response = await trade(
      request({
        changes: [
          { item: "food", quantity: -2 },
          { item: "water", quantity: 1 },
        ],
      })
    )
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(mocks.savePlayer).toHaveBeenCalledOnce()

    const [savedPlayer, savedLog] = mocks.savePlayer.mock.calls[0]

    expect(savedLog?.message).toBe(
      "Sold 2 crates of food. Bought 1 barrel of water. Received 10 gold."
    )
    expect(savedPlayer.inventory).toMatchObject({ food: 8, water: 21 })
    expect(body).toEqual({
      success: true,
      updatedPlayer: savedPlayer,
      sold: [{ item: "food", quantity: 2, totalQuantity: 8, totalPrice: 22 }],
      bought: [
        { item: "water", quantity: 1, totalQuantity: 21, totalPrice: 12 },
      ],
      gold: 10,
    })
  })

  it("returns 500 when saving fails", async () => {
    mocks.savePlayer.mockRejectedValue("Database down")

    const response = await sellFood()

    expect(response.status).toBe(500)
    expect(await response.json()).toMatchObject({ error: "Database down" })
  })
})
