import { NextResponse } from "next/server"

import { COOKIE_EXPIRE_TIME, PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer } from "@/utils/db/getPlayer"
import { loginValidationSchema } from "@/utils/validation"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    await loginValidationSchema.parseAsync(body)

    const { playerId } = body as { playerId: Player["id"] }
    const player = await getPlayer(playerId)

    if (!player)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    if (!player) {
      return NextResponse.json({ message: "No user found" }, { status: 404 })
    }

    const res = NextResponse.json({ success: true })
    res.cookies.set(PLAYER_ID_COOKIE_NAME, playerId, {
      expires: COOKIE_EXPIRE_TIME,
    })

    return res
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 400 })
  }
}
