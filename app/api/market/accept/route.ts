import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { MERCHANDISE } from "@/constants/merchandise"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
  }

  const body = await req.json()
  const { item } = body as { item: keyof typeof MERCHANDISE }

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

  const playerResult: Player = {
    ...player,
    character: {
      ...player.character,
      gold: player.character.gold - totalPrice,
    },
    inventory: {
      ...player.inventory,
      [item]: player.inventory?.[item]
        ? (player.inventory[item] || 0) + stateItem.quantity
        : stateItem.quantity,
    },
    locationStates: {
      ...player.locationStates,
      market: {
        ...player.locationStates.market,
        items: {
          ...player.locationStates.market.items,
          [item]: null,
        },
      },
    },
  }

  try {
    await savePlayer(playerId, playerResult)
  } catch (error) {
    return NextResponse.json({ error, item }, { status: 500 })
  }

  return NextResponse.json({
    success: true,
    item,
    quantity: stateItem.quantity,
    totalQuantity: playerResult.inventory?.[item] || 0,
    totalPrice,
  })
}
