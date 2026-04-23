import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { MERCHANDISE } from "@/constants/merchandise"
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
  const { item }: { item: keyof typeof MERCHANDISE } = body

  if (!item || !Object.keys(MERCHANDISE).includes(item || "")) {
    return NextResponse.json({ error: "Not a valid item" }, { status: 400 })
  }

  const player = await getPlayer(playerId)

  if (!player?.locationStates?.market) {
    return NextResponse.json(
      { error: "Not a valid item", item },
      { status: 400 }
    )
  }

  const stateItem = player?.locationStates?.market.items?.[item]

  if (!stateItem) {
    return NextResponse.json(
      { error: "Not a valid item", item },
      { status: 400 }
    )
  }

  const totalPrice = stateItem?.price * stateItem.quantity

  if (player?.character.gold < totalPrice) {
    return NextResponse.json(
      { error: "Not enough gold", item },
      { status: 400 }
    )
  }

  const newGold = player.character.gold - totalPrice

  const newInventoryQty = player.inventory?.[item]
    ? (player.inventory[item] || 0) + stateItem.quantity
    : stateItem.quantity

  const dbUpdate: DeepPartial<Player> = {
    character: {
      gold: newGold,
    },
    inventory: {
      [item]: newInventoryQty,
    },
    locationStates: {
      market: {
        items: {
          [item]: null,
        },
      },
    },
  }

  const newPlayer = patchDeep<Player>(player, dbUpdate)

  try {
    const updatedPlayer = await savePlayer(newPlayer, `Bought ${item} x${stateItem.quantity} for ${totalPrice} gold.`)

    return NextResponse.json({
      success: true,
      updatedPlayer,
      item,
      quantity: stateItem.quantity,
      totalQuantity: updatedPlayer.inventory?.[item] || 0,
      totalPrice,
    })
  } catch (error) {
    return NextResponse.json({ error, item }, { status: 500 })
  }
}
