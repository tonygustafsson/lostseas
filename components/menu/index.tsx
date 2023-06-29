import Link from "next/link"
import { useState } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { GiCoins, GiPirateFlag, GiPirateHat } from "react-icons/gi"

import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getCurrentDate } from "@/utils/date"

import Flag from "../icons/Flag"
import WeatherIcon from "../WeatherIcon"
import MainMenu from "./MainMenu"
import MobileBottomNav from "./MobileBottomNav"

const Menu = () => {
  const { data: player } = useGetPlayer()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const currentDate = getCurrentDate(player?.character.week || 0)

  return (
    <>
      <h1 className="lg:hidden font-serif text-2xl text-center p-2 flex justify-center items-center gap-2 bg-gray-900">
        <GiPirateFlag className="h-6 w-6" /> Lost Seas
      </h1>

      <MobileBottomNav setMobileMenuOpen={setMobileMenuOpen} />

      <div
        className={`${
          !mobileMenuOpen ? "-translate-x-full lg:translate-x-0" : ""
        } transition-transform fixed lg:static overflow-y-auto z-10 w-72 h-full lg:h-auto py-8 px-4 bg-gray-900`}
      >
        <Link
          href="/"
          className="hidden lg:flex font-serif text-3xl gap-3 items-center mb-4 mx-2"
        >
          <GiPirateFlag className="h-8 w-8" /> Lost Seas
        </Link>

        <button
          className="lg:hidden absolute right-2 top-2 text-info"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <AiOutlineCloseCircle className="h-6 w-6" />
        </button>

        <MainMenu />

        {player && (
          <>
            <div className="card w-full bg-gray-800 shadow-lg mt-2 lg:mt-8 rounded-md">
              <figure className="mt-4">
                <GiPirateHat className="hidden lg:block h-14 w-14" />
              </figure>

              <div className="card-body p-6 pt-2">
                <h2 className="card-title font-serif gap-2">
                  <Flag
                    nation={player?.character.nationality}
                    size={28}
                    className="opacity-[0.8]"
                  />
                  {player?.character.name}
                </h2>

                <p className="text-sm">
                  You are a {player?.character.age} year old{" "}
                  {player?.character.gender.toLowerCase()} from{" "}
                  {player?.character.nationality}.
                </p>

                <div className="stats bg-gray-800">
                  <div className="stat px-0 py-2">
                    <div className="stat-figure text-secondary">
                      <GiCoins className="h-8 w-8" />
                    </div>
                    <div className="stat-title">Gold</div>
                    <div className="stat-value text-xl">
                      {player?.character.gold}
                    </div>
                  </div>
                </div>

                <div className="card-actions justify-end">
                  <Link href="/status">
                    <button className="btn btn-secondary btn-sm">
                      More info
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="card w-full bg-gray-800 shadow-lg mt-4 rounded-md">
              <div className="card-body px-6 py-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">{currentDate}</span>
                  <WeatherIcon className="h-8 w-8 text-secondary" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Menu
