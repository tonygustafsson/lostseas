import { beforeEach, describe, expect, it, vi } from "vitest"

import { POST as buy } from "@/app/api/shop/buy/route"
import { POST as buyNecessities } from "@/app/api/shop/buyNecessities/route"
import { POST as sell } from "@/app/api/shop/sell/route"
import { POST as sellBarterGoods } from "@/app/api/shop/sellBarterGoods/route"

import { createTestPlayer } from "../helpers/createTestPlayer"

// The game rules are tested in actions/shop.test.ts.
// These tests only check what the routes add: auth, saving and responses.

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
  new Request("http://localhost/api/shop", {
    method: "POST",
    body: JSON.stringify(body),
  })

const routes = [
  {
    name: "buy",
    call: () => buy(request({ item: "food", quantity: 2 })),
    log: "Bought 2 crates of food for 32 gold.",
    data: { item: "food", quantity: 2, totalQuantity: 12, totalPrice: 32 },
  },
  {
    name: "sell",
    call: () => sell(request({ item: "food", quantity: 2 })),
    log: "Sold 2 crates of food for 22 gold.",
    data: { item: "food", quantity: 2, totalQuantity: 8, totalPrice: 22 },
  },
  {
    name: "buyNecessities",
    call: () => buyNecessities(request({ days: 10 })),
    log: "Bought necessities for 400 gold. Enough food and water for 10 days.",
    data: { cost: 400, foodNeeded: 10, waterNeeded: 20 },
  },
  {
    name: "sellBarterGoods",
    call: () => sellBarterGoods(),
    log: "Sold barter goods for 105 gold.",
    data: { value: 105 },
  },
]

beforeEach(() => {
  vi.clearAllMocks()
  mocks.playerId = "test-player"
  mocks.player = createTestPlayer({ inventory: { rum: 1 } })
  mocks.savePlayer.mockImplementation(async (player: Player) => player)
})

describe.each(routes)("POST /api/shop/$name", ({ call, log, data }) => {
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

  it("returns 400 with the game error and saves nothing", async () => {
    mocks.player = createTestPlayer({ character: { location: "Tavern" } })

    const response = await call()

    expect(response.status).toBe(400)
    expect(await response.json()).toMatchObject({
      error: "You must be at Shop to do this.",
    })
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })

  it("saves the new player with a log and returns it", async () => {
    const response = await call()
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(mocks.savePlayer).toHaveBeenCalledOnce()

    const [savedPlayer, savedLog] = mocks.savePlayer.mock.calls[0]

    expect(savedLog).toBe(log)
    expect(savedPlayer).not.toEqual(mocks.player)
    expect(body).toEqual({ success: true, updatedPlayer: savedPlayer, ...data })
  })

  it("returns 500 when saving fails", async () => {
    mocks.savePlayer.mockRejectedValue("Database down")

    const response = await call()

    expect(response.status).toBe(500)
    expect(await response.json()).toMatchObject({ error: "Database down" })
  })
})

describe("POST /api/shop/buy and sell", () => {
  it.each([
    ["buy", buy],
    ["sell", sell],
  ])("%s includes the item in errors for the toast title", async (_, route) => {
    mocks.player = createTestPlayer({ character: { location: "Bank" } })

    const response = await route(request({ item: "rum", quantity: 1 }))

    expect(await response.json()).toEqual({
      error: "You must be at Shop to do this.",
      item: "rum",
    })
  })
})
