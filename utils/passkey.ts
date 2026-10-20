import "server-only"

import crypto from "crypto"
import { NextResponse } from "next/server"

import {
  PASSKEY_CHALLENGE_COOKIE_NAME,
  PASSKEY_CHALLENGE_TTL_SECONDS,
} from "@/constants/passkey"
import { saveChallenge } from "@/firebase/passkeys-db"

const parseOrigin = (origin: string) => {
  const url = new URL(origin)

  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error("Invalid WebAuthn origin")
  }

  return url
}

// Use a configured public origin when the proxy's host differs from the
// request URL. Forwarded headers must not select an unrelated RP domain.
export const getRelyingParty = (req: Request) => {
  let url = parseOrigin(new URL(req.url).origin)

  if (process.env.WEBAUTHN_ORIGIN) {
    url = parseOrigin(process.env.WEBAUTHN_ORIGIN)
  } else {
    const host =
      req.headers.get("x-forwarded-host")?.split(",")[0].trim() ?? url.host
    const protocol =
      req.headers.get("x-forwarded-proto")?.split(",")[0].trim() ??
      url.protocol.slice(0, -1)

    try {
      const forwarded = parseOrigin(`${protocol}://${host}`)

      if (forwarded.host === url.host) url = forwarded
    } catch {
      // Malformed proxy headers do not break passkey endpoints.
    }
  }

  return { origin: url.origin, rpID: url.hostname }
}

// The user handle stored in the passkey, also needed when signalling changes
// to the browser.
export const getPasskeyUserID = (playerId: Player["id"]) =>
  Buffer.from(playerId).toString("base64url")

export const createChallengeResponse = async (
  options: { challenge: string },
  playerId?: Player["id"]
) => {
  const challengeId = crypto.randomUUID()

  await saveChallenge(challengeId, {
    challenge: options.challenge,
    expires: Date.now() + PASSKEY_CHALLENGE_TTL_SECONDS * 1000,
    ...(playerId && { playerId }),
  })

  const res = NextResponse.json(options)
  res.cookies.set(PASSKEY_CHALLENGE_COOKIE_NAME, challengeId, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: PASSKEY_CHALLENGE_TTL_SECONDS,
  })

  return res
}

export const passkeyError = (
  error: string,
  status: number,
  details?: Record<string, unknown>
) => {
  const res = NextResponse.json({ error, ...details }, { status })
  res.cookies.delete(PASSKEY_CHALLENGE_COOKIE_NAME)

  return res
}
