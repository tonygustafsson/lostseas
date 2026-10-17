import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { repairShipWithKits } from "@/utils/actions/ship"

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const { id, quantity } = (body ?? {}) as { id?: unknown; quantity?: unknown }

  const player = await getPlayer(playerId)

  if (!player) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const result = repairShipWithKits(player, { id, quantity })

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }

  try {
    const updatedPlayer = await savePlayer(result.player, result.log)

    return NextResponse.json({ success: true, updatedPlayer, ...result.data })
  } catch {
    return NextResponse.json(
      { error: "Could not repair your ship" },
      { status: 500 }
    )
  }
}
