import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"
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
import { HiMenu } from "react-icons/hi"

import { useGetPlayer, usePlayer } from "@/hooks/queries/usePlayer"
import { getCurrentDate } from "@/utils/date"

import Flag from "../icons/Flag"
import WeatherIcon from "../WeatherIcon"

const Menu = () => {
  const { data: player } = useGetPlayer()
  const { pathname } = useRouter()
  const { logout } = usePlayer()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const numberOfShips = Object.values(player?.ships ?? {}).length
  const numberOfInventoryItems = Object.values(player?.inventory ?? {}).length
  const currentDate = getCurrentDate(player?.character.week || 0)

  // TODO: Split up file

  return (
    <>
      <h1 className="lg:hidden font-serif text-2xl text-center p-2 flex justify-center items-center gap-2">
        <GiPirateFlag className="h-6 w-6" /> Lost Seas
      </h1>

      <div className="btm-nav lg:hidden z-10">
        <Link href="/" className={`${pathname === "/" ? "active" : ""}`}>
          <GiPirateHat className="h-5 w-5" />
          Play
        </Link>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <HiMenu className="h-5 w-5" />
          Menu
        </button>

        <Link
          href="/inventory"
          className={`${pathname === "/inventory" ? "active" : ""}`}
        >
          <GiOpenedFoodCan className="h-5 w-5" />
          Inventory
        </Link>
      </div>

      <div
        className={`${
          !mobileMenuOpen ? "-translate-x-full lg:translate-x-0" : ""
        } transition-transform fixed lg:static z-10 w-72 py-8 px-4 bg-gray-900`}
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
                  <span className="font-bold text-base">{currentDate}</span>
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
