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
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
  }

  const body = await req.json()
  const { item, quantity }: { item: keyof Inventory; quantity: number } = body

  if (
    !item ||
    Object.entries(MERCHANDISE).find(([itemKey]) => itemKey === item)?.[1]
      .availableAt !== "shop"
  ) {
    return NextResponse.json({ error: "Not a valid item" }, { status: 400 })
  }

  const totalPrice =
    MERCHANDISE[item as keyof typeof MERCHANDISE].buy * quantity

  const player = await getPlayer(playerId)

  if (player.character.gold < totalPrice) {
    return NextResponse.json({ error: "Not enough gold" }, { status: 400 })
  }

  const itemQuantity = player.inventory?.[item as keyof Inventory] ?? 0

  const dbUpdate: DeepPartial<Player> = {
    character: {
      gold: player.character.gold - totalPrice,
    },
    inventory: {
      [item]: itemQuantity ? itemQuantity + quantity : quantity,
    },
  }

  const newPlayer = patchDeep<Player>(player, dbUpdate)

  try {
    const updatedPlayer = await savePlayer(newPlayer)

    return NextResponse.json({
      success: true,
      updatedPlayer,
      item,
      quantity,
      totalQuantity: itemQuantity ? itemQuantity + quantity : quantity,
      totalPrice,
    })
  } catch (error) {
    return NextResponse.json({ error, item }, { status: 500 })
  }
}
