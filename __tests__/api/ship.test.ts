import { beforeEach, describe, expect, it, vi } from "vitest"

import { DELETE as removeShip } from "@/app/api/ship/remove/[id]/route"
import { POST as renameShip } from "@/app/api/ship/rename/[id]/route"
import { POST as repairShip } from "@/app/api/ship/repair/route"
import { patchDeep } from "@/utils/patchDeep"

import { createTestPlayer } from "../helpers/createTestPlayer"

// The game rules are tested in actions/ship.test.ts.
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

const SHIP_ID = "6f1c2a52-3b6e-4b8e-9a51-5d0c2c1e7a11"
const UNKNOWN_ID = "11111111-1111-4111-8111-111111111111"

const request = (body?: unknown) =>
  new Request("http://localhost/api/ship", {
    method: "POST",
    body: body === undefined ? undefined : JSON.stringify(body),
  })

const params = (id: string) => ({ params: Promise.resolve({ id }) })

const routes = [
  {
    name: "remove",
    call: (id: string) => removeShip(request(), params(id)),
    // Removing the last ship is a game error
    invalid: (id: string) => {
      mocks.player = patchDeep<Player>(mocks.player!, {
        ships: { "ship-1": null },
      })

      return removeShip(request(), params(id))
    },
    log: "Removed ship Black Pearl.",
    data: {},
  },
  {
    name: "rename",
    call: (id: string, name = "Queen Anne") =>
      renameShip(request({ name }), params(id)),
    invalid: (id: string) => renameShip(request({ name: "X" }), params(id)),
    log: "Renamed ship Black Pearl to Queen Anne.",
    data: {
      name: "Queen Anne",
      ship: expect.objectContaining({ id: SHIP_ID }),
    },
  },
  {
    name: "repair",
    call: (id: string) => repairShip(request({ id, quantity: 2 })),
    invalid: (id: string) => repairShip(request({ id, quantity: 0 })),
    log: `Used 2 repair kits on ship ${SHIP_ID}.`,
    data: { quantity: 2 },
  },
]

beforeEach(() => {
  vi.clearAllMocks()
  mocks.playerId = "test-player"
  mocks.player = createTestPlayer({
    ships: {
      [SHIP_ID]: {
        id: SHIP_ID,
        name: "Black Pearl",
        type: "Galleon",
        health: 50,
        createdDay: 1,
      },
    },
    inventory: { repairKits: 5 },
  })
  mocks.savePlayer.mockImplementation(async (player: Player) => player)
})

describe.each(routes)(
  "/api/ship/$name",
  ({ name, call, invalid, log, data }) => {
    it("returns 401 without a player cookie", async () => {
      mocks.playerId = undefined

      const response = await call(SHIP_ID)

      expect(response.status).toBe(401)
      expect(mocks.savePlayer).not.toHaveBeenCalled()
    })

    it("returns 401 when the player does not exist", async () => {
      mocks.player = undefined

      const response = await call(SHIP_ID)

      expect(response.status).toBe(401)
    })

    it("returns an error for an unknown ship and saves nothing", async () => {
      const response = await call(UNKNOWN_ID)

      expect(response.status).toBe(name === "repair" ? 400 : 404)
      expect(await response.json()).toEqual({ error: "Ship not found" })
      expect(mocks.savePlayer).not.toHaveBeenCalled()
    })

    it.skipIf(!invalid)(
      "returns 400 with a readable message for invalid input",
      async () => {
        const response = await invalid!(SHIP_ID)
        const body = await response.json()

        expect(response.status).toBe(400)
        expect(typeof body.error).toBe("string")
        expect(mocks.savePlayer).not.toHaveBeenCalled()
      }
    )

    it("saves the new player with a log and returns it", async () => {
      const response = await call(SHIP_ID)
      const body = await response.json()

      expect(response.status).toBe(200)

      const [savedPlayer, savedLog] = mocks.savePlayer.mock.calls[0]

      expect(savedLog?.message).toBe(log)
      expect(body).toEqual({
        success: true,
        updatedPlayer: savedPlayer,
        ...data,
      })
    })

    it("returns 500 when saving fails", async () => {
      mocks.savePlayer.mockRejectedValue("Database down")

      const response = await call(SHIP_ID)

      expect(response.status).toBe(500)
    })
  }
)
