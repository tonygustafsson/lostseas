import { useSession } from "next-auth/react"

import DefaultLayout from "@/components/layouts/default"
import Ships from "@/components/Ships"

const Home = () => {
  const { data: session, status } = useSession()

  return (
    <DefaultLayout>
      <h1 className="font-serif text-4xl mb-4">Havanas tavern</h1>

      {status === "loading" && <p>Loading...</p>}

      {status === "authenticated" && (
        <>
          <p>
            You are {session?.user?.characterName} and are{" "}
            {session?.user?.characterAge} years old.
          </p>

          <Ships />
        </>
      )}
    </DefaultLayout>
  )
}

export default Home
