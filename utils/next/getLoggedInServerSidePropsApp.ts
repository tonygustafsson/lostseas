import { dehydrate, QueryClient } from "@tanstack/react-query"
import { cookies } from "next/headers"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { PLAYER_QUERY_KEY } from "@/hooks/queries/usePlayer"

import { getPlayer } from "../db/getPlayer"

export const getLoggedInPlayer = async () => {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value as
    | Player["id"]
    | undefined

  if (!playerId) {
    return undefined
  }

  return getPlayer(playerId)
}

export const getLoggedInServerSidePropsApp = async () => {
  const queryClient = new QueryClient()

  const player = await getLoggedInPlayer()

  if (player) {
    if (player.character.journey) {
      player.character.journey.ongoingJourney = true
    }

    await queryClient.prefetchQuery({
      queryKey: [PLAYER_QUERY_KEY],
      queryFn: async () => player,
    })
  }

  return {
    dehydratedState: dehydrate(queryClient),
  }
}
