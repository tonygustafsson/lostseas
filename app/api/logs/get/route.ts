import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getLog } from "@/firebase/db"

export async function GET() {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const logs = await getLog(playerId)

  const res = NextResponse.json(logs ?? [])
  res.headers.set("Cache-Control", "no-cache")

  return res
}
