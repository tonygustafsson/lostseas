import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import {
  isTradeGoodAvailableInTown,
  MERCHANDISE,
} from "@/constants/merchandise"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { isPositiveSafeInteger } from "@/utils/number"
import { patchDeep } from "@/utils/patchDeep"

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { item, quantity }: { item: keyof Inventory; quantity: number } = body

  if (!isPositiveSafeInteger(quantity)) {
    return NextResponse.json(
      { error: "Quantity must be a positive whole number" },
      { status: 400 }
    )
  }

  if (
    !item ||
    Object.entries(MERCHANDISE).find(([itemKey]) => itemKey === item)?.[1]
      .availableAt !== "shop"
  ) {
    return NextResponse.json({ error: "Not a valid item" }, { status: 400 })
  }

  const player = await getPlayer(playerId)

  if (!player)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  if (player.character.location !== "Shop")
    return NextResponse.json(
      { error: "You must be at Shop to do this." },
      { status: 400 }
    )

  if (!isTradeGoodAvailableInTown(item, player.character.town)) {
    return NextResponse.json(
      { error: "This item is not available in this port" },
      { status: 400 }
    )
  }

  const totalPrice =
    MERCHANDISE[item as keyof typeof MERCHANDISE].buy * quantity

  if (!Number.isSafeInteger(totalPrice)) {
    return NextResponse.json({ error: "Invalid quantity" }, { status: 400 })
  }

  if (player.character.gold < totalPrice) {
    return NextResponse.json({ error: "Not enough gold" }, { status: 400 })
  }

  const itemQuantity = player.inventory?.[item as keyof Inventory] ?? 0
  const totalQuantity = itemQuantity + quantity

  if (!Number.isSafeInteger(totalQuantity)) {
    return NextResponse.json({ error: "Invalid quantity" }, { status: 400 })
  }

  const dbUpdate: DeepPartial<Player> = {
    character: {
      gold: player.character.gold - totalPrice,
    },
    inventory: {
      [item]: totalQuantity,
    },
  }

  const newPlayer = patchDeep<Player>(player, dbUpdate)

  try {
    const updatedPlayer = await savePlayer(
      newPlayer,
      `Bought ${quantity} ${MERCHANDISE[item].unit} of ${item} for ${totalPrice} gold.`
    )

    return NextResponse.json({
      success: true,
      updatedPlayer,
      item,
      quantity,
      totalQuantity,
      totalPrice,
    })
  } catch (error) {
    return NextResponse.json({ error, item }, { status: 500 })
  }
}
