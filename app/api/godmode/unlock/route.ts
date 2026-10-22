import { NextResponse } from "next/server"

import {
  GOD_MODE_COOKIE_NAME,
  GOD_MODE_LIFETIME_SECONDS,
} from "@/constants/system"
import {
  createGodModeToken,
  getGodModeSecret,
  isPassphraseValid,
} from "@/utils/godMode"
import { requireJsonRequest } from "@/utils/requireJsonRequest"

// Every failure is a 404 so that the route does not reveal itself.
const notFound = () =>
  NextResponse.json({ error: "Not found" }, { status: 404 })

export async function POST(req: Request) {
  const error = requireJsonRequest(req)
  if (error) return error

  const secret = getGodModeSecret()
  if (!secret) return notFound()

  const body = await req.json().catch(() => null)
  if (!isPassphraseValid(body?.passphrase, secret)) return notFound()

  const res = NextResponse.json({ success: true })

  res.cookies.set(GOD_MODE_COOKIE_NAME, createGodModeToken(secret), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: GOD_MODE_LIFETIME_SECONDS,
  })

  return res
}
