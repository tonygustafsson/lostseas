import { beforeEach, describe, expect, it, vi } from "vitest"

import { POST as attackShip } from "@/app/api/sea/attackShip/route"
import { POST as battleMove } from "@/app/api/sea/battleMove/route"
import { POST as continueJourney } from "@/app/api/sea/continueJourney/route"
import { POST as ignoreShip } from "@/app/api/sea/ignoreShip/route"
import { POST as startJourney } from "@/app/api/sea/startJourney/route"
import { patchDeep } from "@/utils/patchDeep"

import { createTestPlayer } from "../helpers/createTestPlayer"

// The game rules are tested in actions/sea.test.ts.
// These tests only check what the routes add: auth, saving and responses.

const mocks = vi.hoisted(() => ({
  playerId: "test-player" as string | undefined,
  player: undefined as Player | undefined,
  savePlayer: vi.fn(),
  saveStatistics: vi.fn(),
}))

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: () => (mocks.playerId ? { value: mocks.playerId } : undefined),
  }),
}))

vi.mock("@/firebase/db", () => ({
  getPlayer: async () => mocks.player,
  savePlayer: mocks.savePlayer,
  saveStatistics: mocks.saveStatistics,
}))

const request = (body: unknown) =>
  new Request("http://localhost/api/sea", {
    method: "POST",
    body: JSON.stringify(body),
  })

const shipMeeting: ShipMeetingState = {
  nation: "Spain",
  shipType: "Brig",
  crewMembers: 4,
  cannons: 2,
}

const inPort = () =>
  createTestPlayer({
    character: { location: "Harbor" },
    crewMembers: { count: 10, health: 100, mood: 80 },
    inventory: { food: 50, water: 100, cannons: 5 },
  })

const atSea = (sea: Partial<SeaState> = {}) =>
  createTestPlayer({
    character: {
      town: null,
      location: "Sea",
      journey: { destination: "Havana", day: 3, totalDays: 7 },
    },
    crewMembers: { count: 10, health: 90, mood: 50 },
    inventory: { food: 50, water: 100, cannons: 5 },
    locationStates: { sea: { shipMeeting: null, ...sea } },
  })

const routes = [
  {
    name: "startJourney",
    call: () => startJourney(request({ town: "Havana" })),
    player: inPort,
    invalid: (player: Player) =>
      patchDeep<Player>(player, { character: { location: "Sea" } }),
    error: "You can only start a journey from land.",
    status: 400,
    log: expect.stringMatching(/^Started journey to Havana/),
    body: { success: true },
  },
  {
    name: "continueJourney",
    call: () => continueJourney(),
    player: () => atSea({ justMetAShip: true }),
    invalid: () => atSea({ shipMeeting }),
    error: "Attack or ignore the ship before sailing on.",
    status: 409,
    log: undefined,
    body: {
      success: true,
      day: 4,
      totalDays: 7,
      destination: "Havana",
      destinationReached: false,
      shipMeetingState: null,
    },
  },
  {
    name: "attackShip",
    call: () => attackShip(),
    player: () => atSea({ shipMeeting }),
    invalid: () => atSea(),
    error: "You are not currently meeting a ship",
    status: 400,
    log: "Attacked a ship from Spain.",
    body: {
      success: true,
      battle: { enemyStrength: 100, playerStrength: 100, rounds: [] },
    },
  },
  {
    name: "ignoreShip",
    call: () => ignoreShip(),
    player: () => atSea({ shipMeeting }),
    invalid: () => atSea(),
    error: "You are not currently meeting a ship",
    status: 400,
    log: undefined,
    body: { success: true },
  },
  {
    name: "battleMove",
    call: () => battleMove(request({ action: "evade" })),
    player: () =>
      atSea({
        shipMeeting,
        battle: { enemyStrength: 100, playerStrength: 100 },
      }),
    invalid: () => atSea({ shipMeeting }),
    error: "You are not currently in a battle",
    status: 409,
    log: undefined,
    body: { outcome: "ongoing", round: expect.any(Object) },
  },
]

beforeEach(() => {
  vi.clearAllMocks()
  mocks.playerId = "test-player"
  mocks.savePlayer.mockImplementation(async (player: Player) => player)
})

describe.each(routes)(
  "POST /api/sea/$name",
  ({ call, player, invalid, error, status, log, body }) => {
    beforeEach(() => {
      mocks.player = player()
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

    it(`returns ${status} with the game error and saves nothing`, async () => {
      mocks.player = invalid(mocks.player!)

      const response = await call()

      expect(response.status).toBe(status)
      expect(await response.json()).toEqual({ error })
      expect(mocks.savePlayer).not.toHaveBeenCalled()
    })

    it("saves the new player and responds", async () => {
      const response = await call()

      expect(response.status).toBe(200)
      expect(await response.json()).toEqual(body)
      expect(mocks.savePlayer).toHaveBeenCalledOnce()

      const [savedPlayer, savedLog] = mocks.savePlayer.mock.calls[0]

      expect(savedPlayer).not.toEqual(mocks.player)
      expect(savedLog).toEqual(log)
    })

    it("returns 500 when saving fails", async () => {
      mocks.savePlayer.mockRejectedValue("Database down")

      const response = await call()

      expect(response.status).toBe(500)
      expect(await response.json()).toEqual({ error: "Database down" })
    })
  }
)

describe("POST /api/sea/startJourney", () => {
  it("answers success false without saving when the advisor blocks travel", async () => {
    mocks.player = patchDeep<Player>(inPort(), { inventory: { food: 0 } })

    const response = await startJourney(request({ town: "Havana" }))

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ success: false })
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })
})

describe("POST /api/sea/continueJourney", () => {
  it("saves statistics only on arrival", async () => {
    mocks.player = patchDeep<Player>(atSea(), {
      character: { journey: { day: 7 } },
    })

    await continueJourney()

    expect(mocks.saveStatistics).toHaveBeenCalledOnce()
    expect(mocks.saveStatistics).toHaveBeenCalledWith(
      "test-player",
      expect.objectContaining({ ships: 1, crewMembers: 10 })
    )

    vi.clearAllMocks()
    mocks.player = atSea({ justMetAShip: true })

    await continueJourney()

    expect(mocks.saveStatistics).not.toHaveBeenCalled()
  })

  it("still arrives when saving statistics fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {})
    mocks.saveStatistics.mockRejectedValue("Statistics down")
    mocks.player = patchDeep<Player>(atSea(), {
      character: { journey: { day: 7 } },
    })

    const response = await continueJourney()

    expect(response.status).toBe(200)
    expect((await response.json()).destinationReached).toBe(true)
  })
})
