import { beforeEach, describe, expect, it, vi } from "vitest"

import { POST as dismiss } from "@/app/api/crew/dismiss/route"
import { POST as giveGold } from "@/app/api/crew/giveGold/route"
import { POST as giveMedicine } from "@/app/api/crew/giveMedicine/route"

import { createTestPlayer } from "../helpers/createTestPlayer"

// The game rules are tested in actions/crew.test.ts.
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
  new Request("http://localhost/api/crew", {
    method: "POST",
    body: JSON.stringify(body),
  })

const routes = [
  {
    name: "dismiss",
    call: (amount: unknown) => dismiss(request({ count: amount })),
    log: "Dismissed 2 crew members. New crew count is 18.",
    data: { count: 2, newCount: 18 },
  },
  {
    name: "giveGold",
    call: (amount: unknown) => giveGold(request({ gold: amount })),
    log: "Gave 2 gold to crew members, increasing their mood to 50.",
    data: { gold: 2, newMood: 50 },
  },
  {
    name: "giveMedicine",
    call: (amount: unknown) => giveMedicine(request({ medicine: amount })),
    log: "Gave 2 medicine to crew, increasing their health to 51.",
    data: { medicine: 2, newHealth: 51 },
  },
]

beforeEach(() => {
  vi.clearAllMocks()
  mocks.playerId = "test-player"
  mocks.player = createTestPlayer({
    crewMembers: { health: 50, mood: 50 },
    inventory: { medicine: 5 },
  })
  mocks.savePlayer.mockImplementation(async (player: Player) => player)
})

describe.each(routes)("POST /api/crew/$name", ({ call, log, data }) => {
  it("returns 401 without a player cookie", async () => {
    mocks.playerId = undefined

    const response = await call(2)

    expect(response.status).toBe(401)
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })

  it("returns 401 when the player does not exist", async () => {
    mocks.player = undefined

    const response = await call(2)

    expect(response.status).toBe(401)
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })

  it("returns 400, not 500, for an invalid amount and saves nothing", async () => {
    const response = await call("abc")

    expect(response.status).toBe(400)
    expect(await response.json()).toHaveProperty("error")
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })

  it("saves the new player with a log and returns it", async () => {
    const response = await call(2)
    const body = await response.json()

    expect(response.status).toBe(200)

    const [savedPlayer, savedLog] = mocks.savePlayer.mock.calls[0]

    expect(savedLog).toBe(log)
    expect(body).toEqual({ success: true, updatedPlayer: savedPlayer, ...data })
  })

  it("returns 500 when saving fails", async () => {
    mocks.savePlayer.mockRejectedValue("Database down")

    const response = await call(2)

    expect(response.status).toBe(500)
    expect(await response.json()).toMatchObject({ error: "Database down" })
  })
})
