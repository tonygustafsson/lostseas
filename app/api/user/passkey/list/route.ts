import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayerPasskeys } from "@/firebase/passkeys-db"
import { getPasskeyUserID, getRelyingParty } from "@/utils/passkey"

export async function GET(req: Request) {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const passkeys = await getPlayerPasskeys(playerId)

  const res = NextResponse.json({
    rpID: getRelyingParty(req).rpID,
    userID: getPasskeyUserID(playerId),
    passkeys: passkeys
      .map(({ id, deviceType, backedUp, createdAt, lastUsedAt }) => ({
        id,
        deviceType,
        backedUp,
        createdAt,
        lastUsedAt,
      }))
      .sort((a, b) => a.createdAt - b.createdAt),
  })

  res.headers.set("Cache-Control", "no-cache")

  return res
}
