import { verifyAuthenticationResponse } from "@simplewebauthn/server"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PASSKEY_CHALLENGE_COOKIE_NAME } from "@/constants/passkey"
import {
  consumeChallenge,
  getPasskey,
  recordPasskeyUse,
} from "@/firebase/passkeys-db"
import { getPlayer } from "@/utils/db/getPlayer"
import { getRelyingParty, passkeyError } from "@/utils/passkey"
import { requireJsonRequest } from "@/utils/requireJsonRequest"
import { setPlayerCookie } from "@/utils/setPlayerCookie"

export async function POST(req: Request) {
  const error = requireJsonRequest(req)
  if (error) return error

  const cookieStore = await cookies()
  const challengeId = cookieStore.get(PASSKEY_CHALLENGE_COOKIE_NAME)?.value

  try {
    const challenge = challengeId ? await consumeChallenge(challengeId) : null

    if (!challenge) return passkeyError("Passkey request expired", 400)

    const response = await req.json()
    const passkey = await getPasskey(response?.id)
    const { origin, rpID } = getRelyingParty(req)

    // Sent back so the browser can stop offering a removed passkey
    if (!passkey)
      return passkeyError("Unknown passkey", 401, {
        rpID,
        credentialID: response.id,
      })

    const { verified, authenticationInfo } = await verifyAuthenticationResponse(
      {
        response,
        expectedChallenge: challenge.challenge,
        expectedOrigin: origin,
        expectedRPID: rpID,
        requireUserVerification: false,
        credential: {
          id: response.id,
          publicKey: new Uint8Array(
            Buffer.from(passkey.publicKey, "base64url")
          ),
          counter: passkey.counter,
          transports: passkey.transports,
        },
      }
    )

    if (!verified) return passkeyError("Passkey could not be verified", 401)

    await recordPasskeyUse(response.id, authenticationInfo.newCounter)

    const player = await getPlayer(passkey.playerId)

    if (!player) return passkeyError("Unauthorized", 401)

    const res = setPlayerCookie(
      NextResponse.json({ success: true }),
      passkey.playerId
    )
    res.cookies.delete(PASSKEY_CHALLENGE_COOKIE_NAME)

    return res
  } catch (error) {
    console.error(error)
    return passkeyError("Passkey could not be verified", 400)
  }
}
