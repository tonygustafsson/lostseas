import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { SHIP_TYPES } from "@/constants/ship"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { TITLE_INFO } from "@/constants/title"
import { getPlayer, savePlayer } from "@/firebase/db"
import { createNewShip } from "@/utils/ship"

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
  }

  const body = await req.json()
  const { item } = body

  if (!item || !Object.keys(SHIP_TYPES).includes(item || "")) {
    return NextResponse.json({ error: "Not a valid item" }, { status: 400 })
  }

  const shipItem = item as keyof typeof SHIP_TYPES
  const ship = SHIP_TYPES[shipItem]

  const totalPrice = ship.buy

  const player = await getPlayer(playerId)

  if (player.character.gold < totalPrice) {
    return NextResponse.json(
      { error: "Not enough gold", item },
      { status: 500 }
    )
  }

  const titleInfo = TITLE_INFO[player.character.title]

  if (Object.keys(player.ships).length + 1 > titleInfo.maxShips) {
    return NextResponse.json(
      { error: "Max ships reached due to title", item },
      { status: 500 }
    )
  }

  const newShip = createNewShip(shipItem as Ship["type"], player.character.day)

  const playerResult: Player = {
    ...player,
    character: {
      ...player.character,
      gold: player.character.gold - totalPrice,
    },
    ships: {
      ...player.ships,
      [newShip.id]: newShip,
    },
  }

  try {
    await savePlayer(playerId, playerResult)
  } catch (error) {
    return NextResponse.json({ error, item }, { status: 500 })
  }

  return NextResponse.json({ success: true, item, totalPrice })
}
