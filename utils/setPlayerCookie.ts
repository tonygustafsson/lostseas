import { NextResponse } from "next/server"

import { COOKIE_EXPIRE_TIME, PLAYER_ID_COOKIE_NAME } from "@/constants/system"

export const setPlayerCookie = (res: NextResponse, playerId: Player["id"]) => {
  res.cookies.set(PLAYER_ID_COOKIE_NAME, playerId, {
    expires: COOKIE_EXPIRE_TIME,
    sameSite: "lax",
  })

  return res
}
