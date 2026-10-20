import { generateAuthenticationOptions } from "@simplewebauthn/server"

import {
  createChallengeResponse,
  getRelyingParty,
  passkeyError,
} from "@/utils/passkey"
import { requireJsonRequest } from "@/utils/requireJsonRequest"

export async function POST(req: Request) {
  const error = requireJsonRequest(req)
  if (error) return error

  try {
    const { rpID } = getRelyingParty(req)

    // No allowed credentials, so the browser lets the player pick any of their
    // Lost Seas passkeys.
    const options = await generateAuthenticationOptions({
      rpID,
      userVerification: "preferred",
    })

    return await createChallengeResponse(options)
  } catch (error) {
    console.error("Failed to create passkey sign-in options", error)
    return passkeyError("Could not start passkey sign-in. Try again.", 500)
  }
}
