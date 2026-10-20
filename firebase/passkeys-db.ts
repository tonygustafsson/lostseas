import "server-only"

import { validatePlayerId } from "./db"
import { adminDb } from "./firebase-admin"

const validateKey = (key: string) => {
  if (typeof key !== "string" || !/^[A-Za-z0-9_-]{1,512}$/.test(key)) {
    throw new Error("Invalid key")
  }
}

export type StoredPasskey = {
  playerId: Player["id"]
  publicKey: string
  counter: number
  transports?: string[]
  deviceType: string
  backedUp: boolean
  createdAt: number
  lastUsedAt?: number
}

export const getPasskey = async (credentialId: string) => {
  validateKey(credentialId)
  const snapshot = await adminDb.ref(`passkeys/${credentialId}`).get()

  return snapshot.exists() ? (snapshot.val() as StoredPasskey) : null
}

export const savePasskey = async (
  credentialId: string,
  passkey: StoredPasskey
) => {
  validateKey(credentialId)
  validatePlayerId(passkey.playerId)
  const { committed } = await adminDb
    .ref(`passkeys/${credentialId}`)
    .transaction((current) => (current === null ? passkey : undefined))

  return committed
}

export const recordPasskeyUse = async (
  credentialId: string,
  counter: number
) => {
  validateKey(credentialId)
  await adminDb
    .ref(`passkeys/${credentialId}`)
    .update({ counter, lastUsedAt: Date.now() })
}

export const deletePasskey = async (credentialId: string) => {
  validateKey(credentialId)
  await adminDb.ref(`passkeys/${credentialId}`).remove()
}

export type PasskeyChallenge = {
  challenge: string
  playerId?: Player["id"]
  expires: number
}

export const saveChallenge = async (
  challengeId: string,
  challenge: PasskeyChallenge
) => {
  validateKey(challengeId)
  // Unlike get(), a one-time listener can query before the expires index is
  // deployed. Firebase still uses the index when it is available.
  const expired = await adminDb
    .ref("passkeyChallenges")
    .orderByChild("expires")
    .endAt(Date.now())
    .once("value")

  if (expired.exists()) {
    const updates: Record<string, null> = {}

    expired.forEach((snapshot) => {
      updates[snapshot.key!] = null
    })

    await adminDb.ref("passkeyChallenges").update(updates)
  }

  await adminDb.ref(`passkeyChallenges/${challengeId}`).set(challenge)
}

// Challenges can only be used once, so they are removed when read.
export const consumeChallenge = async (challengeId: string) => {
  validateKey(challengeId)
  const ref = adminDb.ref(`passkeyChallenges/${challengeId}`)
  let challenge: PasskeyChallenge | null = null
  const { committed } = await ref.transaction((current) => {
    // Reassign on every retry so a request that loses a race returns nothing.
    challenge = current
    // Also return null for an empty local cache so Firebase checks the server.
    return null
  })

  const consumed = challenge as PasskeyChallenge | null

  return committed && consumed && consumed.expires > Date.now()
    ? consumed
    : null
}

export const getPlayerPasskeys = async (playerId: Player["id"]) => {
  validatePlayerId(playerId)
  const snapshot = await adminDb
    .ref("passkeys")
    .orderByChild("playerId")
    .equalTo(playerId)
    .get()

  if (!snapshot.exists()) return []

  const passkeys = snapshot.val() as Record<string, StoredPasskey>

  return Object.entries(passkeys).map(([id, passkey]) => ({ id, ...passkey }))
}
