import { GetServerSideProps } from "next"
import Head from "next/head"

import DefaultLayout from "@/components/layouts/default"
import FullscreenLayout from "@/components/layouts/fullscreen"
import AttackReport from "@/components/location/AttackReport"
import Bank from "@/components/location/Bank"
import Cityhall from "@/components/location/Cityhall"
import Harbor from "@/components/location/Harbor"
import Market from "@/components/location/Market"
import Shipyard from "@/components/location/Shipyard"
import Shop from "@/components/location/Shop"
import Tavern from "@/components/location/Tavern"
import LocationHero from "@/components/LocationHero"
import LoginScreen from "@/components/LoginScreen"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import {
  getAllSeaLocationBackgrounds,
  getAllTownLocationBackgrounds,
} from "@/utils/location"
import { getLoggedInServerSideProps } from "@/utils/next/getLoggedInServerSideProps"

const Home = () => {
  const { data: player } = useGetPlayer()

  const allTownBackgrounds =
    player?.character.location === "Harbor"
      ? getAllTownLocationBackgrounds(player?.character.town)
      : []

  const allSeaBackgrounds =
    player?.character?.journey?.day === 1 ? getAllSeaLocationBackgrounds() : []

  if (!player) {
    return (
      <FullscreenLayout>
        <Head>
          <title>Lost Seas</title>
        </Head>

        <LoginScreen />
      </FullscreenLayout>
    )
  }

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

        {allTownBackgrounds.map((bg) => (
          <link key={`bg-${bg}`} rel="preload" as="image" href={bg} />
        ))}

        {allSeaBackgrounds.map((bg) => (
          <link key={`bg-${bg}`} rel="preload" as="image" href={bg} />
        ))}
      </Head>

      <LocationHero />

      <div className="mt-8">
        {player?.character.location === "Shop" && <Shop />}
        {player?.character.location === "Bank" && <Bank />}
        {player?.character.location === "Market" && <Market />}
        {player?.character.location === "Tavern" && <Tavern />}
        {player?.character.location === "City hall" && <Cityhall />}
        {player?.character.location === "Shipyard" && <Shipyard />}
        {player?.character.location === "Harbor" && <Harbor />}

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
