import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { patchDeep } from "@/utils/patchDeep"

export async function POST() {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
  }

  const player = await getPlayer(playerId)

  if (!player.locationStates?.sea?.shipMeeting) {
    return NextResponse.json(
      { error: "You are not currently meeting a ship" },
      { status: 500 }
    )
  }

  const dbUpdate: DeepPartial<Player> = {
    locationStates: {
      sea: {
        shipMeeting: null,
      },
    },
  }

  const newPlayer = patchDeep<Player>(player, dbUpdate)

  try {
    await savePlayer(newPlayer)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
