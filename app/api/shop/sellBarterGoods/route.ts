import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { getBarterGoodsValue } from "@/utils/shop"

export async function POST() {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
  }

  const player = await getPlayer(playerId)

  const value = getBarterGoodsValue(player.inventory)

  const playerResult = {
    ...player,
    inventory: {
      ...player.inventory,
      porcelain: 0,
      spices: 0,
      tobacco: 0,
      rum: 0,
    },
    character: {
      ...player.character,
      gold: player.character.gold + value,
    },
  } as Player

  try {
    await savePlayer(playerId, playerResult)
  } catch (error) {
    return NextResponse.json({ error, value }, { status: 500 })
  }

  return NextResponse.json({ success: true, value })
}
