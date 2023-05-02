import { useSession } from "next-auth/react"

import DefaultLayout from "@/components/layouts/default"

const Home = () => {
  const { data: session, status } = useSession()

  return (
    <DefaultLayout>
      <h1 className="font-serif text-4xl mb-4">Lost Seas</h1>

      {status === "authenticated" && (
        <p>You are {session?.user?.characterName}</p>
      )}
    </DefaultLayout>
  )
}

export default Home
