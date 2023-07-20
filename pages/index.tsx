import { GetServerSideProps } from "next"
import Head from "next/head"

import DefaultLayout from "@/components/layouts/default"
import AttackReport from "@/components/location/AttackReport"
import Bank from "@/components/location/Bank"
import Cityhall from "@/components/location/Cityhall"
import Docks from "@/components/location/Docks"
import Market from "@/components/location/Market"
import Shipyard from "@/components/location/Shipyard"
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
      <Head>
        {player?.character.location !== "Sea" && (
          <title>
            {`The ${player?.character.location} - ${player?.character.town} - Lost
            Seas`}
          </title>
        )}
        {player?.character.location === "Sea" && (
          <title>Open Seas - Lost Seas</title>
        )}
      </Head>

      <LocationHero />
      <LoggedOutHero />

      <div className="mt-8">
        {player?.character.location === "Shop" && <Shop />}
        {player?.character.location === "Bank" && <Bank />}
        {player?.character.location === "Market" && <Market />}
        {player?.character.location === "Tavern" && <Tavern />}
        {player?.character.location === "City hall" && <Cityhall />}
        {player?.character.location === "Shipyard" && <Shipyard />}
        {player?.character.location === "Docks" && <Docks />}

        {player?.character.location === "Sea" &&
          (player.locationStates?.sea?.attackSuccessReport ||
            player.locationStates?.sea?.attackFailureReport) && (
            <AttackReport />
          )}
      </div>
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) =>
  await getLoggedInServerSideProps(context)

export default Home
