import "server-only"

import { adminDb } from "./firebase-admin"

export const validatePlayerId = (id: string) => {
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

export const savePlayer = async (
  player: Player,
  logMessage?: string,
  { resetHistory = false }: { resetHistory?: boolean } = {}
) => {
  validatePlayerId(player.id)
  const updates: Record<string, unknown> = {}

  updates[`players/${player.id}`] = player

  if (resetHistory) {
    updates[`logs/${player.id}`] = null
    updates[`statistics/${player.id}`] = null
  }

  if (logMessage) {
    const pushRef = adminDb.ref(`logs/${player.id}`).push()
    const key = pushRef.key

    if (key) {
      const entry: LogEntry = {
        message: logMessage,
        day: player.character.day,
        timestamp: Date.now(),
      }

      if (resetHistory) {
        updates[`logs/${player.id}`] = { [key]: entry }
      } else {
        updates[`logs/${player.id}/${key}`] = entry
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

/**
 * One snapshot of the player's progress. Fields other than timestamp, day and
 * score are missing on entries saved before they were collected.
 */
export type StatisticsEntry = {
  timestamp: number
  day: number
  score: number
  netWorth?: number
  scoreTitle?: number
  scoreWealth?: number
  scoreShips?: number
  scoreCannons?: number
  mannedCannons?: number
  cannons?: number
  battlesWon?: number
  battlesLost?: number
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
