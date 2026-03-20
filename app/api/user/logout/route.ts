import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"

export async function POST() {
  const res = NextResponse.json({ success: true })
  res.cookies.delete(PLAYER_ID_COOKIE_NAME)

  return res
}
