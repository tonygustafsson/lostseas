import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { SHIP_TYPES } from "@/constants/ship"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, removeShip, savePlayer } from "@/firebase/db"

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
  }

  const body = await req.json()
  const { id } = body as { id: Ship["id"] }

  const player = await getPlayer(playerId)

  const ship = (player.ships || {})[id]

  if (!ship) {
    return NextResponse.json({ error: "Not a valid item" }, { status: 400 })
  }

  const shipInfo = SHIP_TYPES[ship.type as keyof typeof SHIP_TYPES]
  const totalPrice = shipInfo.sell

  const playerResult: Player = {
    ...player,
    character: {
      ...player.character,
      gold: player.character.gold + totalPrice,
    },
  }

  try {
    await savePlayer(playerId, playerResult)
  } catch (error) {
    return NextResponse.json({ error, ship }, { status: 500 })
  }

  try {
    await removeShip(playerId, id)
  } catch (error) {
    return NextResponse.json({ error, ship }, { status: 500 })
  }

  return NextResponse.json({ success: true, ship, totalPrice })
}
