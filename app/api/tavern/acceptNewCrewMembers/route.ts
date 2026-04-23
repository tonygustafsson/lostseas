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
  const isHostile = player?.locationStates?.tavern?.isHostile || false

  if (!numberOfSailors || isHostile) {
    return NextResponse.json({ error: "No sailors to accept" }, { status: 500 })
  }

  const dbUpdate: DeepPartial<Player> = {
    crewMembers: {
      count: player.crewMembers.count + numberOfSailors,
    },
    locationStates: {
      tavern: {
        noOfSailors: 0,
      },
    },
  }

  const newPlayer = patchDeep<Player>(player, dbUpdate)

  try {
    const updatedPlayer = await savePlayer(newPlayer, `Accepted ${numberOfSailors} new crew members.`)

    return NextResponse.json({
      success: true,
      updatedPlayer,
      numberOfSailors,
      isHostile,
    })
  } catch (error) {
    return NextResponse.json(
      { error, numberOfSailors, isHostile },
      { status: 500 }
    )
  }
}
