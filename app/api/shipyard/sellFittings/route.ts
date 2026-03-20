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
  const { item, quantity } = body

  if (
    !item ||
    Object.entries(MERCHANDISE).find(([itemKey]) => itemKey === item)?.[1]
      .availableAt !== "shipyard"
  ) {
    return NextResponse.json(
      { error: "Not a valid item", item },
      { status: 400 }
    )
  }

  const totalPrice =
    MERCHANDISE[item as keyof typeof MERCHANDISE].sell * quantity

  const player = await getPlayer(playerId)
  const itemQuantity = player.inventory?.[item as keyof Inventory] || 0

  if (itemQuantity < quantity) {
    return NextResponse.json(
      { error: `Not enough ${item}.`, item },
      { status: 400 }
    )
  }

  const playerResult = {
    ...player,
    inventory: {
      ...player.inventory,
      [item]: itemQuantity - quantity,
    },
    character: {
      ...player.character,
      gold: player.character.gold + totalPrice,
    },
  } as Player

  try {
    await savePlayer(playerId, playerResult)
  } catch (error) {
    return NextResponse.json({ error, item }, { status: 500 })
  }

  return NextResponse.json({
    success: true,
    item,
    quantity,
    totalQuantity: itemQuantity - quantity,
    totalPrice,
  })
}
