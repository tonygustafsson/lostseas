import Link from "next/link"
import { useRouter } from "next/router"
import { FiLogIn, FiLogOut, FiSettings, FiUserPlus } from "react-icons/fi"
import {
  GiCoins,
  GiHoodedFigure,
  GiOpenedFoodCan,
  GiPirateCoat,
  GiPirateFlag,
  GiPirateHat,
  GiShoonerSailboat,
} from "react-icons/gi"

import { LOCAL_STORAGE_PLAYER_ID_KEY } from "@/constants/system"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import Flag from "./icons/Flag"

const Sidebar = () => {
  const { data: player } = useGetPlayer()
  const { pathname } = useRouter()

  const numberOfCrewMembers = Object.values(player?.crewMembers ?? {}).length
  const numberOfShips = Object.values(player?.ships ?? {}).length
  const numberOfInventoryItems = Object.values(player?.inventory ?? {}).length

  const signOut = () => {
    window.localStorage.removeItem(LOCAL_STORAGE_PLAYER_ID_KEY)
    window.location.href = "/"
  }

  return (
    <div className="w-80 py-8 px-4 bg-gray-900">
      <Link
        href="/"
        className="font-serif text-3xl flex gap-3 items-center mb-4 mx-2"
      >
        <GiPirateFlag className="h-8 w-8" /> Lost Seas
      </Link>

      <ul className="sidebar-menu">
        {player ? (
          <>
            <li className={`${pathname === "/" ? "active" : ""}`}>
              <Link href="/">
                <GiPirateHat className="h-5 w-5" />
                Play
              </Link>
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
                  {numberOfCrewMembers}
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
              <a onClick={() => signOut()}>
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

      {player && (
        <div className="card w-full bg-gray-800 shadow-lg mt-8 rounded-md">
          <figure className="mt-4">
            <GiPirateHat className="h-14 w-14" />
          </figure>

          <div className="card-body p-6 pt-2">
            <h2 className="card-title">
              <Flag
                nation={player?.character.nationality}
                size={24}
                className="opacity-[0.8]"
              />
              {player?.character.name}
            </h2>

            <p>
              You are a {player?.character.age} year old{" "}
              {player?.character.gender.toLowerCase()} from{" "}
              {player?.character.nationality}.
            </p>

            <div className="stats bg-gray-800">
              <div className="stat px-0 py-2">
                <div className="stat-figure text-secondary">
                  <GiCoins className="h-8 w-8" />
                </div>
                <div className="stat-title">Doubloons</div>
                <div className="stat-value text-2xl">
                  {player?.inventory.doubloons}
                </div>
              </div>
            </div>

            <div className="card-actions justify-end">
              <Link href="/status">
                <button className="btn btn-secondary btn-sm">More info</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar
