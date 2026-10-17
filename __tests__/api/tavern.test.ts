import { beforeEach, describe, expect, it, vi } from "vitest"

import { POST as acceptNewCrewMembers } from "@/app/api/tavern/acceptNewCrewMembers/route"
import { POST as cards } from "@/app/api/tavern/cards/route"
import { POST as fightSailors } from "@/app/api/tavern/fightSailors/route"
import { POST as ignoreSailors } from "@/app/api/tavern/ignoreSailors/route"
import { POST as treatCrew } from "@/app/api/tavern/treat-crew/route"
import { patchDeep } from "@/utils/patchDeep"

import { createTestPlayer } from "../helpers/createTestPlayer"

// The game rules are tested in actions/tavern.test.ts.
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
  new Request("http://localhost/api/tavern", {
    method: "POST",
    body: JSON.stringify(body),
  })

const tavernPlayer = (isHostile: boolean) =>
  createTestPlayer({
    character: { location: "Tavern", gold: 10_000 },
    locationStates: { tavern: { visited: true, noOfSailors: 3, isHostile } },
  })

const routes = [
  {
    name: "treat-crew",
    call: () => treatCrew(request({ item: "serve-supper" })),
    isHostile: false,
    fields: ["item", "newMood", "newHealth", "totalPrice"],
  },
  {
    name: "acceptNewCrewMembers",
    call: () => acceptNewCrewMembers(),
    isHostile: false,
    fields: ["numberOfSailors", "isHostile"],
  },
  {
    name: "fightSailors",
    call: () => fightSailors(),
    isHostile: true,
    fields: ["numberOfSailors", "healthLoss"],
  },
  {
    name: "ignoreSailors",
    call: () => ignoreSailors(),
    isHostile: true,
    fields: ["numberOfSailors"],
  },
  {
    name: "cards",
    call: () => cards(request({ betPercentage: 10, selectedCard: 0 })),
    isHostile: false,
    fields: ["bet", "cardsResults", "cardsReturns", "correctCard", "gold"],
  },
]

beforeEach(() => {
  vi.clearAllMocks()
  mocks.playerId = "test-player"
  mocks.savePlayer.mockImplementation(async (player: Player) => player)
})

describe.each(routes)(
  "POST /api/tavern/$name",
  ({ name, call, isHostile, fields }) => {
    beforeEach(() => {
      mocks.player = tavernPlayer(isHostile)
    })

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
      mocks.player = patchDeep(mocks.player!, {
        character: { location: "Shop" },
      })

      const response = await call()

      expect(response.status).toBe(400)
      expect(await response.json()).toMatchObject({
        error: "You must be at Tavern to do this.",
      })
      expect(mocks.savePlayer).not.toHaveBeenCalled()
    })

    it("saves the new player and returns it", async () => {
      const response = await call()
      const body = await response.json()

      expect(response.status).toBe(200)
      expect(mocks.savePlayer).toHaveBeenCalledOnce()

      const [savedPlayer, savedLog] = mocks.savePlayer.mock.calls[0]

      expect(savedPlayer).not.toEqual(mocks.player)
      expect(body.updatedPlayer).toEqual(savedPlayer)
      fields.forEach((field) => expect(body).toHaveProperty(field))

      // Ignoring sailors is the only action that is not logged
      expect(typeof savedLog).toBe(
        name === "ignoreSailors" ? "undefined" : "string"
      )
    })

    it("returns 500 when saving fails", async () => {
      mocks.savePlayer.mockRejectedValue("Database down")

      const response = await call()

      expect(response.status).toBe(500)
      expect(await response.json()).toMatchObject({ error: "Database down" })
    })
  }
)

describe("POST /api/tavern/fightSailors", () => {
  it("reports a won fight as success and a lost fight as no success", async () => {
    mocks.player = tavernPlayer(true)
    const spy = vi.spyOn(Math, "random")

    // getRandomInt(1, 10) gives 10 (win), then 1 (loss)
    spy.mockReturnValue(0.99)
    const won = await (await fightSailors()).json()

    spy.mockReturnValue(0)
    const lost = await (await fightSailors()).json()

    spy.mockRestore()

    expect(won).toMatchObject({ success: true, loot: expect.any(Number) })
    expect(lost.success).toBe(false)
    expect(lost).not.toHaveProperty("loot")
  })
})
