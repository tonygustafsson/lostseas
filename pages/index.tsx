import { GetServerSideProps } from "next"
import { AiOutlineShop } from "react-icons/ai"
import { BsTools } from "react-icons/bs"
import {
  GiBank,
  GiFarmer,
  GiSmallFishingSailboat,
  GiTavernSign,
} from "react-icons/gi"
import { RiBankLine } from "react-icons/ri"

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
      <LocationHero />

      <div className="bg-gray-900 rounded-b-lg p-4 flex items-center flex-col">
        <span className="text-xl font-serif">Change location</span>

        <div className="flex flex-wrap mt-4 gap-1 justify-center join">
          <button className="btn btn-lg capitalize bg-gray-800 join-item">
            <AiOutlineShop className="text-cyan-600 w-8 h-8" />
            Shop
          </button>
          <button className="btn btn-lg capitalize bg-gray-800 join-item">
            <GiTavernSign className="text-cyan-600 w-8 h-8" /> Tavern
          </button>
          <button className="btn btn-lg capitalize bg-gray-800 join-item">
            <GiBank className="text-cyan-600 w-8 h-8" /> Bank
          </button>
          <button className="btn btn-lg capitalize bg-gray-800 join-item">
            <GiFarmer className="text-cyan-600 w-8 h-8" /> Market
          </button>
          <button className="btn btn-lg capitalize bg-gray-800 join-item">
            <BsTools className="text-cyan-600 w-7 h-7" /> Shipyard
          </button>
          <button className="btn btn-lg capitalize bg-gray-800 join-item">
            <RiBankLine className="text-cyan-600 w-8 h-8" /> City hall
          </button>
          <button className="btn btn-lg capitalize btn-primary  join-item">
            <GiSmallFishingSailboat className="text-white w-8 h-8" /> Set sails
          </button>
        </div>
      </div>

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
