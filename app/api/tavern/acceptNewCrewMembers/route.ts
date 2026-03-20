import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"

export async function POST() {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
  }

  const player = await getPlayer(playerId)

  const numberOfSailors = player?.locationStates?.tavern?.noOfSailors || 0
  const isHostile = player?.locationStates?.tavern?.isHostile || false

  if (!numberOfSailors || isHostile) {
    return NextResponse.json({ error: "No sailors to accept" }, { status: 500 })
  }

  const playerResult = {
    ...player,
    crewMembers: {
      ...player.crewMembers,
      count: player.crewMembers.count + numberOfSailors,
    },
    locationStates: {
      ...player.locationStates,
      tavern: {
        ...player.locationStates?.tavern,
        noOfSailors: 0,
      },
    },
  } as Player

  try {
    await savePlayer(playerId, playerResult)
  } catch (error) {
    return NextResponse.json(
      { error, numberOfSailors, isHostile },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true, numberOfSailors, isHostile })
}
