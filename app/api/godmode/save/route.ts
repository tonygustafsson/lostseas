import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer } from "@/firebase/db"
import { saveGodModePlayer } from "@/utils/actions/godMode"
import { savePlayerWithStatistics } from "@/utils/db/savePlayerWithStatistics"
import { hasGodModeAccess } from "@/utils/godMode"
import { requireJsonRequest } from "@/utils/requireJsonRequest"

export async function POST(req: Request) {
  if (!(await hasGodModeAccess())) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const error = requireJsonRequest(req)
  if (error) return error

  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const player = await getPlayer(playerId)

  if (!player)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json().catch(() => null)
  const result = saveGodModePlayer(player, body)

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }

  try {
    const updatedPlayer = await savePlayerWithStatistics(result.player)

    return NextResponse.json({ success: true, updatedPlayer })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
