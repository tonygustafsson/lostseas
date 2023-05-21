import Link from "next/link"

import { useUser } from "@/hooks/queries/useUser"

import Button from "./ui/Button"

const Header = () => {
  const { data: user } = useUser()

  const signOut = () => {
    window.localStorage.removeItem("userId")
    window.location.href = "/"
  }

  return (
    <div className="bg-slate-800 flex gap-4 p-4 mb-4 justify-between">
      <Link href="/" className="font-serif text-3xl flex gap-3 items-center">
        <span className="text-5xl font-medium -mt-2">☠</span> Lost Seas
      </Link>

      {user ? (
        <div className="flex gap-4 items-center align-middle">
          <p className="text-sm">Signed in as {user?.name}</p>

          <Link href="/settings">
            <Button size="lg">Settings</Button>
          </Link>

          <Button size="lg" onClick={() => signOut()}>
            Sign out
          </Button>
        </div>
      ) : (
        <div className="flex gap-4 justify-end align-middle">
          <Link href="/login">
            <Button size="lg">Sign in</Button>
          </Link>

          <Link href="/register">
            <Button size="lg">Register</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Header
