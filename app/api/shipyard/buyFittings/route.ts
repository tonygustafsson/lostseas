import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { buyFittings } from "@/utils/actions/shipyard"

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { item, quantity }: { item: keyof Inventory; quantity: number } = body

  const player = await getPlayer(playerId)

  if (!player)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const result = buyFittings(player, { item, quantity })

  if ("error" in result) {
    return NextResponse.json({ error: result.error, item }, { status: 400 })
  }

  try {
    const updatedPlayer = await savePlayer(result.player, result.log)

    return NextResponse.json({
      success: true,
      updatedPlayer,
      ...result.data,
    })
  } catch (error) {
    return NextResponse.json({ error, item }, { status: 500 })
  }
}
