import Link from "next/link"

import CrewMembers from "@/components/CrewMembers"
import DefaultLayout from "@/components/layouts/default"
import Ships from "@/components/Ships"
import Button from "@/components/ui/Button"
import { useGetUser } from "@/hooks/queries/useUser"

const Home = () => {
  const { data: user } = useGetUser()

  return (
    <DefaultLayout>
      {user && (
        <>
          <h1 className="font-serif text-4xl mb-4">Havanas tavern</h1>

          <p>
            You are {user?.characterName} and are {user?.characterAge} years
            old.
          </p>

          <Ships />
          <CrewMembers />
        </>
      )}

      {!user && (
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
