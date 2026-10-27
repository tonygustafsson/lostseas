import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer, saveStatistics } from "@/firebase/db"
import { takeLootAndSail } from "@/utils/actions/sea"
import { getStatisticsSnapshot } from "@/utils/statistics"

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const loot = body?.loot

  const player = await getPlayer(playerId)

  if (!player)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const result = takeLootAndSail(player, { loot })

  if ("error" in result) {
    return NextResponse.json(
      { error: result.error },
      { status: result.status ?? 400 }
    )
  }

  try {
    const updatedPlayer = await savePlayer(result.player, result.log)

    if (result.data.destinationReached) {
      try {
        await saveStatistics(playerId, getStatisticsSnapshot(updatedPlayer))
      } catch (error) {
        console.error("Failed to save player statistics", error)
      }
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json(result.data)
}
