import Link from "next/link"

import { useGetPlayer } from "@/hooks/queries/usePlayer"

const LoggedOutHero = () => {
  const { data: player } = useGetPlayer()

  if (player) return null

  return (
    <div
      className="hero rounded-lg"
      style={{
        backgroundImage: `url("img/place/tavern_england.png")`,
      }}
    >
      <div className="hero-overlay bg-opacity-50"></div>
      <div className="hero-content text-center text-neutral-content py-24">
        <div className="max-w-2xl bg-base-300 bg-opacity-60 p-8 rounded-lg">
          <h1 className="font-serif mb-5 text-5xl">Lost Seas</h1>

          <p className="mb-5">Please login or register to start playing.</p>

          <div className="flex gap-4 mt-4 justify-center">
            <Link href="/login">
              <button className="btn btn-primary">Sign in</button>
            </Link>

            <Link href="/register">
              <button className="btn btn-primary">Register</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoggedOutHero
