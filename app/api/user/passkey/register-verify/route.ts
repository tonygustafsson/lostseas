import { verifyRegistrationResponse } from "@simplewebauthn/server"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PASSKEY_CHALLENGE_COOKIE_NAME } from "@/constants/passkey"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { consumeChallenge, savePasskey } from "@/firebase/passkeys-db"
import { getRelyingParty, passkeyError } from "@/utils/passkey"
import { requireJsonRequest } from "@/utils/requireJsonRequest"

export async function POST(req: Request) {
  const error = requireJsonRequest(req)
  if (error) return error

  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value
  const challengeId = cookieStore.get(PASSKEY_CHALLENGE_COOKIE_NAME)?.value

  if (!playerId) return passkeyError("Unauthorized", 401)

  try {
    const challenge = challengeId ? await consumeChallenge(challengeId) : null

    if (!challenge || challenge.playerId !== playerId)
      return passkeyError("Passkey request expired", 400)

    const { origin, rpID } = getRelyingParty(req)

    const { verified, registrationInfo } = await verifyRegistrationResponse({
      response: await req.json(),
      expectedChallenge: challenge.challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      requireUserVerification: false,
    })

    if (!verified || !registrationInfo)
      return passkeyError("Passkey could not be verified", 400)

    const { credential, credentialDeviceType, credentialBackedUp } =
      registrationInfo

    const saved = await savePasskey(credential.id, {
      playerId,
      publicKey: Buffer.from(credential.publicKey).toString("base64url"),
      counter: credential.counter,
      transports: credential.transports ?? [],
      deviceType: credentialDeviceType,
      backedUp: credentialBackedUp,
      createdAt: Date.now(),
    })

    if (!saved) return passkeyError("Passkey already registered", 409)

    const res = NextResponse.json({ success: true })
    res.cookies.delete(PASSKEY_CHALLENGE_COOKIE_NAME)

    return res
  } catch (error) {
    console.error(error)
    return passkeyError("Passkey could not be verified", 400)
  }
}
