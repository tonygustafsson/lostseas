import { useRouter } from "next/router"
import { useState } from "react"

import CenteredLayout from "@/components/layouts/centered"
import Button from "@/components/ui/Button"
import pacifico from "@/font-pacifico"

const Register = () => {
  const router = useRouter()

  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const json = JSON.stringify(Object.fromEntries(formData.entries()))

    try {
      await fetch("/api/auth/register", {
        method: "POST",
        body: json,
        headers: {
          "Content-Type": "application/json",
        },
      })

      router.push("/")
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <CenteredLayout>
      <h1 className="font-serif text-4xl mb-8">Register</h1>

      <form
        onSubmit={handleSubmit}
        className={`${pacifico.variable} flex flex-col gap-4`}
      >
        <h2 className="font-serif text-2xl">Player</h2>

        <label htmlFor="name">Name</label>

        <input id="name" name="name" type="text" className="text-black px-2" />

        <label htmlFor="email">Username</label>

        <input
          id="email"
          name="email"
          type="text"
          className="text-black px-2"
        />

        <label htmlFor="password">Password</label>

        <input
          id="password"
          name="password"
          type="password"
          className="text-black px-2"
        />

        <h2 className="font-serif text-2xl mt-8">Character</h2>

        <label htmlFor="characterName">Name</label>

        <input
          id="characterName"
          name="characterName"
          type="text"
          className="text-black px-2"
        />

        <label htmlFor="characterAge">Age</label>

        <input
          id="characterAge"
          name="characterAge"
          type="number"
          min={15}
          max={80}
          className="text-black px-2"
        />

        {error && <p className="text-red-500">{error}</p>}

        <Button type="submit" className="mt-4">
          Register
        </Button>
      </form>
    </CenteredLayout>
  )
}

export default Register
