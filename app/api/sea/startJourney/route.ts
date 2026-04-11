import { randomInt } from "crypto"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { TOWNS } from "@/constants/locations"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { patchDeep } from "@/utils/patchDeep"
import { validateJourney } from "@/utils/validateJourney"

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
  }

  const body = await req.json()
  const town: Town = body.town
  const player = await getPlayer(playerId)

  if (player.character.journey) {
    return NextResponse.json(
      { error: "Character is already on a journey" },
      { status: 500 }
    )
  }

  if (player.character.location === "Sea") {
    return NextResponse.json(
      { error: "You can only start a journey from land." },
      { status: 500 }
    )
  }

  const currentTownInfo = player.character.town && TOWNS[player.character.town]

  const distance = currentTownInfo?.map.distanceTo[town]
    ? currentTownInfo.map.distanceTo[town]
    : randomInt(3, 9)

  const journeyValidation = validateJourney(player, distance)

  if (!journeyValidation.success) {
    return NextResponse.json({ success: false })
  }

  const dbUpdate: DeepPartial<Player> = {
    character: {
      town: null,
      location: "Sea",
      journey: {
        destination: town,
        day: 1,
        totalDays: distance,
      },
    },
    locationStates: null,
  }

  const newPlayer = patchDeep<Player>(player, dbUpdate)

  try {
    await savePlayer(newPlayer)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
