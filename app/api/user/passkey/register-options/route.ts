import { generateRegistrationOptions } from "@simplewebauthn/server"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PASSKEY_RP_NAME } from "@/constants/passkey"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayerPasskeys } from "@/firebase/passkeys-db"
import { getPlayer } from "@/utils/db/getPlayer"
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
    const cookieStore = await cookies()
    const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

    const player = await getPlayer(playerId)

    if (!player)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { rpID } = getRelyingParty(req)
    const existingPasskeys = await getPlayerPasskeys(player.id)

    const options = await generateRegistrationOptions({
      rpName: PASSKEY_RP_NAME,
      rpID,
      userName: player.character.name,
      userID: new TextEncoder().encode(player.id),
      attestationType: "none",
      // Lets the browser refuse a second passkey on a device that already has one
      excludeCredentials: existingPasskeys.map(({ id, transports }) => ({
        id,
        transports,
      })),
      authenticatorSelection: {
        residentKey: "required",
        userVerification: "preferred",
      },
    })

    return await createChallengeResponse(options, player.id)
  } catch (error) {
    console.error("Failed to create passkey registration options", error)
    return passkeyError("Could not start adding a passkey. Try again.", 500)
  }
}
