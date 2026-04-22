import "server-only"

import { adminDb } from "./firebase-admin"

type LogEntry = {
  timestamp: number
  day: number
  type: "bank_deposit" | "bank_withdrawal" | "bank_loan" | "bank_repay"
  message: string
}

export const getPlayer = async (playerId: Player["id"]) => {
  const snapshot = await adminDb.ref(`players/${playerId}`).get()

  return snapshot.exists() ? (snapshot.val() as Player) : null
}

export const savePlayer = async (player: Player) => {
  await adminDb.ref(`players/${player.id}`).update(player)
  const snapshot = await adminDb.ref(`players/${player.id}`).get()

  return snapshot.val() as Player
}

export const addLog = async (
  playerId: Player["id"],
  entry: Omit<LogEntry, "timestamp">
) => {
  await adminDb.ref(`logs/${playerId}`).push({
    ...entry,
    timestamp: Date.now(),
  })
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
