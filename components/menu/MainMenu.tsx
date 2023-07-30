import Link from "next/link"
import { useRouter } from "next/router"
import { FiLogOut, FiSettings } from "react-icons/fi"
import {
  GiBandana,
  GiOpenedFoodCan,
  GiPirateCoat,
  GiPirateHat,
  GiShoonerSailboat,
} from "react-icons/gi"
import { RiTreasureMapLine } from "react-icons/ri"

import { useGetPlayer, usePlayer } from "@/hooks/queries/usePlayer"

import Map from "../Map"
import { useModal } from "../ui/Modal/context"

const MainMenu = () => {
  const { data: player } = useGetPlayer()
  const { pathname } = useRouter()
  const { logout } = usePlayer()
  const { setModal } = useModal()

  const numberOfShips = Object.values(player?.ships ?? {}).length
  const numberOfInventoryItems = Object.values(player?.inventory ?? {}).length

  const showMap = () => {
    setModal({
      id: "map",
      title: "Pick your destination",
      fullWidth: true,
      content: <Map currentTown={player?.character.town} />,
    })
  }

  return (
    <ul className="main-menu">
      <li className={`${pathname === "/" ? "active" : ""}`}>
        <Link href="/">
          <GiPirateHat className="h-5 w-5" />
          Play
        </Link>
      </li>

      <li>
        <button onClick={showMap} disabled={!!player?.character.journey}>
          <RiTreasureMapLine className="h-5 w-5" />
          Map
        </button>
      </li>

      <li className="main-menu-separator" aria-hidden></li>

      <li className={`${pathname === "/status" ? "active" : ""}`}>
        <Link href="/status">
          <GiPirateCoat className="h-5 w-5" />
          Status
        </Link>
      </li>

      <li className={`${pathname === "/ships" ? "active" : ""}`}>
        <Link href="/ships">
          <GiShoonerSailboat className="h-5 w-5" />
          Ships
          <span className="badge badge-sm badge-primary">{numberOfShips}</span>
        </Link>
      </li>

      <li className={`${pathname === "/crew" ? "active" : ""}`}>
        <Link href="/crew">
          <GiBandana className="h-5 w-5" />
          Crew members
          <span className="badge badge-sm badge-primary">
            {player?.crewMembers.count}
          </span>
        </Link>
      </li>

      <li className={`${pathname === "/inventory" ? "active" : ""}`}>
        <Link href="/inventory">
          <GiOpenedFoodCan className="h-5 w-5" />
          Inventory
          <span className="badge badge-sm badge-primary">
            {numberOfInventoryItems}
          </span>
        </Link>
      </li>

      <li className="main-menu-separator" aria-hidden></li>

      <li className={`${pathname === "/settings" ? "active" : ""}`}>
        <Link href="/settings">
          <FiSettings className="h-5 w-5" />
          Settings
        </Link>
      </li>

      <li>
        <a onClick={() => logout()}>
          <FiLogOut className="h-5 w-5" />
          Sign out
        </a>
      </li>
    </ul>
  )
}

export default MainMenu
