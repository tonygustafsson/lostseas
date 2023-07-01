import { useState } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { GiPirateFlag } from "react-icons/gi"

import { useGetPlayer } from "@/hooks/queries/usePlayer"

import CharacterCard from "./CharacterCard"
import MainMenu from "./MainMenu"
import MobileBottomNav from "./MobileBottomNav"
import WeatherCard from "./WeatherCard"

type Props = {
  className?: string
}

const MobileMenu = ({ className }: Props) => {
  const { data: player } = useGetPlayer()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className={className}>
      <h1 className="font-serif text-2xl text-center p-2 flex justify-center items-center gap-2 bg-gray-900">
        <GiPirateFlag className="h-6 w-6" /> Lost Seas
      </h1>

      <MobileBottomNav setMobileMenuOpen={setMobileMenuOpen} />

      <div
        className={`${
          !mobileMenuOpen ? "-translate-x-full" : ""
        } transition-transform fixed top-0 left-0 shadow-2xl overflow-y-auto z-10 w-72 h-full py-8 px-4 bg-gray-900`}
      >
        <button
          className="absolute right-2 top-2 text-info"
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
    </div>
  )
}

export default MobileMenu
