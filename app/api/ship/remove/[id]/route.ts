import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

export async function DELETE(_: Request, { params }: RouteContext) {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params

  if (!id) {
    return NextResponse.json({ error: "Ship not found" }, { status: 404 })
  }

  const player = await getPlayer(playerId)

  if (!player.ships?.[id]) {
    return NextResponse.json({ error: "Ship not found" }, { status: 404 })
  }

  const dbUpdate = {
    [`ships/${id}`]: null,
  }

  try {
    const updatedPlayer = await savePlayer(playerId, dbUpdate)

    return NextResponse.json({ success: true, updatedPlayer })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
