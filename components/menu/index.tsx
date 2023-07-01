import Link from "next/link"
import { useState } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { GiPirateFlag } from "react-icons/gi"

import { useGetPlayer } from "@/hooks/queries/usePlayer"

import CharacterCard from "./CharacterCard"
import MainMenu from "./MainMenu"
import MobileBottomNav from "./MobileBottomNav"
import WeatherCard from "./WeatherCard"

const Menu = () => {
  const { data: player } = useGetPlayer()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
            <CharacterCard character={player.character} />
            <WeatherCard week={player.character.week} />
          </>
        )}
      </div>
    </>
  )
}

export default Menu
