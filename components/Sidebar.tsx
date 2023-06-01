import Link from "next/link"
import {
  FiLogIn,
  FiLogOut,
  FiSettings,
  FiUser,
  FiUserPlus,
} from "react-icons/fi"

import { LOCAL_STORAGE_PLAYER_ID_KEY } from "@/constants/system"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const Sidebar = () => {
  const { data: player } = useGetPlayer()

  const signOut = () => {
    window.localStorage.removeItem(LOCAL_STORAGE_PLAYER_ID_KEY)
    window.location.href = "/"
  }

  return (
    <div className="w-80 py-8 px-4 bg-base-300 ">
      <Link
        href="/"
        className="font-serif text-3xl flex gap-3 items-center mb-4"
      >
        <span className="text-5xl font-medium -mt-2">☠</span> Lost Seas
      </Link>

      <ul className="menu text-base-content">
        {player ? (
          <>
            <li>
              <a>
                <FiUser className="h-5 w-5" />
                Playing as {player?.user.name}
              </a>
            </li>

            <li>
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
    </div>
  )
}

export default Sidebar
