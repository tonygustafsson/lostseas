import Image from "next/image"
import Link from "next/link"
import { FiLogOut, FiSettings } from "react-icons/fi"
import { PiBookOpenTextBold } from "react-icons/pi"

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

  if (!player) return null

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
          height={32}
          style={{ height: 32 }}
        />
        Lost Seas
      </Link>

      <MainMenu />

      <ul className="menu menu-horizontal rounded-box flex justify-center mb-6">
        <li>
          <Link href="/settings" className="tooltip" data-tip="Settings">
            <FiSettings className="h-5 w-5" />
          </Link>
        </li>

        <li>
          <Link href="/guide" className="tooltip" data-tip="Player guide">
            <PiBookOpenTextBold className="h-5 w-5" />
          </Link>
        </li>

        <li>
          <a className="tooltip" data-tip="Sign out">
            <FiLogOut className="h-5 w-5" />
          </a>
        </li>
      </ul>

      <SoundControls />
      <CharacterCard player={player} />
      <WeatherCard day={player.character.day} />
    </div>
  )
}

export default DesktopMenu
