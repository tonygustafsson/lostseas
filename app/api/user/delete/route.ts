import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { deletePlayer, getPlayer } from "@/firebase/db"
import { getPlayerPasskeys } from "@/firebase/passkeys-db"
import { requireJsonRequest } from "@/utils/requireJsonRequest"

export async function POST(req: Request) {
  const error = requireJsonRequest(req)
  if (error) return error

  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const player = await getPlayer(playerId)

  if (!player) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const passkeys = await getPlayerPasskeys(playerId)

    await deletePlayer(
      playerId,
      passkeys.map(({ id }) => id)
    )

    const res = NextResponse.json({ success: true })
    res.cookies.delete(PLAYER_ID_COOKIE_NAME)

    return res
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
