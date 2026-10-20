import { beforeEach, describe, expect, it, vi } from "vitest"

import { GET as getLogs } from "@/app/api/logs/get/route"
import { GET as getStatistics } from "@/app/api/statistics/get/route"
import { GET as getUser } from "@/app/api/user/get/route"
import { GET as getRandomCharacter } from "@/app/api/user/getRandomCharacter/route"
import { POST as login } from "@/app/api/user/login/route"
import { POST as logout } from "@/app/api/user/logout/route"
import { POST as register } from "@/app/api/user/register/route"
import { POST as reset } from "@/app/api/user/reset/route"
import { TOWNS } from "@/constants/locations"
import {
  MUSIC_STATE_COOKIE_NAME,
  PLAYER_ID_COOKIE_NAME,
  SOUND_EFFECTS_STATE_COOKIE_NAME,
} from "@/constants/system"
import { registrationValidationSchema } from "@/utils/validation"

import { createTestPlayer } from "../helpers/createTestPlayer"

// These routes have no game rules of their own, apart from the starting
// player which is tested in actions/user.test.ts.

const PLAYER_ID = "0b6a3f5e-7c1d-4e8a-9f2b-1a2b3c4d5e6f"

const mocks = vi.hoisted(() => ({
  playerId: undefined as string | undefined,
  player: undefined as Player | undefined,
  savePlayer: vi.fn(),
  saveStatistics: vi.fn(),
  getLog: vi.fn(),
  getStatistics: vi.fn(),
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
  getLog: mocks.getLog,
  getStatistics: mocks.getStatistics,
}))

const request = (body: unknown) =>
  new Request("http://localhost/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

beforeEach(() => {
  vi.clearAllMocks()
  mocks.playerId = PLAYER_ID
  mocks.player = createTestPlayer({ id: PLAYER_ID })
  mocks.savePlayer.mockImplementation(async (player: Player) => player)
  mocks.saveStatistics.mockResolvedValue(undefined)
})

describe.each([
  { name: "user/get", call: getUser, empty: undefined },
  { name: "logs/get", call: getLogs, empty: [] },
  { name: "statistics/get", call: getStatistics, empty: [] },
])("GET /api/$name", ({ name, call, empty }) => {
  it("returns 401 without a player cookie", async () => {
    mocks.playerId = undefined

    expect((await call()).status).toBe(401)
  })

  it("is never cached", async () => {
    mocks.getLog.mockResolvedValue([])
    mocks.getStatistics.mockResolvedValue([])

    const response = await call()

    expect(response.status).toBe(200)
    expect(response.headers.get("Cache-Control")).toBe("no-cache")
  })

  if (empty) {
    it("returns an empty list when nothing is stored", async () => {
      mocks.getLog.mockResolvedValue(null)
      mocks.getStatistics.mockResolvedValue(null)

      expect(await (await call()).json()).toEqual(empty)
    })
  }

  if (name === "user/get") {
    it("returns 401 when the player does not exist", async () => {
      mocks.player = undefined

      expect((await call()).status).toBe(401)
    })

    it("returns the player", async () => {
      expect(await (await call()).json()).toMatchObject({
        id: PLAYER_ID,
        character: mocks.player!.character,
      })
    })
  }
})

describe("GET /api/user/getRandomCharacter", () => {
  it("always suggests a character that can be registered", async () => {
    for (let i = 0; i < 100; i++) {
      const character = await (await getRandomCharacter()).json()

      expect(
        registrationValidationSchema.safeParse({
          ...character,
          musicOn: true,
          soundEffectsOn: true,
        }).success,
        JSON.stringify(character)
      ).toBe(true)
    }
  })
})

describe("POST /api/user/login", () => {
  it("sets the player cookie for an existing player", async () => {
    const response = await login(request({ playerId: PLAYER_ID }))

    expect(response.status).toBe(200)
    expect(response.cookies.get(PLAYER_ID_COOKIE_NAME)?.value).toBe(PLAYER_ID)
    expect(response.cookies.get(PLAYER_ID_COOKIE_NAME)?.sameSite).toBe("lax")
  })

  it("returns 401 for an unknown player", async () => {
    mocks.player = undefined

    const response = await login(request({ playerId: PLAYER_ID }))

    expect(response.status).toBe(401)
    expect(response.cookies.get(PLAYER_ID_COOKIE_NAME)).toBeUndefined()
  })

  it.each(["not-a-uuid", "", undefined, 5])(
    "returns 400 for player id %s",
    async (playerId) => {
      const response = await login(request({ playerId }))

      expect(response.status).toBe(400)
    }
  )
})

describe("POST /api/user/logout", () => {
  it("removes the player cookie", async () => {
    const response = await logout()

    expect(response.status).toBe(200)
    expect(response.cookies.get(PLAYER_ID_COOKIE_NAME)?.value).toBe("")
  })
})

describe("POST /api/user/register", () => {
  const validBody = {
    name: "Anne Bonny",
    nationality: "Holland",
    gender: "Female",
    age: 25,
    musicOn: true,
    soundEffectsOn: false,
  }

  it("creates and saves a new player and logs them in", async () => {
    const response = await register(request(validBody))
    const playerId = await response.json()

    expect(response.status).toBe(200)

    const [savedPlayer, savedLog] = mocks.savePlayer.mock.calls[0]

    expect(savedPlayer.id).toBe(playerId)
    expect(savedPlayer.character).toMatchObject({
      name: "Anne Bonny",
      nationality: "Holland",
      title: "Pirate",
      gold: 300,
    })
    expect(savedLog).toBe("Created new character Anne Bonny.")
    expect(mocks.saveStatistics).toHaveBeenCalledWith(
      playerId,
      expect.objectContaining({ day: 1, gold: 300, crewMembers: 4, ships: 1 })
    )
    expect(response.cookies.get(PLAYER_ID_COOKIE_NAME)?.value).toBe(playerId)
    expect(response.cookies.get(MUSIC_STATE_COOKIE_NAME)?.value).toBe("true")
    expect(response.cookies.get(SOUND_EFFECTS_STATE_COOKIE_NAME)?.value).toBe(
      "false"
    )
  })

  it("still registers when saving statistics fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {})
    mocks.saveStatistics.mockRejectedValue("Statistics down")

    const response = await register(request(validBody))

    expect(response.status).toBe(200)
  })

  it.each([
    { name: "Al" },
    { age: 14 },
    { age: 81 },
    { nationality: "Portugal" },
    { gender: "Other" },
    { musicOn: "yes" },
  ])("returns 400 and saves nothing for %j", async (invalid) => {
    const response = await register(request({ ...validBody, ...invalid }))

    expect(response.status).toBe(400)
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })

  it("returns 500 when saving the player fails", async () => {
    mocks.savePlayer.mockRejectedValue("Database down")

    const response = await register(request(validBody))

    expect(response.status).toBe(500)
  })
})

describe("POST /api/user/reset", () => {
  it("returns 401 without a player cookie", async () => {
    mocks.playerId = undefined

    expect((await reset(request({}))).status).toBe(401)
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })

  it("returns 401 when the player does not exist", async () => {
    mocks.player = undefined

    expect((await reset(request({}))).status).toBe(401)
  })

  it("saves the reset player in a town of their nation", async () => {
    mocks.player = createTestPlayer({
      id: PLAYER_ID,
      character: { name: "Anne Bonny", nationality: "Spain", gold: 50000 },
      crewMembers: { count: 90 },
    })

    const response = await reset(request({}))

    expect(response.status).toBe(200)

    const [savedPlayer, savedLog] = mocks.savePlayer.mock.calls[0]

    expect(savedPlayer.id).toBe(PLAYER_ID)
    expect(savedPlayer.character).toMatchObject({
      name: "Anne Bonny",
      nationality: "Spain",
      title: "Pirate",
      gold: 300,
      day: 1,
    })
    expect(TOWNS[savedPlayer.character.town as Town].nation).toBe("Spain")
    expect(savedPlayer.crewMembers.count).toBe(4)
    expect(savedLog).toBe("Started the game over.")
    expect(mocks.savePlayer.mock.calls[0][2]).toEqual({ resetHistory: true })
    expect(mocks.saveStatistics).toHaveBeenCalledWith(
      PLAYER_ID,
      expect.objectContaining({ day: 1, gold: 300, crewMembers: 4, ships: 1 })
    )
  })

  it.each([undefined, "text/plain", "application/x-www-form-urlencoded"])(
    "rejects a non-JSON reset request (%s) without saving",
    async (contentType) => {
      const response = await reset(
        new Request("http://localhost/api/user/reset", {
          method: "POST",
          headers: contentType ? { "Content-Type": contentType } : {},
        })
      )

      expect(response.status).toBe(415)
      expect(mocks.savePlayer).not.toHaveBeenCalled()
    }
  )

  it("still resets when saving the new statistics fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {})
    mocks.saveStatistics.mockRejectedValue(new Error("Statistics down"))

    expect((await reset(request({}))).status).toBe(200)
    expect(mocks.savePlayer.mock.calls[0][2]).toEqual({ resetHistory: true })
  })

  it("returns 500 when resetting the player and history fails", async () => {
    mocks.savePlayer.mockRejectedValue(new Error("Database down"))

    expect((await reset(request({}))).status).toBe(500)
    expect(mocks.saveStatistics).not.toHaveBeenCalled()
  })
})
