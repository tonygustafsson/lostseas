import { beforeEach, describe, expect, it, vi } from "vitest"

import { POST as abandon } from "@/app/api/quest/abandon/route"
import { POST as accept } from "@/app/api/quest/accept/route"
import { POST as decline } from "@/app/api/quest/decline/route"
import { POST as handIn } from "@/app/api/quest/handin/route"

import { createTestPlayer } from "../helpers/createTestPlayer"

// The game rules are tested in actions/npc.test.ts.
// These tests only check what the routes add: auth, saving and responses.

const mocks = vi.hoisted(() => ({
  playerId: "test-player" as string | undefined,
  player: undefined as Player | undefined,
  savePlayer: vi.fn(),
}))

vi.mock("server-only", () => ({}))

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: () => (mocks.playerId ? { value: mocks.playerId } : undefined),
  }),
}))

vi.mock("@/firebase/db", () => ({
  getPlayer: async () => mocks.player,
  savePlayer: mocks.savePlayer,
}))

const request = (body: object) =>
  new Request("http://localhost/api/quest", {
    method: "POST",
    body: JSON.stringify(body),
  })

const routes = [
  ["accept", accept, { npcId: "nobody" }],
  ["decline", decline, { npcId: "nobody" }],
  ["handin", handIn, { npcId: "nobody" }],
  ["abandon", abandon, { questId: "missing" }],
] as const

const quest: Quest = {
  id: "quest-1",
  giverId: "charles-towne-tavern-mavis-cartwright",
  acceptedDay: 1,
  pitch: "Take this crate.",
  reward: { gold: 100 },
  type: "delivery",
  parcel: "a crate",
  targetNpcId: "other",
}

beforeEach(() => {
  vi.clearAllMocks()
  mocks.playerId = "test-player"
  mocks.player = createTestPlayer()
  mocks.savePlayer.mockImplementation(async (player: Player) => player)
})

describe.each(routes)("POST /api/quest/%s", (_name, route, body) => {
  it("returns 401 without a player cookie", async () => {
    mocks.playerId = undefined

    const response = await route(request(body))

    expect(response.status).toBe(401)
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })

  it("returns 401 when the player does not exist", async () => {
    mocks.player = undefined

    const response = await route(request(body))

    expect(response.status).toBe(401)
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })

  it("returns the action error and saves nothing", async () => {
    const response = await route(request(body))

    expect(response.status).toBeGreaterThanOrEqual(400)
    expect(await response.json()).toHaveProperty("error")
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })
})

describe("POST /api/quest/abandon", () => {
  beforeEach(() => {
    mocks.player = createTestPlayer({ quests: { [quest.id]: quest } })
  })

  it("passes a 404 from the action through", async () => {
    const response = await abandon(request({ questId: "missing" }))

    expect(response.status).toBe(404)
  })

  it("saves the new player with a log and returns it", async () => {
    const response = await abandon(request({ questId: quest.id }))
    const body = await response.json()

    expect(response.status).toBe(200)

    const [savedPlayer, savedLog] = mocks.savePlayer.mock.calls[0]

    expect(savedLog?.type).toBe("quest")
    expect(savedPlayer.quests?.[quest.id]).toBeUndefined()
    expect(body.success).toBe(true)
    expect(body.updatedPlayer).toEqual(savedPlayer)
    expect(body.quest).toEqual(quest)
  })

  it("returns 500 when saving fails", async () => {
    mocks.savePlayer.mockRejectedValue("Database down")

    const response = await abandon(request({ questId: quest.id }))

    expect(response.status).toBe(500)
    expect(await response.json()).toEqual({ error: "Database down" })
  })
})
