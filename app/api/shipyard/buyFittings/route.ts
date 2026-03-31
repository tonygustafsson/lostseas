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
    return NextResponse.json({ error: "Not a valid item" }, { status: 400 })
  }

  const totalPrice =
    MERCHANDISE[item as keyof typeof MERCHANDISE].buy * quantity

  const player = await getPlayer(playerId)

  if (player.character.gold < totalPrice) {
    return NextResponse.json({ error: "Not enough gold" }, { status: 400 })
  }

  const itemQuantity = player.inventory?.[item as keyof Inventory]

  const newQuantity = itemQuantity ? itemQuantity + quantity : quantity

  const dbUpdate = {
    "character/gold": player.character.gold - totalPrice,
    [`inventory/${item}`]: newQuantity,
  }

  try {
    const updatedPlayer = await savePlayer(playerId, dbUpdate)

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
