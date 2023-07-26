import Image from "next/image"
import Link from "next/link"

import { useGetPlayer } from "@/hooks/queries/usePlayer"

import SoundControls from "../Sound/Controls"
import CharacterCard from "./CharacterCard"
import MainMenu from "./MainMenu"
import WeatherCard from "./WeatherCard"

type Props = {
  className?: string
}

const DesktopMenu = ({ className }: Props) => {
  const { data: player } = useGetPlayer()

  return (
    <div className={`w-72 py-8 px-4 bg-gray-900 ${className}`}>
      <Link
        href="/"
        className="flex font-serif text-3xl gap-3 items-baseline mb-2 mx-3"
      >
        <Image
          src="/img/logo.svg"
          alt="Lost Seas logotype"
          width={42}
          height={34}
        />
        Lost Seas
      </Link>

      <MainMenu />
      <SoundControls />

      {player && (
        <>
          <CharacterCard player={player} />
          <WeatherCard day={player.character.day} />
        </>
      )}
    </div>
  )
}

export default DesktopMenu
