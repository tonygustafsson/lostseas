import Link from "next/link"
import { useRouter } from "next/router"
import { FiLogIn, FiLogOut, FiSettings, FiUserPlus } from "react-icons/fi"
import {
  GiHoodedFigure,
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
      content: <Map />,
    })
  }

  return (
    <ul className="sidebar-menu">
      {player ? (
        <>
          <li className={`${pathname === "/" ? "active" : ""}`}>
            <Link href="/">
              <GiPirateHat className="h-5 w-5" />
              Play
            </Link>
          </li>

          <li>
            <button onClick={showMap}>
              <RiTreasureMapLine className="h-5 w-5" />
              Map
            </button>
          </li>

          <li className="sidebar-menu-separator" aria-hidden></li>

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
              <span className="badge badge-sm badge-primary">
                {numberOfShips}
              </span>
            </Link>
          </li>

          <li className={`${pathname === "/crew" ? "active" : ""}`}>
            <Link href="/crew">
              <GiHoodedFigure className="h-5 w-5" />
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

          <li className="sidebar-menu-separator" aria-hidden></li>

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
        </>
      ) : (
        <>
          <li className={`${pathname === "/login" ? "active" : ""}`}>
            <Link href="/login">
              <FiLogIn className="h-5 w-5" />
              Sign in
            </Link>
          </li>

          <li className={`${pathname === "/register" ? "active" : ""}`}>
            <Link href="/register">
              <FiUserPlus className="h-5 w-5" />
              Register
            </Link>
          </li>
        </>
      )}
    </ul>
  )
}

export default MainMenu
