import { beforeEach, describe, expect, it, vi } from "vitest"

import { POST as move } from "@/app/api/character/move/route"
import { POST as update } from "@/app/api/character/update/route"

import { createTestPlayer } from "../helpers/createTestPlayer"

// The game rules are tested in actions/character.test.ts.
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
  new Request("http://localhost/api/character", {
    method: "POST",
    body: JSON.stringify(body),
  })

const routes = [
  {
    name: "move",
    call: () => move(request({ location: "Tavern" })),
    invalid: () => move(request({ location: "Moon" })),
  },
  {
    name: "update",
    call: () =>
      update(request({ name: "Anne Bonny", gender: "Female", age: 25 })),
    invalid: () => update(request({ name: "A", gender: "Female", age: 25 })),
  },
]

beforeEach(() => {
  vi.clearAllMocks()
  mocks.playerId = "test-player"
  mocks.player = createTestPlayer()
  mocks.savePlayer.mockImplementation(async (player: Player) => player)
})

describe.each(routes)("POST /api/character/$name", ({ call, invalid }) => {
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
  })

  it("returns 400 with a readable message and saves nothing", async () => {
    const response = await invalid()
    const body = await response.json()

    expect(response.status).toBe(400)
    expect(typeof body.error).toBe("string")
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })

  it("saves the new player once and returns it", async () => {
    const response = await call()
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(mocks.savePlayer).toHaveBeenCalledOnce()
    expect(body).toEqual({
      success: true,
      updatedPlayer: mocks.savePlayer.mock.calls[0][0],
    })
  })

  it("returns 500 when saving fails", async () => {
    mocks.savePlayer.mockRejectedValue("Database down")

    const response = await call()

    expect(response.status).toBe(500)
  })
})

describe("POST /api/character/move", () => {
  it("saves the tavern visit together with the move", async () => {
    await move(request({ location: "Tavern" }))

    const [savedPlayer] = mocks.savePlayer.mock.calls[0]

    expect(savedPlayer.character.location).toBe("Tavern")
    expect(savedPlayer.locationStates.tavern.visited).toBe(true)
  })
})
