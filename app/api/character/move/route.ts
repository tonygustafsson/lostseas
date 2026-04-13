import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { LOCATIONS } from "@/constants/locations"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { createMoveEvents } from "@/utils/createMoveEvents"
import { patchDeep } from "@/utils/patchDeep"

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
  }

  const body = await req.json()
  const destination = body.location as Character["location"]

  if (
    !Object.values(LOCATIONS)
      .filter((location) => location !== "Sea")
      .includes(destination as TownLocation)
  ) {
    return NextResponse.json({ error: "Invalid location" }, { status: 400 })
  }

  const player = await getPlayer(playerId)

  const currentLocation = player.character.location

  if (currentLocation === destination) {
    return NextResponse.json(
      { error: "You are already at this location" },
      { status: 400 }
    )
  }

  const dbUpdate: DeepPartial<Player> = {
    character: {
      location: destination,
    },
    locationStates: {
      harbor: {
        lastHarborReason: null,
      },
    },
  }

  const newPlayer = patchDeep<Player>(player, dbUpdate)

  try {
    const updatedPlayer = await savePlayer(newPlayer)
    const playerWithEvents = await createMoveEvents({
      player: updatedPlayer,
      destination,
    })

    return NextResponse.json({ success: true, updatedPlayer: playerWithEvents })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
