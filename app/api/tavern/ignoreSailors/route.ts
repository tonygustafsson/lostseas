import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { patchDeep } from "@/utils/patchDeep"

export async function POST() {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const player = await getPlayer(playerId)

  if (!player)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const numberOfSailors = player?.locationStates?.tavern?.noOfSailors || 0

  if (!numberOfSailors) {
    return NextResponse.json({ error: "No sailors to ignore" }, { status: 500 })
  }

  const dbUpdate: DeepPartial<Player> = {
    locationStates: {
      tavern: {
        noOfSailors: 0,
      },
    },
  }

  const newPlayer = patchDeep<Player>(player, dbUpdate)

  try {
    const updatedPlayer = await savePlayer(newPlayer, `Ignored ${numberOfSailors} sailors.`)

    return NextResponse.json({ success: true, updatedPlayer, numberOfSailors })
  } catch (error) {
    return NextResponse.json({ error, numberOfSailors }, { status: 500 })
  }
}
