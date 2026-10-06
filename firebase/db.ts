import "server-only"

import { adminDb } from "./firebase-admin"

const validatePlayerId = (id: string) => {
  if (
    typeof id !== "string" ||
    !id ||
    /[.#$\[\]/\u0000-\u001f\u007f]/.test(id)
  ) {
    throw new Error("Invalid player ID")
  }
}

type LogEntry = {
  timestamp: number
  day: number
  message: string
}

export const getPlayer = async (playerId: Player["id"]) => {
  validatePlayerId(playerId)
  const snapshot = await adminDb.ref(`players/${playerId}`).get()

  return snapshot.exists() ? (snapshot.val() as Player) : null
}

export const savePlayer = async (player: Player, logMessage?: string) => {
  validatePlayerId(player.id)
  const updates: Record<string, unknown> = {}

  updates[`players/${player.id}`] = player

  if (logMessage) {
    const pushRef = adminDb.ref(`logs/${player.id}`).push()
    const key = pushRef.key

    if (key) {
      updates[`logs/${player.id}/${key}`] = {
        message: logMessage,
        day: player.character.day,
        timestamp: Date.now(),
      }
    }
  }

  await adminDb.ref().update(updates)

  return player
}

export const getLog = async (playerId: Player["id"]) => {
  validatePlayerId(playerId)
  const snapshot = await adminDb
    .ref(`logs/${playerId}`)
    .orderByChild("timestamp")
    .limitToLast(100)
    .get()

  if (!snapshot.exists()) return []

  const logs = snapshot.val() as Record<string, LogEntry>

  return Object.values(logs).sort((a, b) => a.timestamp - b.timestamp)
}

export type StatisticsEntry = {
  timestamp: number
  day: number
  gold: number
  score: number
  crewMembers: number
  ships: number
}

export const getStatistics = async (playerId: Player["id"]) => {
  validatePlayerId(playerId)
  const snapshot = await adminDb
    .ref(`statistics/${playerId}`)
    .orderByChild("timestamp")
    .limitToLast(100)
    .get()

  if (!snapshot.exists()) return []

  const stats = snapshot.val() as Record<string, StatisticsEntry>

  return Object.values(stats).sort((a, b) => a.timestamp - b.timestamp)
}

export const saveStatistics = async (
  playerId: Player["id"],
  statistics: Omit<StatisticsEntry, "timestamp">
) => {
  validatePlayerId(playerId)
  const timestamp = Date.now()
  const updates: Record<string, unknown> = {}

  const pushRef = adminDb.ref(`statistics/${playerId}`).push()
  const key = pushRef.key

  if (key) {
    updates[`statistics/${playerId}/${key}`] = {
      ...statistics,
      timestamp,
    }
  }

  await adminDb.ref().update(updates)

  return { ...statistics, timestamp }
}
