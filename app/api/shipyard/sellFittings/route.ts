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
  const {
    item,
    quantity,
  }: {
    item: keyof typeof MERCHANDISE
    quantity: number
  } = body

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

  if (!player)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const itemQuantity = player.inventory?.[item as keyof Inventory] || 0

  if (itemQuantity < quantity) {
    return NextResponse.json(
      { error: `Not enough ${item}.`, item },
      { status: 400 }
    )
  }

  const newQuantity = itemQuantity - quantity

  const dbUpdate: DeepPartial<Player> = {
    inventory: {
      [item]: newQuantity,
    },
    character: {
      gold: player.character.gold + totalPrice,
    },
  }

  const newPlayer = patchDeep<Player>(player, dbUpdate)

  try {
    const updatedPlayer = await savePlayer(newPlayer, `Sold fittings ${item} x${quantity} for ${totalPrice} gold.`)

    return NextResponse.json({
      success: true,
      updatedPlayer,
      item,
      quantity,
      totalQuantity: updatedPlayer.inventory?.[item] ?? newQuantity,
      totalPrice,
    })
  } catch (error) {
    return NextResponse.json({ error, item }, { status: 500 })
  }
}
