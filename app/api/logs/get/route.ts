import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getLog, type LogCursor } from "@/firebase/db"

/** Reads the optional `before` and `beforeId` cursor from the query string */
const getCursor = (url: string): LogCursor | undefined => {
  const params = new URL(url).searchParams
  const timestamp = Number(params.get("before"))
  const id = params.get("beforeId")

  return id && Number.isFinite(timestamp) ? { timestamp, id } : undefined
}

export async function GET(req: Request) {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const page = await getLog(playerId, getCursor(req.url))

  const res = NextResponse.json(page ?? { entries: [], hasMore: false })
  res.headers.set("Cache-Control", "no-cache")

  return res
}
