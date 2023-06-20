import { GetServerSideProps } from "next"

import DefaultLayout from "@/components/layouts/default"
import Bank from "@/components/location/Bank"
import Market from "@/components/location/Market"
import Sea from "@/components/location/Sea"
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
      <p className="text-xs">Text xs</p>
      <p className="text-sm">Text sm</p>
      <p className="text-base">Text base</p>
      <p className="">Text default</p>
      <p className="text-lg">Text lg</p>
      <p className="text-xl">Text xl</p>
      <p className="text-2xl">Text 2xl</p>
      <p className="text-3xl">Text 3xl</p>
      <p className="text-4xl">Text 4xl</p>
      <p className="text-5xl">Text 5xl</p>
      <p className="text-6xl">Text 6xl</p>
      <p className="text-7xl">Text 7xl</p>
      <p className="text-8xl">Text 8xl</p>
      <p className="text-9xl">Text 9xl</p>

      <LocationHero />
      <LoggedOutHero />

      <div className="mt-8">
        {player?.character.location === "Shop" && <Shop />}
        {player?.character.location === "Bank" && <Bank />}
        {player?.character.location === "Market" && <Market />}
        {player?.character.location === "Tavern" && <Tavern />}
        {player?.character.location === "Shipyard" && <Shipyard />}
        {player?.character.location === "Sea" && <Sea />}
      </div>
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) =>
  getLoggedInServerSideProps(context)

export default Home
