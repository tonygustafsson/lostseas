import { beforeEach, describe, expect, it, vi } from "vitest"

import { POST as deposit } from "@/app/api/bank/deposit/route"
import { POST as loan } from "@/app/api/bank/loan/route"
import { POST as repay } from "@/app/api/bank/repay/route"
import { POST as withdraw } from "@/app/api/bank/withdraw/route"

import { createTestPlayer } from "../helpers/createTestPlayer"

// The game rules are tested in actions/bank.test.ts.
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
  new Request("http://localhost/api/bank", {
    method: "POST",
    body: JSON.stringify(body),
  })

const routes = [
  {
    name: "deposit",
    route: deposit,
    log: "Deposited 100 gold into the bank. Current account balance: 600 gold.",
    data: { amount: 100, gold: 900 },
  },
  {
    name: "withdraw",
    route: withdraw,
    log: "Withdrew 100 gold from the bank. Current account balance: 400 gold.",
    data: { amount: 100, gold: 1100 },
  },
  {
    name: "loan",
    route: loan,
    log: "Took a bank loan of 100 gold.",
    data: { amount: 100, gold: 1100, loan: 300 },
  },
  {
    name: "repay",
    route: repay,
    log: "Repaid 100 gold to the bank. Remaining loan: 100 gold.",
    data: { amount: 100, gold: 900, loan: 100 },
  },
]

beforeEach(() => {
  vi.clearAllMocks()
  mocks.playerId = "test-player"
  mocks.savePlayer.mockImplementation(async (player: Player) => player)
})

describe.each(routes)("POST /api/bank/$name", ({ name, route, log, data }) => {
  beforeEach(() => {
    // Deposits need no loan, the other routes need one
    mocks.player = createTestPlayer({
      character: {
        location: "Bank",
        account: 500,
        loan: name === "deposit" ? 0 : 200,
      },
    })
  })

  const call = () => route(request({ amount: 100 }))

  it("returns 401 without a player cookie", async () => {
    mocks.playerId = undefined

    expect((await call()).status).toBe(401)
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })

  it("returns 401 when the player does not exist", async () => {
    mocks.player = undefined

    expect((await call()).status).toBe(401)
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })

  it("returns 400 with the game error and saves nothing", async () => {
    const response = await route(request({ amount: "abc" }))

    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({
      error: "Amount must be a positive whole number",
    })
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })

  it("saves the new player with a log and returns it", async () => {
    const response = await call()
    const body = await response.json()

    expect(response.status).toBe(200)

    const [savedPlayer, savedLog] = mocks.savePlayer.mock.calls[0]

    expect(savedLog).toBe(log)
    expect(body).toEqual({ success: true, updatedPlayer: savedPlayer, ...data })
  })

  it("returns 500 when saving fails", async () => {
    mocks.savePlayer.mockRejectedValue("Database down")

    const response = await call()

    expect(response.status).toBe(500)
    expect(await response.json()).toEqual({
      error: "Database down",
      amount: 100,
    })
  })
})
