import { beforeEach, describe, expect, it, vi } from "vitest"

import { POST as answer } from "@/app/api/npc/answer/route"
import { POST as talk } from "@/app/api/npc/talk/route"

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
  new Request("http://localhost/api/npc", {
    method: "POST",
    body: JSON.stringify(body),
  })

const routes = [
  ["talk", talk, { npcId: "nobody" }],
  ["answer", answer, { npcId: "nobody", answerIndex: 0 }],
] as const

const NPC_ID = "charles-towne-tavern-mavis-cartwright"

beforeEach(() => {
  vi.clearAllMocks()
  mocks.playerId = "test-player"
  mocks.player = createTestPlayer()
  mocks.savePlayer.mockImplementation(async (player: Player) => player)
})

describe.each(routes)("POST /api/npc/%s", (_name, route, body) => {
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

describe("POST /api/npc/talk", () => {
  it("returns 400 for an unknown NPC", async () => {
    const response = await talk(request({ npcId: "nobody" }))

    expect(response.status).toBe(400)
  })

  it("saves the player and returns the line", async () => {
    mocks.player = createTestPlayer({
      character: { town: "Charles Towne", location: "Tavern" },
    })

    const response = await talk(request({ npcId: NPC_ID }))
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(mocks.savePlayer).toHaveBeenCalledTimes(1)
    expect(body.success).toBe(true)
    expect(body.npcId).toBe(NPC_ID)
    expect(body.line.text).toEqual(expect.any(String))
  })
})
