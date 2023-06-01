import Link from "next/link"

import DefaultLayout from "@/components/layouts/default"
import Move from "@/components/Move"
import Travel from "@/components/Travel"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const Home = () => {
  const { data: player } = useGetPlayer()

  return (
    <DefaultLayout>
      {player && (
        <>
          <div
            className="hero"
            style={{ backgroundImage: `url("img/place/docks_england.png")` }}
          >
            <div className="hero-overlay bg-opacity-50"></div>
            <div className="hero-content text-center text-neutral-content py-24">
              <div className="max-w-2xl bg-base-300 bg-opacity-60 p-8">
                <h1 className="font-serif mb-5 text-5xl">
                  {player?.character.town}s {player?.character.location}
                </h1>

                <p className="mb-5">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>

                <div className="flex gap-4 mt-4 justify-center">
                  <Move />
                  <Travel />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

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
