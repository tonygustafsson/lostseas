import { dehydrate, QueryClient } from "@tanstack/react-query"
import { getCookie } from "cookies-next"
import { GetServerSideProps } from "next"

import DefaultLayout from "@/components/layouts/default"
import Bank from "@/components/location/Bank"
import Market from "@/components/location/Market"
import Shop from "@/components/location/Shop"
import LocationHero from "@/components/LocationHero"
import LoggedOutHero from "@/components/LoggedOutHero"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { PLAYER_QUERY_KEY, useGetPlayer } from "@/hooks/queries/usePlayer"
import { getPlayer } from "@/utils/db/getPlayer"

const Home = () => {
  const { data: player } = useGetPlayer()

  return (
    <DefaultLayout>
      <LocationHero />
      <LoggedOutHero />

      <div className="mt-8">
        {player?.character.location === "Shop" && <Shop />}
        {player?.character.location === "Bank" && <Bank />}
        {player?.character.location === "Market" && <Market />}
      </div>
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient()

  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, {
    req: context.req,
    res: context.res,
  }) as Player["id"] | undefined

  if (playerId) {
    await queryClient.prefetchQuery([PLAYER_QUERY_KEY], async () => {
      const player = await getPlayer(playerId)

      return player
    })
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Home
