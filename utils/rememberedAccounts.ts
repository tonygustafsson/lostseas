export const REMEMBERED_ACCOUNTS_STORAGE_KEY = "lostseas-accounts"

export type RememberedAccount = {
  /** Hash of the player ID, so entries can be matched without storing the ID itself. */
  id: string
  name: string
  characterId: string
  /** Only kept for accounts without a passkey. */
  playerId?: string
  /** Only kept for accounts with a passkey. Picking the account asks for one of these. */
  credentialIds?: string[]
  lastUsed: number
}

const EMPTY: RememberedAccount[] = []

const listeners = new Set<() => void>()

let cachedRaw: string | null = null
let cachedAccounts = EMPTY

const readRaw = () => {
  try {
    return localStorage.getItem(REMEMBERED_ACCOUNTS_STORAGE_KEY)
  } catch {
    return null
  }
}

const parse = (raw: string | null) => {
  if (!raw) return EMPTY

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as RememberedAccount[]) : EMPTY
  } catch {
    return EMPTY
  }
}

// Returns the same array until storage changes, which useSyncExternalStore needs
export const readAccounts = () => {
  const raw = readRaw()

  if (raw !== cachedRaw) {
    cachedRaw = raw
    cachedAccounts = parse(raw).toSorted((a, b) => b.lastUsed - a.lastUsed)
  }

  return cachedAccounts
}

const writeAccounts = (accounts: RememberedAccount[]) => {
  try {
    localStorage.setItem(
      REMEMBERED_ACCOUNTS_STORAGE_KEY,
      JSON.stringify(accounts)
    )
  } catch {
    return
  }

  listeners.forEach((listener) => listener())
}

export const subscribeToAccounts = (listener: () => void) => {
  listeners.add(listener)

  const onStorage = (event: StorageEvent) => {
    if (event.key === REMEMBERED_ACCOUNTS_STORAGE_KEY) listener()
  }

  window.addEventListener("storage", onStorage)

  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", onStorage)
  }
}

export const getAccountKey = async (playerId: Player["id"]) => {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(playerId)
  )

  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("")
}

// A passkey account never keeps its player ID, so the stored entry alone can't sign in
const withSignIn = (
  account: Omit<RememberedAccount, "playerId" | "credentialIds">,
  playerId: Player["id"],
  credentialIds: string[]
): RememberedAccount =>
  credentialIds.length > 0
    ? { ...account, credentialIds }
    : { ...account, playerId }

export type RememberAccountInput = {
  playerId: Player["id"]
  name: string
  characterId: string
  credentialIds: string[]
}

export const rememberAccount = async ({
  playerId,
  name,
  characterId,
  credentialIds,
}: RememberAccountInput) => {
  const id = await getAccountKey(playerId)

  const account = withSignIn(
    { id, name, characterId, lastUsed: Date.now() },
    playerId,
    credentialIds
  )

  writeAccounts([
    account,
    ...readAccounts().filter((existing) => existing.id !== id),
  ])
}

export const updateAccountPasskeys = async (
  playerId: Player["id"],
  credentialIds: string[]
) => {
  const id = await getAccountKey(playerId)

  writeAccounts(
    readAccounts().map((account) =>
      account.id === id
        ? withSignIn(
            {
              id,
              name: account.name,
              characterId: account.characterId,
              lastUsed: account.lastUsed,
            },
            playerId,
            credentialIds
          )
        : account
    )
  )
}

export const forgetAccount = (id: RememberedAccount["id"]) => {
  writeAccounts(readAccounts().filter((account) => account.id !== id))
}
