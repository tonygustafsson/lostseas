import { beforeEach, describe, expect, it, vi } from "vitest"

import {
  consumeChallenge,
  type PasskeyChallenge,
  saveChallenge,
  savePasskey,
  type StoredPasskey,
} from "@/firebase/passkeys-db"

const mocks = vi.hoisted(() => ({
  ref: vi.fn(),
  transaction: vi.fn(),
  update: vi.fn(),
  set: vi.fn(),
  get: vi.fn(),
  once: vi.fn(),
  orderByChild: vi.fn(),
  endAt: vi.fn(),
}))

vi.mock("server-only", () => ({}))
vi.mock("@/firebase/firebase-admin", () => ({
  adminDb: { ref: mocks.ref },
}))

const challenge: PasskeyChallenge = {
  challenge: "challenge-value",
  expires: Date.now() + 60000,
}

const passkey: StoredPasskey = {
  playerId: "player-1",
  publicKey: "key",
  counter: 0,
  deviceType: "multiDevice",
  backedUp: true,
  createdAt: 123,
}

beforeEach(() => {
  vi.resetAllMocks()
  mocks.ref.mockReturnValue(mocks)
  mocks.orderByChild.mockReturnValue(mocks)
  mocks.endAt.mockReturnValue(mocks)
  mocks.get.mockResolvedValue({ exists: () => false })
  mocks.once.mockResolvedValue({ exists: () => false })
})

describe("saveChallenge", () => {
  it("removes expired challenges before storing a new login or registration challenge", async () => {
    mocks.once.mockResolvedValue({
      exists: () => true,
      forEach: (callback: (snapshot: { key: string }) => void) => {
        callback({ key: "expired-login" })
        callback({ key: "expired-registration" })
      },
    })

    await saveChallenge("new-challenge", challenge)

    expect(mocks.orderByChild).toHaveBeenCalledWith("expires")
    expect(mocks.endAt).toHaveBeenCalledWith(expect.any(Number))
    expect(mocks.once).toHaveBeenCalledWith("value")
    expect(mocks.update).toHaveBeenCalledWith({
      "expired-login": null,
      "expired-registration": null,
    })
    expect(mocks.set).toHaveBeenCalledWith(challenge)
    expect(mocks.update.mock.invocationCallOrder[0]).toBeLessThan(
      mocks.set.mock.invocationCallOrder[0]
    )
  })

  it("only stores the new challenge if nothing has expired", async () => {
    await saveChallenge("new-challenge", challenge)

    expect(mocks.update).not.toHaveBeenCalled()
    expect(mocks.set).toHaveBeenCalledWith(challenge)
  })

  it("uses a one-time listener so a missing expiry index does not block sign-in", async () => {
    mocks.get.mockRejectedValue(new Error("Index not defined"))

    await saveChallenge("new-challenge", challenge)

    expect(mocks.get).not.toHaveBeenCalled()
    expect(mocks.once).toHaveBeenCalledWith("value")
    expect(mocks.set).toHaveBeenCalledWith(challenge)
  })
})

describe("consumeChallenge", () => {
  it("handles an empty local cache and returns the challenge only after deletion commits", async () => {
    mocks.transaction.mockImplementation(async (update) => {
      expect(update(null)).toBeNull()
      expect(update(challenge)).toBeNull()
      return { committed: true }
    })

    expect(await consumeChallenge("challenge-id")).toEqual(challenge)
    expect(mocks.ref).toHaveBeenCalledWith("passkeyChallenges/challenge-id")
    expect(mocks.get).not.toHaveBeenCalled()
  })

  it("returns the challenge to only one of two concurrent consumers", async () => {
    let stored: PasskeyChallenge | null = challenge

    mocks.transaction.mockImplementation(async (update) => {
      update(stored)
      // Both requests initially see the same challenge. Firebase retries the
      // second transaction with null after the first deletion commits.
      await Promise.resolve()
      stored = update(stored)
      return { committed: true }
    })

    const results = await Promise.all([
      consumeChallenge("challenge-id"),
      consumeChallenge("challenge-id"),
    ])

    expect(results.filter(Boolean)).toEqual([challenge])
    expect(results.filter((result) => result === null)).toHaveLength(1)
  })

  it.each([null, { ...challenge, expires: 0 }])(
    "does not return a missing or expired challenge (%j)",
    async (stored) => {
      mocks.transaction.mockImplementation(async (update) => {
        expect(update(stored)).toBeNull()
        return { committed: true }
      })

      expect(await consumeChallenge("challenge-id")).toBeNull()
    }
  )

  it("does not return a challenge if the transaction did not commit", async () => {
    mocks.transaction.mockImplementation(async (update) => {
      update(challenge)
      return { committed: false }
    })

    expect(await consumeChallenge("challenge-id")).toBeNull()
  })
})

describe("savePasskey", () => {
  it("creates a credential only when the ID is unused", async () => {
    mocks.transaction.mockImplementation(async (update) => {
      expect(update(null)).toEqual(passkey)
      return { committed: true }
    })

    expect(await savePasskey("credential-id", passkey)).toBe(true)
    expect(mocks.set).not.toHaveBeenCalled()
  })

  it.each(["player-1", "victim"])(
    "refuses to replace a credential already owned by %s, including on retry",
    async (playerId) => {
      mocks.transaction.mockImplementation(async (update) => {
        expect(update(null)).toEqual(passkey)
        expect(update({ ...passkey, playerId })).toBeUndefined()
        return { committed: false }
      })

      expect(await savePasskey("credential-id", passkey)).toBe(false)
      expect(mocks.set).not.toHaveBeenCalled()
    }
  )
})
