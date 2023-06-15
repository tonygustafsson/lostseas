import { GetServerSideProps } from "next"

import DefaultLayout from "@/components/layouts/default"
import Bank from "@/components/location/Bank"
import Market from "@/components/location/Market"
import Shipyard from "@/components/location/shipyard"
import Shop from "@/components/location/Shop"
import Tavern from "@/components/location/Tavern"
import LocationHero from "@/components/LocationHero"
import LoggedOutHero from "@/components/LoggedOutHero"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getLoggedInServerSideProps } from "@/utils/next/getLoggedInServerSideProps"

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
        {player?.character.location === "Tavern" && <Tavern />}
        {player?.character.location === "Shipyard" && <Shipyard />}
      </div>
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) =>
  getLoggedInServerSideProps(context)

export default Home
