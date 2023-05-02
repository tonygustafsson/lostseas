import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

import Button from "./ui/Button"

const Header = () => {
  const { data: session, status } = useSession()

  const loading = status === "loading"

  if (loading) return null

  return (
    <div className="bg-slate-800 flex gap-4 p-4 mb-4 justify-between">
      <Link href="/" className="font-serif text-3xl">
        Lost Seas
      </Link>

      {session ? (
        <div className="flex gap-4 items-center align-middle">
          <p className="text-sm">Signed in as {session?.user?.name}</p>

          <Link href="/settings">
            <Button>Settings</Button>
          </Link>

          <Button onClick={() => signOut()}>Sign out</Button>
        </div>
      ) : (
        <div className="flex gap-4 justify-end align-middle">
          <Link href="/login">
            <Button>Sign in</Button>
          </Link>

          <Link href="/register">
            <Button>Register</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Header
