import { cache } from "react"

import { getPlayer as getPlayerFromDatabase } from "@/firebase/db"

import { sortShipsByDate } from "../sort"

const getPlayerFromDatabaseCached = cache(async (playerId: Player["id"]) =>
  getPlayerFromDatabase(playerId)
)

export const getPlayer = async (playerId: Player["id"] | undefined) => {
  if (!playerId) {
    return null
  }

  const rawPlayer = await getPlayerFromDatabaseCached(playerId)

  if (!rawPlayer) {
    return null
  }

  const player = structuredClone(rawPlayer)

  player.id = playerId
  player.ships = sortShipsByDate<Ship>(player.ships) ?? {}

  // Players saved before weather was stored start out in sunshine
  if (player.character) {
    player.character.weather ??= "sunny"
  }

  return player
}
