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
  const dbUpdate = {
    "character/gold": player.character.gold + value,
    "inventory/porcelain": 0,
    "inventory/spices": 0,
    "inventory/tobacco": 0,
    "inventory/rum": 0,
  }

  try {
    await savePlayer(playerId, dbUpdate)
    return NextResponse.json({ success: true, value })
  } catch (error) {
    return NextResponse.json({ error, value }, { status: 500 })
  }
}
