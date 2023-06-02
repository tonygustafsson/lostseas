import Link from "next/link"
import { FiLogIn, FiLogOut, FiSettings, FiUserPlus } from "react-icons/fi"
import {
  GiCoins,
  GiOpenedFoodCan,
  GiPirateCoat,
  GiPirateFlag,
  GiPirateHat,
  GiShoonerSailboat,
} from "react-icons/gi"

import { LOCAL_STORAGE_PLAYER_ID_KEY } from "@/constants/system"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const Sidebar = () => {
  const { data: player } = useGetPlayer()

  const numberOfCrewMembers = Object.values(player?.crewMembers ?? {}).length
  const numberOfShips = Object.values(player?.ships ?? {}).length

  const signOut = () => {
    window.localStorage.removeItem(LOCAL_STORAGE_PLAYER_ID_KEY)
    window.location.href = "/"
  }

  return (
    <div className="w-80 py-8 px-4 bg-base-300 ">
      <Link
        href="/"
        className="font-serif text-3xl flex gap-3 items-center mb-4 mx-2"
      >
        <GiPirateFlag className="h-8 w-8" /> Lost Seas
      </Link>

      <ul className="menu text-base-content">
        {player ? (
          <>
            <li>
              <Link href="/">
                <GiPirateHat className="h-5 w-5" />
                Play
              </Link>
            </li>

            <li className="mt-4">
              <Link href="/ships">
                <GiShoonerSailboat className="h-5 w-5" />
                Ships
                <span className="badge badge-sm badge-primary">
                  {numberOfShips}
                </span>
              </Link>
            </li>

            <li>
              <Link href="/crew">
                <GiPirateCoat className="h-5 w-5" />
                Crew members
                <span className="badge badge-sm badge-primary">
                  {numberOfCrewMembers}
                </span>
              </Link>
            </li>

            <li>
              <Link href="/inventory">
                <GiOpenedFoodCan className="h-5 w-5" />
                Inventory
              </Link>
            </li>

            <li className="mt-4">
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
            <li>
              <Link href="/login">
                <FiLogIn className="h-5 w-5" />
                Sign in
              </Link>
            </li>

            <li>
              <Link href="/register">
                <FiUserPlus className="h-5 w-5" />
                Register
              </Link>
            </li>
          </>
        )}
      </ul>

      {player && (
        <div className="card w-full bg-base-100 shadow-xl mt-8">
          <figure className="mt-4">
            <GiPirateHat className="h-14 w-14" />
          </figure>

          <div className="card-body p-6 pt-2">
            <h2 className="card-title">{player?.character.name}</h2>

            <p>
              You are a {player?.character.age} year old{" "}
              {player?.character.gender.toLowerCase()}.
            </p>

            <div className="stats">
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
              <Link href="/settings">
                <button className="btn btn-secondary btn-sm">Change</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar
