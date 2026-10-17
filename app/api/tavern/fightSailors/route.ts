import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { fightSailors } from "@/utils/actions/tavern"

export async function POST() {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const player = await getPlayer(playerId)

  if (!player)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const result = fightSailors(player)

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }

  const { won, ...data } = result.data

  try {
    const updatedPlayer = await savePlayer(result.player, result.log)

    // success tells the client whether the fight was won
    return NextResponse.json({ success: won, updatedPlayer, ...data })
  } catch (error) {
    return NextResponse.json({ error, ...data }, { status: 500 })
  }
}
