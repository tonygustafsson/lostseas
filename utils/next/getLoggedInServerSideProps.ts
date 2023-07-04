import { dehydrate, QueryClient } from "@tanstack/react-query"
import { getCookie } from "cookies-next"
import { IncomingMessage, ServerResponse } from "http"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { PLAYER_QUERY_KEY } from "@/hooks/queries/usePlayer"

import { getPlayer } from "../db/getPlayer"

export const getLoggedInServerSideProps = async ({
  req,
  res,
}: {
  req: IncomingMessage
  res: ServerResponse<IncomingMessage>
}) => {
  const queryClient = new QueryClient()

  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res }) as
    | Player["id"]
    | undefined

  if (playerId) {
    await queryClient.prefetchQuery([PLAYER_QUERY_KEY], async () => {
      const player = await getPlayer(playerId)

      if (player?.character.journey) {
        // A way of telling client that the journey is not finished on page load,
        // so that the client can continue it's journey loop to reach the location
        // TODO: Find a better solution for this
        player.character.journey.ongoingJourney = true
      }

      return player
    })
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
