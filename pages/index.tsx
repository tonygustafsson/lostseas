import { useSession } from "next-auth/react"

import DefaultLayout from "@/components/layouts/default"
import Button from "@/components/ui/Button"
import { CreateShip } from "@/graphql/ship"
import client from "@/graphql/client"

enum ShipType {
  FRIGATE = "Frigate",
  SLOOP = "Sloop",
  GALLEON = "Galleon",
}

const Home = () => {
  const { data: session, status } = useSession()

  const handleCreateShip = async () => {
    const newShip = await fetch("/api/createShip", {
      method: "POST",
      body: "",
      headers: {
        "Content-Type": "application/json",
      },
    })

    console.log(newShip)
  }

  return (
    <DefaultLayout>
      <h1 className="font-serif text-4xl mb-4">Lost Seas</h1>

      {status === "authenticated" && (
        <>
          <p>
            You are {session?.user?.characterName} and are{" "}
            {session?.user?.characterAge} years old.
          </p>

          {!!session?.user?.ships?.length && (
            <>
              <h3 className="text-xl mt-8 mb-2">Ships</h3>

              <ul>
                {(session?.user?.ships || []).map((ship, idx) => (
                  <li key={`ship-${idx}`}>
                    {ship.name} ({ship.type})
                  </li>
                ))}
              </ul>
            </>
          )}

          <Button onClick={handleCreateShip} className="mt-8 w-4/12">
            Create new ship
          </Button>
        </>
      )}
    </DefaultLayout>
  )
}

export default Home
