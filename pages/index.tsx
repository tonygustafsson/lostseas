import Link from "next/link"

import CrewMembers from "@/components/CrewMembers"
import DefaultLayout from "@/components/layouts/default"
import Ships from "@/components/Ships"
import Button from "@/components/ui/Button"
import { useGetPlayer } from "@/hooks/queries/useUser"

const Home = () => {
  const { data: player } = useGetPlayer()

  return (
    <DefaultLayout>
      {player && (
        <>
          <h1 className="font-serif text-4xl mb-4">Havanas tavern</h1>

          <p>
            You are {player?.character.name} and are a {player?.character.age}{" "}
            year old {player?.character.gender.toLowerCase()}.
          </p>

          <Ships />
          <CrewMembers />
        </>
      )}

      {!player && (
        <>
          <h1 className="font-serif text-4xl mb-8">Signed out</h1>

          <div className="flex gap-4">
            <Link href="/login">
              <Button size="lg">Sign in</Button>
            </Link>

            <Link href="/register">
              <Button size="lg">Register</Button>
            </Link>
          </div>
        </>
      )}
    </DefaultLayout>
  )
}

export default Home
