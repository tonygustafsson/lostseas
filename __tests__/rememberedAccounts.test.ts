import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import {
  forgetAccount,
  getAccountKey,
  readAccounts,
  rememberAccount,
  REMEMBERED_ACCOUNTS_STORAGE_KEY,
  subscribeToAccounts,
  updateAccountPasskeys,
} from "@/utils/rememberedAccounts"

const PLAYER_A = "00000000-0000-4000-8000-00000000000a"
const PLAYER_B = "00000000-0000-4000-8000-00000000000b"

let store: Map<string, string>

const stored = () =>
  JSON.parse(store.get(REMEMBERED_ACCOUNTS_STORAGE_KEY) ?? "[]")

beforeEach(() => {
  store = new Map()

  vi.stubGlobal("localStorage", {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, value),
  })
  vi.stubGlobal("window", {
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.useRealTimers()
})

const remember = (playerId: string, credentialIds: string[] = []) =>
  rememberAccount({
    playerId,
    name: `Captain ${playerId.slice(-1)}`,
    characterId: "mateo-salazar",
    credentialIds,
  })

describe("remembered accounts", () => {
  it("stores the player ID for accounts without a passkey", async () => {
    await remember(PLAYER_A)

    expect(stored()).toEqual([
      {
        id: await getAccountKey(PLAYER_A),
        name: "Captain a",
        characterId: "mateo-salazar",
        playerId: PLAYER_A,
        lastUsed: expect.any(Number),
      },
    ])
  })

  it("never stores the player ID for accounts with a passkey", async () => {
    await remember(PLAYER_A, ["credential-1"])

    const [account] = stored()
    expect(account.playerId).toBeUndefined()
    expect(account.credentialIds).toEqual(["credential-1"])
    expect(JSON.stringify(stored())).not.toContain(PLAYER_A)
  })

  it("updates an existing account instead of adding a duplicate", async () => {
    await remember(PLAYER_A)
    await rememberAccount({
      playerId: PLAYER_A,
      name: "Renamed",
      characterId: "silas-harrow",
      credentialIds: [],
    })

    expect(stored()).toHaveLength(1)
    expect(stored()[0]).toMatchObject({
      name: "Renamed",
      characterId: "silas-harrow",
    })
  })

  it("lists the most recently used account first", async () => {
    vi.useFakeTimers()

    vi.setSystemTime(1000)
    await remember(PLAYER_A)
    vi.setSystemTime(2000)
    await remember(PLAYER_B)

    expect(readAccounts().map(({ name }) => name)).toEqual([
      "Captain b",
      "Captain a",
    ])
  })

  it("switches between player ID and passkeys when passkeys change", async () => {
    await remember(PLAYER_A)
    await remember(PLAYER_B)

    await updateAccountPasskeys(PLAYER_A, ["credential-1"])

    const accountA = readAccounts().find(({ name }) => name === "Captain a")
    expect(accountA).toMatchObject({ credentialIds: ["credential-1"] })
    expect(accountA?.playerId).toBeUndefined()

    await updateAccountPasskeys(PLAYER_A, [])

    const restored = readAccounts().find(({ name }) => name === "Captain a")
    expect(restored).toMatchObject({ playerId: PLAYER_A })
    expect(restored?.credentialIds).toBeUndefined()
    expect(readAccounts()).toHaveLength(2)
  })

  it("does not add an account when only passkeys are updated", async () => {
    await updateAccountPasskeys(PLAYER_A, ["credential-1"])

    expect(readAccounts()).toEqual([])
  })

  it("forgets one account and keeps the others", async () => {
    await remember(PLAYER_A)
    await remember(PLAYER_B)

    forgetAccount(await getAccountKey(PLAYER_A))

    expect(readAccounts().map(({ name }) => name)).toEqual(["Captain b"])
  })

  it("notifies subscribers when the list changes", async () => {
    const listener = vi.fn()
    const unsubscribe = subscribeToAccounts(listener)

    await remember(PLAYER_A)
    expect(listener).toHaveBeenCalledOnce()

    unsubscribe()
    await remember(PLAYER_B)
    expect(listener).toHaveBeenCalledOnce()
  })

  it.each(["not json", "{}"])("ignores corrupt storage (%s)", (raw) => {
    store.set(REMEMBERED_ACCOUNTS_STORAGE_KEY, raw)

    expect(readAccounts()).toEqual([])
  })

  it("returns no accounts when storage is unavailable", () => {
    vi.stubGlobal("localStorage", {
      getItem: () => {
        throw new Error("Blocked")
      },
    })

    expect(readAccounts()).toEqual([])
  })
})
