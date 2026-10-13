import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { patchDeep } from "@/utils/patchDeep"
import { startBattle } from "@/utils/seaBattle"

export async function POST() {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const player = await getPlayer(playerId)

  if (!player)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  if (!player.locationStates?.sea?.shipMeeting) {
    return NextResponse.json(
      { error: "You are not currently meeting a ship" },
      { status: 500 }
    )
  }

  if (player.locationStates.sea.battle) {
    return NextResponse.json(
      { error: "The battle has already started" },
      { status: 409 }
    )
  }

  const battle = startBattle()

  const newPlayer = patchDeep<Player>(player, {
    locationStates: { sea: { battle } },
  })

  try {
    await savePlayer(
      newPlayer,
      `Attacked a ship from ${player.locationStates.sea.shipMeeting.nation}.`
    )
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json({ success: true, battle })
}
