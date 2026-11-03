import { dehydrate, QueryClient } from "@tanstack/react-query"

import { PLAYER_QUERY_KEY } from "@/hooks/queries/usePlayer"

import { getLoggedInPlayer } from "./getLoggedInPlayer"

export const getDehydratedPlayerState = async () => {
  const queryClient = new QueryClient()
  const player = await getLoggedInPlayer()

  if (player) {
    queryClient.setQueryData([PLAYER_QUERY_KEY], player)
  }

  return dehydrate(queryClient)
}
