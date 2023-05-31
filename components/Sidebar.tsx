import Link from "next/link"

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
              <a>Playing as {player?.user.name}</a>
            </li>

            <li>
              <Link href="/settings">Settings</Link>
            </li>

            <li>
              <a onClick={() => signOut()}>Sign out</a>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">Sign in</Link>
            </li>

            <li>
              <Link href="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

export default Sidebar
