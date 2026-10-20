import { NextResponse } from "next/server"

import { getPlayer } from "@/utils/db/getPlayer"
import { setPlayerCookie } from "@/utils/setPlayerCookie"
import { loginValidationSchema } from "@/utils/validation"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    await loginValidationSchema.parseAsync(body)

    const { playerId } = body as { playerId: Player["id"] }
    const player = await getPlayer(playerId)

    if (!player)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    return setPlayerCookie(NextResponse.json({ success: true }), playerId)
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 400 })
  }
}
