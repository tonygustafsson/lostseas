import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { DELETE as removePasskey } from "@/app/api/user/passkey/[id]/route"
import { POST as loginOptions } from "@/app/api/user/passkey/login-options/route"
import { POST as loginVerify } from "@/app/api/user/passkey/login-verify/route"
import { POST as registerOptions } from "@/app/api/user/passkey/register-options/route"
import { POST as registerVerify } from "@/app/api/user/passkey/register-verify/route"
import {
  PASSKEY_CHALLENGE_COOKIE_NAME,
  PASSKEY_CHALLENGE_TTL_SECONDS,
} from "@/constants/passkey"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"

import { createTestPlayer } from "../helpers/createTestPlayer"

const mocks = vi.hoisted(() => ({
  playerId: "player-1" as string | undefined,
  challengeId: "challenge-id" as string | undefined,
  saveChallenge: vi.fn(),
  consumeChallenge: vi.fn(),
  savePasskey: vi.fn(),
  getPasskey: vi.fn(),
  getPlayer: vi.fn(),
  getPlayerPasskeys: vi.fn(),
  recordPasskeyUse: vi.fn(),
  deletePasskey: vi.fn(),
  generateAuthenticationOptions: vi.fn(),
  generateRegistrationOptions: vi.fn(),
  verifyAuthenticationResponse: vi.fn(),
  verifyRegistrationResponse: vi.fn(),
}))

vi.mock("server-only", () => ({}))
vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) => {
      const value =
        name === PLAYER_ID_COOKIE_NAME ? mocks.playerId : mocks.challengeId
      return value ? { value } : undefined
    },
  }),
}))
vi.mock("@/firebase/db", () => ({
  getPlayer: mocks.getPlayer,
}))
vi.mock("@/firebase/passkeys-db", () => ({
  saveChallenge: mocks.saveChallenge,
  consumeChallenge: mocks.consumeChallenge,
  savePasskey: mocks.savePasskey,
  getPasskey: mocks.getPasskey,
  getPlayerPasskeys: mocks.getPlayerPasskeys,
  recordPasskeyUse: mocks.recordPasskeyUse,
  deletePasskey: mocks.deletePasskey,
}))
vi.mock("@simplewebauthn/server", () => ({
  generateAuthenticationOptions: mocks.generateAuthenticationOptions,
  generateRegistrationOptions: mocks.generateRegistrationOptions,
  verifyAuthenticationResponse: mocks.verifyAuthenticationResponse,
  verifyRegistrationResponse: mocks.verifyRegistrationResponse,
}))

const request = (contentType: string | undefined = "application/json") =>
  new Request("https://game.example/api/user/passkey", {
    method: "POST",
    headers: contentType ? { "Content-Type": contentType } : {},
    body: JSON.stringify({ id: "credential-id" }),
  })

beforeEach(() => {
  vi.resetAllMocks()
  vi.stubEnv("WEBAUTHN_ORIGIN", undefined)
  mocks.playerId = "player-1"
  mocks.challengeId = "challenge-id"
  mocks.getPlayer.mockResolvedValue(createTestPlayer({ id: "player-1" }))
  mocks.getPlayerPasskeys.mockResolvedValue([])
  mocks.generateAuthenticationOptions.mockResolvedValue({
    challenge: "login-challenge",
  })
  mocks.generateRegistrationOptions.mockResolvedValue({
    challenge: "registration-challenge",
  })
  mocks.consumeChallenge.mockResolvedValue({
    challenge: "challenge-value",
    playerId: "player-1",
  })
  mocks.savePasskey.mockResolvedValue(true)
  mocks.verifyRegistrationResponse.mockResolvedValue({
    verified: true,
    registrationInfo: {
      credential: {
        id: "credential-id",
        publicKey: new Uint8Array([1, 2, 3]),
        counter: 0,
      },
      credentialDeviceType: "multiDevice",
      credentialBackedUp: true,
    },
  })
  mocks.getPasskey.mockResolvedValue({
    playerId: "player-1",
    publicKey: "AQID",
    counter: 0,
  })
  mocks.verifyAuthenticationResponse.mockResolvedValue({
    verified: true,
    authenticationInfo: { newCounter: 1 },
  })
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
})

describe.each([
  { name: "login-options", call: loginOptions },
  { name: "register-options", call: registerOptions },
  { name: "login-verify", call: loginVerify },
  { name: "register-verify", call: registerVerify },
  {
    name: "remove",
    call: (req: Request) =>
      removePasskey(req, { params: Promise.resolve({ id: "credential-id" }) }),
  },
])("passkey $name", ({ call }) => {
  it.each(["", "text/plain", "application/x-www-form-urlencoded"])(
    "rejects non-JSON requests (%s) before changing any state",
    async (contentType) => {
      expect((await call(request(contentType))).status).toBe(415)
      expect(mocks.saveChallenge).not.toHaveBeenCalled()
      expect(mocks.consumeChallenge).not.toHaveBeenCalled()
      expect(mocks.savePasskey).not.toHaveBeenCalled()
      expect(mocks.deletePasskey).not.toHaveBeenCalled()
      expect(mocks.recordPasskeyUse).not.toHaveBeenCalled()
    }
  )
})

describe.each([
  { call: loginOptions, challenge: "login-challenge", playerId: undefined },
  {
    call: registerOptions,
    challenge: "registration-challenge",
    playerId: "player-1",
  },
])("passkey options ($challenge)", ({ call, challenge, playerId }) => {
  it("returns a JSON error when challenge storage fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {})
    mocks.saveChallenge.mockRejectedValue(new Error("Database unavailable"))

    const response = await call(request())

    expect(response.status).toBe(500)
    expect(response.headers.get("content-type")).toContain("application/json")
    expect(await response.json()).toEqual({ error: expect.any(String) })
    expect(response.cookies.get(PASSKEY_CHALLENGE_COOKIE_NAME)?.value).toBe("")
  })

  it("uses shared expiring challenge storage and a strict httpOnly cookie", async () => {
    const response = await call(request("application/json; charset=utf-8"))

    expect(response.status).toBe(200)
    const [challengeId, saved] = mocks.saveChallenge.mock.calls[0]
    expect(saved).toMatchObject({ challenge, expires: expect.any(Number) })
    expect(saved.playerId).toBe(playerId)
    expect(saved.expires).toBeGreaterThan(Date.now())
    expect(response.cookies.get(PASSKEY_CHALLENGE_COOKIE_NAME)).toMatchObject({
      value: challengeId,
      httpOnly: true,
      sameSite: "strict",
      maxAge: PASSKEY_CHALLENGE_TTL_SECONDS,
    })
  })
})

describe("passkey registration", () => {
  it("saves the verified credential for the player", async () => {
    const response = await registerVerify(request())

    expect(response.status).toBe(200)
    expect(mocks.savePasskey).toHaveBeenCalledWith(
      "credential-id",
      expect.objectContaining({ playerId: "player-1", publicKey: "AQID" })
    )
    expect(response.cookies.get(PASSKEY_CHALLENGE_COOKIE_NAME)?.value).toBe("")
  })

  it("returns a conflict when the credential already exists", async () => {
    mocks.savePasskey.mockResolvedValue(false)

    const response = await registerVerify(request())

    expect(response.status).toBe(409)
    expect(await response.json()).toEqual({
      error: "Passkey already registered",
    })
  })

  it("rejects a registration challenge belonging to another player", async () => {
    mocks.consumeChallenge.mockResolvedValue({
      challenge: "challenge-value",
      playerId: "another-player",
    })

    expect((await registerVerify(request())).status).toBe(400)
    expect(mocks.savePasskey).not.toHaveBeenCalled()
    expect(mocks.verifyRegistrationResponse).not.toHaveBeenCalled()
  })

  it("requires the player cookie", async () => {
    mocks.playerId = undefined

    expect((await registerVerify(request())).status).toBe(401)
    expect((await registerOptions(request())).status).toBe(401)
    expect(mocks.savePasskey).not.toHaveBeenCalled()
  })
})

describe("passkey sign-in", () => {
  it("sets the player cookie with SameSite=Lax after verification", async () => {
    const response = await loginVerify(request())

    expect(response.status).toBe(200)
    expect(response.cookies.get(PLAYER_ID_COOKIE_NAME)).toMatchObject({
      value: "player-1",
      sameSite: "lax",
    })
    expect(mocks.recordPasskeyUse).toHaveBeenCalledWith("credential-id", 1)
  })

  it("rejects a consumed or expired challenge before verification", async () => {
    mocks.consumeChallenge.mockResolvedValue(null)

    expect((await loginVerify(request())).status).toBe(400)
    expect(mocks.verifyAuthenticationResponse).not.toHaveBeenCalled()
    expect(mocks.recordPasskeyUse).not.toHaveBeenCalled()
  })
})
