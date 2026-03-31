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

  if (!numberOfSailors) {
    return NextResponse.json({ error: "No sailors to ignore" }, { status: 500 })
  }

  const dbUpdate = {
    "locationStates/tavern/noOfSailors": 0,
  }

  try {
    const updatedPlayer = await savePlayer(playerId, dbUpdate)

    return NextResponse.json({ success: true, updatedPlayer, numberOfSailors })
  } catch (error) {
    return NextResponse.json({ error, numberOfSailors }, { status: 500 })
  }
}
