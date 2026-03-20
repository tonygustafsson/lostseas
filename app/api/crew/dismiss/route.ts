import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
  }

  const body = await req.json()
  const count = parseInt(body.count)

  const player = await getPlayer(playerId)

  if (count < 1) {
    return NextResponse.json(
      { error: "You need to dismiss at least 1 crew member" },
      { status: 500 }
    )
  }

  if (player.crewMembers.count < count) {
    return NextResponse.json(
      { error: "Not enough crew members to dismiss" },
      { status: 500 }
    )
  }

  const newCount = player.crewMembers.count - count

  const playerResult: Player = {
    ...player,
    crewMembers: {
      ...player.crewMembers,
      count: newCount,
    },
  }

  try {
    await savePlayer(playerId, playerResult)
  } catch (error) {
    return NextResponse.json({ error, count, newCount }, { status: 500 })
  }

  return NextResponse.json({ success: true, count, newCount })
}
