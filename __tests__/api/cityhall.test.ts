import { beforeEach, describe, expect, it, vi } from "vitest"

import { POST as acceptNewTitle } from "@/app/api/cityhall/acceptNewTitle/route"
import { POST as changeCitizenship } from "@/app/api/cityhall/changeCitizenship/route"
import { POST as handover } from "@/app/api/cityhall/handover/route"
import { patchDeep } from "@/utils/patchDeep"

import { createTestPlayer } from "../helpers/createTestPlayer"

// The game rules are tested in actions/cityhall.test.ts.
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
  new Request("http://localhost/api/cityhall", {
    method: "POST",
    body: JSON.stringify(body),
  })

const routes = [
  {
    name: "acceptNewTitle",
    call: () => acceptNewTitle(),
    // English player in Port Royale with 15 victories against France
    player: { character: { battles: { France: { won: 15 } } } },
    fields: ["titleInfo", "title"],
  },
  {
    name: "changeCitizenship",
    call: () => changeCitizenship(),
    player: {
      character: { nationality: "Spain", battles: { France: { won: 15 } } },
    },
    fields: ["titleInfo", "title", "newNationality"],
  },
  {
    name: "handover",
    call: () => handover(request({ id: "a" })),
    player: {
      treasures: { a: { id: "a", name: "Inca mask", rewarder: "Port Royale" } },
    },
    fields: ["treasure", "treasureInfo"],
  },
] as const

beforeEach(() => {
  vi.clearAllMocks()
  mocks.playerId = "test-player"
  mocks.savePlayer.mockImplementation(async (player: Player) => player)
})

describe.each(routes)(
  "POST /api/cityhall/$name",
  ({ call, player, fields }) => {
    beforeEach(() => {
      mocks.player = createTestPlayer(
        patchDeep<DeepPartial<Player>>(
          { character: { location: "City hall" } },
          player as DeepPartial<Player>
        )
      )
    })

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
      mocks.player = patchDeep(mocks.player!, {
        character: { location: "Bank" },
      })

      const response = await call()

      expect(response.status).toBe(400)
      expect(await response.json()).toEqual({
        error: "You must be at City hall to do this.",
      })
      expect(mocks.savePlayer).not.toHaveBeenCalled()
    })

    it("saves the new player with a log and returns it", async () => {
      const response = await call()
      const body = await response.json()

      expect(response.status).toBe(200)

      const [savedPlayer, savedLog] = mocks.savePlayer.mock.calls[0]

      expect(savedPlayer).not.toEqual(mocks.player)
      expect(typeof savedLog?.message).toBe("string")
      expect(body).toMatchObject({ success: true, updatedPlayer: savedPlayer })
      fields.forEach((field) => expect(body).toHaveProperty(field))
    })

    it("returns 500 when saving fails", async () => {
      mocks.savePlayer.mockRejectedValue("Database down")

      const response = await call()

      expect(response.status).toBe(500)
      expect(await response.json()).toMatchObject({ error: "Database down" })
    })
  }
)
