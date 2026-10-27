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

export type LogEntry = {
  timestamp: number
  day: number
  message: string
  /** Missing on entries saved before log types existed */
  type?: LogType
}

export type LogRecord = LogEntry & { id: string }

/** Where the next page of older entries starts, the oldest entry shown so far */
export type LogCursor = Pick<LogRecord, "timestamp" | "id">

export type LogPage = { entries: LogRecord[]; hasMore: boolean }

export const LOG_PAGE_SIZE = 100

export const getPlayer = async (playerId: Player["id"]) => {
  validatePlayerId(playerId)
  const snapshot = await adminDb.ref(`players/${playerId}`).get()

  return snapshot.exists() ? (snapshot.val() as Player) : null
}

export const savePlayer = async (
  player: Player,
  log?: GameLog,
  { resetHistory = false }: { resetHistory?: boolean } = {}
) => {
  validatePlayerId(player.id)
  const updates: Record<string, unknown> = {}

  updates[`players/${player.id}`] = player

  if (resetHistory) {
    updates[`logs/${player.id}`] = null
    updates[`statistics/${player.id}`] = null
  }

  if (log) {
    const pushRef = adminDb.ref(`logs/${player.id}`).push()
    const key = pushRef.key

    if (key) {
      const entry: LogEntry = {
        type: log.type,
        message: log.message,
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

/** The newest page of entries, or the page just older than the cursor */
export const getLog = async (
  playerId: Player["id"],
  before?: LogCursor
): Promise<LogPage> => {
  validatePlayerId(playerId)
  const ordered = adminDb.ref(`logs/${playerId}`).orderByChild("timestamp")

  // One extra entry tells whether there is anything older than this page
  const snapshot = await (
    before ? ordered.endBefore(before.timestamp, before.id) : ordered
  )
    .limitToLast(LOG_PAGE_SIZE + 1)
    .get()

  if (!snapshot.exists()) return { entries: [], hasMore: false }

  const logs = snapshot.val() as Record<string, LogEntry>

  const entries = Object.entries(logs)
    .map(([id, entry]): LogRecord => ({ ...entry, id }))
    .sort((a, b) => a.timestamp - b.timestamp)

  return {
    entries: entries.slice(-LOG_PAGE_SIZE),
    hasMore: entries.length > LOG_PAGE_SIZE,
  }
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
