import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { STARTING_SHIP_TYPE } from "@/constants/player"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { resetGame } from "@/utils/actions/user"
import { getRandomTown } from "@/utils/location"
import { requireJsonRequest } from "@/utils/requireJsonRequest"
import { createNewShip } from "@/utils/ship"

export async function POST(req: Request) {
  const error = requireJsonRequest(req)
  if (error) return error

  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const player = await getPlayer(playerId)

  if (!player)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const result = resetGame(player, {
    startingTown: getRandomTown(player.character.nationality),
    ship: createNewShip(STARTING_SHIP_TYPE, 0),
  })

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }

  try {
    const updatedPlayer = await savePlayer(result.player, result.log, {
      resetHistory: true,
      withStatistics: true,
    })

    return NextResponse.json({ success: true, updatedPlayer })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
