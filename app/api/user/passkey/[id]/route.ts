import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { deletePasskey, getPasskey } from "@/firebase/passkeys-db"
import { requireJsonRequest } from "@/utils/requireJsonRequest"

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const error = requireJsonRequest(req)
  if (error) return error

  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await params
    const passkey = await getPasskey(id)

    // Another player's passkey is treated as missing
    if (passkey?.playerId !== playerId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    await deletePasskey(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
}
