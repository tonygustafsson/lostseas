import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import {
  BARTER_GOODS,
  isTradeGoodAvailableInTown,
} from "@/constants/merchandise"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { patchDeep } from "@/utils/patchDeep"
import { getBarterGoodsValue } from "@/utils/shop"

export async function POST() {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const player = await getPlayer(playerId)

  if (!player)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const town = player.character.town

  const value = getBarterGoodsValue(player)

  // Only zero out barter goods that are available (and thus sellable) in this town
  const inventoryUpdate = Object.fromEntries(
    Object.entries(player.inventory || {})
      .filter(
        ([item]) =>
          BARTER_GOODS.includes(item) &&
          isTradeGoodAvailableInTown(item as keyof Inventory, town)
      )
      .map(([item]) => [item, 0])
  )

  const dbUpdate: DeepPartial<Player> = {
    character: {
      gold: player.character.gold + value,
    },
    inventory: inventoryUpdate,
  }

  const newPlayer = patchDeep<Player>(player, dbUpdate)

  try {
    const updatedPlayer = await savePlayer(newPlayer)

    return NextResponse.json({ success: true, updatedPlayer, value })
  } catch (error) {
    return NextResponse.json({ error, value }, { status: 500 })
  }
}
