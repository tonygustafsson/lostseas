import { beforeEach, describe, expect, it, vi } from "vitest"

import { POST as save } from "@/app/api/godmode/save/route"
import { GET as status } from "@/app/api/godmode/status/route"
import { POST as unlock } from "@/app/api/godmode/unlock/route"
import { GOD_MODE_COOKIE_NAME } from "@/constants/system"

import { createTestPlayer } from "../helpers/createTestPlayer"

// The validation is tested in actions/godMode.test.ts.
// These tests check the access rules and what the routes add.

const SECRET = "open sesame"

const mocks = vi.hoisted(() => ({
  cookies: {} as Record<string, string>,
  player: undefined as Player | undefined,
  savePlayer: vi.fn(),
  saveStatistics: vi.fn(),
}))

vi.mock("server-only", () => ({}))

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) =>
      mocks.cookies[name] ? { value: mocks.cookies[name] } : undefined,
  }),
}))

vi.mock("@/firebase/db", () => ({
  getPlayer: async () => mocks.player,
  savePlayer: mocks.savePlayer,
  saveStatistics: mocks.saveStatistics,
}))

const request = (body: unknown) =>
  new Request("http://localhost/api/godmode", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

/** Unlocks god mode and returns the cookie value the server hands out. */
const getGodModeCookie = async () => {
  const res = await unlock(request({ passphrase: SECRET }))

  return res.cookies.get(GOD_MODE_COOKIE_NAME)?.value as string
}

beforeEach(() => {
  vi.stubEnv("GOD_MODE_SECRET", SECRET)
  mocks.cookies = { "lostseas-player": "test-player" }
  mocks.player = createTestPlayer()
  mocks.savePlayer.mockReset().mockImplementation(async (player) => player)
  mocks.saveStatistics.mockReset()
})

describe("unlock", () => {
  it("sets an httpOnly cookie for the right passphrase", async () => {
    const res = await unlock(request({ passphrase: SECRET }))
    const cookie = res.cookies.get(GOD_MODE_COOKIE_NAME)

    expect(res.status).toBe(200)
    expect(cookie?.value).toBeTruthy()
    expect(cookie?.httpOnly).toBe(true)
  })

  it("returns 404 for a wrong passphrase", async () => {
    const res = await unlock(request({ passphrase: "nope" }))

    expect(res.status).toBe(404)
    expect(res.cookies.get(GOD_MODE_COOKIE_NAME)).toBeUndefined()
  })

  it("returns 404 when no secret is configured", async () => {
    vi.stubEnv("GOD_MODE_SECRET", "")

    const res = await unlock(request({ passphrase: "" }))

    expect(res.status).toBe(404)
  })
})

describe("status", () => {
  it("returns 404 without the cookie", async () => {
    expect((await status()).status).toBe(404)
  })

  it("returns 200 with a valid cookie", async () => {
    mocks.cookies[GOD_MODE_COOKIE_NAME] = await getGodModeCookie()

    expect((await status()).status).toBe(200)
  })

  it("returns 404 for a tampered cookie", async () => {
    const [expires] = (await getGodModeCookie()).split(".")

    mocks.cookies[GOD_MODE_COOKIE_NAME] = `${expires}.${"0".repeat(64)}`

    expect((await status()).status).toBe(404)
  })

  it("returns 404 for an expired cookie", async () => {
    const cookie = await getGodModeCookie()

    vi.useFakeTimers()
    vi.setSystemTime(Date.now() + 13 * 60 * 60 * 1000)
    mocks.cookies[GOD_MODE_COOKIE_NAME] = cookie

    try {
      expect((await status()).status).toBe(404)
    } finally {
      vi.useRealTimers()
    }
  })
})

describe("save", () => {
  it("returns 404 without the god mode cookie", async () => {
    const res = await save(request(createTestPlayer()))

    expect(res.status).toBe(404)
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })

  it("saves the submitted player as the logged in player", async () => {
    mocks.cookies[GOD_MODE_COOKIE_NAME] = await getGodModeCookie()

    const res = await save(
      request({
        ...createTestPlayer({ character: { gold: 5000 } }),
        id: "someone-else",
      })
    )

    expect(res.status).toBe(200)
    expect(mocks.savePlayer).toHaveBeenCalledOnce()
    expect(mocks.savePlayer.mock.calls[0][0]).toMatchObject({
      id: "test-player",
      character: { gold: 5000 },
    })
  })

  it("returns 400 for an invalid player", async () => {
    mocks.cookies[GOD_MODE_COOKIE_NAME] = await getGodModeCookie()

    const res = await save(request({ character: {} }))

    expect(res.status).toBe(400)
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })

  it("returns 401 without a player cookie", async () => {
    mocks.cookies[GOD_MODE_COOKIE_NAME] = await getGodModeCookie()
    delete mocks.cookies["lostseas-player"]

    const res = await save(request(createTestPlayer()))

    expect(res.status).toBe(401)
  })
})
