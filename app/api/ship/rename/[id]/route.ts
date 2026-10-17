import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { renameShip, SHIP_NOT_FOUND } from "@/utils/actions/ship"

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

export async function POST(req: Request, { params }: RouteContext) {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const body = (await req.json()) as { name: string }

  const player = await getPlayer(playerId)

  if (!player)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const result = renameShip(player, { id, name: body?.name })

  if ("error" in result) {
    return NextResponse.json(
      { error: result.error },
      { status: result.error === SHIP_NOT_FOUND ? 404 : 400 }
    )
  }

  try {
    const updatedPlayer = await savePlayer(result.player, result.log)

    return NextResponse.json({
      success: true,
      updatedPlayer,
      ...result.data,
    })
  } catch (error) {
    return NextResponse.json({ error, ...result.data }, { status: 500 })
  }
}
