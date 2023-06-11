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
import { useGetPlayer } from "@/hooks/queries/usePlayer"

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
  })

  console.log(playerId)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Home
