import { child, get, ref } from "firebase/database"

import db from "@/firebase/db"

import { sortByDate } from "../sort"

export const getPlayer = async (playerId: Player["id"] | undefined) => {
  if (!playerId) {
    return null
  }

  const dbRef = ref(db)
  const data = await get(child(dbRef, playerId))

  if (!data.exists()) {
    return null
  }

  const player = data.val() as Player

  player.id = playerId
  player.ships = sortByDate<Ship>(player.ships) ?? {}
  player.crewMembers = sortByDate<CrewMember>(player.crewMembers) ?? {}

  return player
}
