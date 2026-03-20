import { cookies } from "next/headers"
import { cache } from "react"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer } from "@/utils/db/getPlayer"

export const getLoggedInPlayer = cache(async () => {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value as
    | Player["id"]
    | undefined

  if (!playerId) {
    return undefined
  }

  return getPlayer(playerId)
})
