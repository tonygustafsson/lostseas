import { useRouter } from "next/router"
import { useState } from "react"

import CenteredLayout from "@/components/layouts/centered"
import Button from "@/components/ui/Button"
import TextField from "@/components/ui/TextField"

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
        className="w-full flex flex-col gap-4 max-w-md"
      >
        <h2 className="font-serif text-2xl">Player</h2>

        <TextField id="name" name="name" label="Name" autoFocus />
        <TextField id="username" name="username" label="Username" />
        <TextField
          id="password"
          name="password"
          type="password"
          label="Password"
        />

        <h2 className="font-serif text-2xl mt-8">Character</h2>

        <TextField id="characterName" name="characterName" label="Name" />
        <TextField
          type="number"
          min={15}
          max={80}
          id="characterAge"
          name="characterAge"
          label="Age"
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
