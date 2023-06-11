import { dehydrate, QueryClient } from "@tanstack/react-query"
import { getCookie } from "cookies-next"
import { child, get, ref } from "firebase/database"
import { GetServerSideProps } from "next"

import DefaultLayout from "@/components/layouts/default"
import Bank from "@/components/location/Bank"
import Market from "@/components/location/Market"
import Shop from "@/components/location/Shop"
import LocationHero from "@/components/LocationHero"
import LoggedOutHero from "@/components/LoggedOutHero"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import db from "@/firebase/db"
import { PLAYER_QUERY_KEY, useGetPlayer } from "@/hooks/queries/usePlayer"

import { sortByDate } from "./api/user/[...get]"

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

  console.log(playerId)

  if (playerId) {
    await queryClient.prefetchQuery([PLAYER_QUERY_KEY], async () => {
      try {
        if (!playerId) {
          return null
        }

        const dbRef = ref(db)
        const data = await get(child(dbRef, playerId))

        if (!data.exists()) {
          return null
        }

        const result = data.val() as Player

        if (!result) {
          return null
        }

        result.ships = sortByDate<Ship>(result.ships) ?? {}
        result.crewMembers = sortByDate<CrewMember>(result.crewMembers) ?? {}

        return result
      } catch (error) {
        console.error(error)
      }
    })
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Home
