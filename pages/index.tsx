import Link from "next/link"

import DefaultLayout from "@/components/layouts/default"
import LocationHero from "@/components/LocationHero"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const Home = () => {
  const { data: player } = useGetPlayer()

  return (
    <DefaultLayout>
      <LocationHero />

      {!player && (
        <>
          <h1 className="font-serif text-4xl mb-8">Signed out</h1>

          <div className="flex gap-4">
            <Link href="/login">
              <button className="btn btn-primary btn-lg">Sign in</button>
            </Link>

            <Link href="/register">
              <button className="btn btn-primary btn-lg">Register</button>
            </Link>
          </div>
        </>
      )}
    </DefaultLayout>
  )
}

export default Home
