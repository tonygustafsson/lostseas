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

  const result = data.val() as Player

  result.ships = sortByDate<Ship>(result.ships) ?? {}
  result.crewMembers = sortByDate<CrewMember>(result.crewMembers) ?? {}

  return result
}
