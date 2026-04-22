import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { SHIP_REPAIR_COST } from "@/constants/ship"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { patchDeep } from "@/utils/patchDeep"

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { id } = body as { id: Ship["id"] }

  const player = await getPlayer(playerId)

  if (!player)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const ship = (player.ships || {})[id]

  if (!ship) {
    return NextResponse.json({ error: "Not a valid item" }, { status: 400 })
  }

  const totalPrice = (100 - ship.health) * SHIP_REPAIR_COST

  if (player.character.gold < totalPrice) {
    return NextResponse.json({ error: "Not enough gold." }, { status: 400 })
  }

  const dbUpdate: DeepPartial<Player> = {
    character: {
      gold: player.character.gold - totalPrice,
    },
    ships: {
      [id]: {
        health: 100,
      },
    },
  }

  const newPlayer = patchDeep<Player>(player, dbUpdate)

  try {
    const updatedPlayer = await savePlayer(newPlayer)

    return NextResponse.json({ success: true, updatedPlayer, ship, totalPrice })
  } catch (error) {
    return NextResponse.json({ error, ship, totalPrice }, { status: 500 })
  }
}
