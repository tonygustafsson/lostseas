import { getPlayer as getPlayerFromDatabase } from "@/firebase/db"

import { sortShipsByDate } from "../sort"

export const getPlayer = async (playerId: Player["id"] | undefined) => {
  if (!playerId) {
    return null
  }

  const player = await getPlayerFromDatabase(playerId)

  player.id = playerId
  player.ships = sortShipsByDate<Ship>(player.ships) ?? {}

  return player
}
