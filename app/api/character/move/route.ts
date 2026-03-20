import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { LOCATIONS } from "@/constants/locations"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { createMoveEvents } from "@/utils/createMoveEvents"

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
      .filter((location) => !["Sea", "Harbor"].includes(location))
      .includes(destination)
  ) {
    return NextResponse.json({ error: "Invalid location" }, { status: 400 })
  }

  const player = await getPlayer(playerId)

  const currentLocation = player.character.location as TownLocation

  if (currentLocation === destination) {
    return NextResponse.json({})
  }

  const playerResult: Player = {
    ...player,
    character: {
      ...player.character,
      location: destination,
    },
  }

  try {
    await savePlayer(playerId, playerResult)
    await createMoveEvents({ playerId, destination })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
