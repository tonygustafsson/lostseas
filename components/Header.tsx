import Link from "next/link"

import { LOCAL_STORAGE_PLAYER_ID_KEY } from "@/constants/system"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const Header = () => {
  const { data: player } = useGetPlayer()

  const signOut = () => {
    window.localStorage.removeItem(LOCAL_STORAGE_PLAYER_ID_KEY)
    window.location.href = "/"
  }

  return (
    <div className="bg-slate-800 flex gap-4 p-4 mb-4 justify-between">
      <Link href="/" className="font-serif text-3xl flex gap-3 items-center">
        <span className="text-5xl font-medium -mt-2">☠</span> Lost Seas
      </Link>

      {player ? (
        <div className="flex gap-4 items-center align-middle">
          <p className="text-sm">Signed in as {player?.user.name}</p>

          <Link href="/settings">
            <button className="btn btn-primary">Settings</button>
          </Link>

          <button className="btn btn-primary" onClick={() => signOut()}>
            Sign out
          </button>
        </div>
      ) : (
        <div className="flex gap-4 justify-end align-middle">
          <Link href="/login">
            <button className="btn btn-primary">Sign in</button>
          </Link>

          <Link href="/register">
            <button className="btn btn-primary">Register</button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Header
