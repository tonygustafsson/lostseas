import { generateAuthenticationOptions } from "@simplewebauthn/server"

import {
  createChallengeResponse,
  getRelyingParty,
  passkeyError,
} from "@/utils/passkey"
import { requireJsonRequest } from "@/utils/requireJsonRequest"
import { passkeyLoginOptionsValidationSchema } from "@/utils/validation"

export async function POST(req: Request) {
  const error = requireJsonRequest(req)
  if (error) return error

  const body = passkeyLoginOptionsValidationSchema.safeParse(
    await req.json().catch(() => ({}))
  )

  if (!body.success)
    return passkeyError("Invalid passkey sign-in request.", 400)

  try {
    const { rpID } = getRelyingParty(req)

    // A remembered account limits the prompt to its own passkeys. Without it,
    // the browser lets the player pick any of their Lost Seas passkeys.
    const options = await generateAuthenticationOptions({
      rpID,
      userVerification: "preferred",
      allowCredentials: body.data.credentialIds?.map((id) => ({ id })),
    })

    return await createChallengeResponse(options)
  } catch (error) {
    console.error("Failed to create passkey sign-in options", error)
    return passkeyError("Could not start passkey sign-in. Try again.", 500)
  }
}
