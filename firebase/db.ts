import "server-only"

import { getLeaderboardEntry, getStatisticsSnapshot } from "@/utils/statistics"

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
  type: LogType
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

type SavePlayerOptions = {
  /** Clears the log book and statistics, for a new game */
  resetHistory?: boolean
  /** Adds a statistics snapshot, used for the charts */
  withStatistics?: boolean
}

/** Saves the player with its log entry and statistics in one atomic write */
export const savePlayer = async (
  player: Player,
  log?: GameLog,
  { resetHistory = false, withStatistics = false }: SavePlayerOptions = {}
) => {
  validatePlayerId(player.id)
  const updates: Record<string, unknown> = {}

  updates[`players/${player.id}`] = player
  updates[`leaderboard/${player.id}`] = getLeaderboardEntry(player)

  if (resetHistory) {
    updates[`logs/${player.id}`] = null
    updates[`statistics/${player.id}`] = null
  }

  // After a reset the new entry replaces the whole list instead of joining it
  const addEntry = (node: "logs" | "statistics", entry: unknown) => {
    const key = adminDb.ref(`${node}/${player.id}`).push().key

    if (!key) {
      return
    }

    if (resetHistory) {
      updates[`${node}/${player.id}`] = { [key]: entry }
    } else {
      updates[`${node}/${player.id}/${key}`] = entry
    }
  }

  const timestamp = Date.now()

  if (log) {
    addEntry("logs", {
      type: log.type,
      message: log.message,
      day: player.character.day,
      timestamp,
    } satisfies LogEntry)
  }

  if (withStatistics) {
    addEntry("statistics", {
      ...getStatisticsSnapshot(player),
      timestamp,
    } satisfies StatisticsEntry)
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

/** One snapshot of the player's progress, drawn on the charts */
export type StatisticsEntry = {
  timestamp: number
  day: number
  score: number
  netWorth: number
  scoreTitle: number
  scoreWealth: number
  scoreShips: number
  scoreCannons: number
  mannedCannons: number
  cannons: number
  battlesWon: number
  battlesLost: number
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

/** The public part of a player shown on the start page leaderboard */
export type LeaderboardEntry = {
  name: Character["name"]
  characterId: Character["characterId"]
  title: Title
  nationality: Nation
  score: number
  day: number
}

export const LEADERBOARD_SIZE = 10

/** The highest scoring captains, best first. Player ids sign players in, so they are left out. */
export const getLeaderboard = async () => {
  const snapshot = await adminDb
    .ref("leaderboard")
    .orderByChild("score")
    .limitToLast(LEADERBOARD_SIZE)
    .get()

  if (!snapshot.exists()) {
    return []
  }

  const entries = snapshot.val() as Record<string, LeaderboardEntry>

  return Object.values(entries).sort((a, b) => b.score - a.score)
}
