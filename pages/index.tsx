import Link from "next/link"
import { useSession } from "next-auth/react"

import DefaultLayout from "@/components/layouts/default"
import Ships from "@/components/Ships"
import Button from "@/components/ui/Button"

const Home = () => {
  const { data: session, status } = useSession()

  return (
    <DefaultLayout>
      {status === "authenticated" && (
        <>
          <h1 className="font-serif text-4xl mb-4">Havanas tavern</h1>

          <p>
            You are {session?.user?.characterName} and are{" "}
            {session?.user?.characterAge} years old.
          </p>

          <Ships />
        </>
      )}

      {status === "unauthenticated" && (
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
