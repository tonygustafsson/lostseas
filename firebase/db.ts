import "server-only"

import { adminDb } from "./firebase-admin"

type LogEntry = {
  timestamp: number
  day: number
  message: string
}

export const getPlayer = async (playerId: Player["id"]) => {
  const snapshot = await adminDb.ref(`players/${playerId}`).get()

  return snapshot.exists() ? (snapshot.val() as Player) : null
}

export const savePlayer = async (player: Player, logMessage?: string) => {
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
  const snapshot = await adminDb
    .ref(`logs/${playerId}`)
    .orderByChild("timestamp")
    .limitToLast(100)
    .get()

  if (!snapshot.exists()) return []

  const logs = snapshot.val() as Record<string, LogEntry>

  return Object.values(logs).sort((a, b) => a.timestamp - b.timestamp)
}
