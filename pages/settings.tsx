import { useRouter } from "next/router"
import { useState } from "react"

import CenteredLayout from "@/components/layouts/centered"
import Button from "@/components/ui/Button"
import TextField from "@/components/ui/TextField"
import { useGetUser } from "@/hooks/queries/useUser"

const Settings = () => {
  const router = useRouter()
  const { data: user } = useGetUser()

  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const json = JSON.stringify(Object.fromEntries(formData.entries()))

    try {
      await fetch("/api/user/settings", {
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

  if (!user) {
    return <p>Access denied</p>
  }

  return (
    <CenteredLayout>
      <h1 className="font-serif text-4xl mb-8">Settings</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4 max-w-md max-w-md"
      >
        <h2 className="font-serif text-2xl">Player</h2>

        <TextField type="hidden" name="userId" defaultValue={user?.id || ""} />

        <TextField
          label="Name"
          id="name"
          name="name"
          defaultValue={user?.name || ""}
        />

        <h2 className="font-serif text-2xl mt-8">Character</h2>

        <TextField
          label="Name"
          id="characterName"
          name="characterName"
          defaultValue={user?.characterName || ""}
        />

        <TextField
          label="Age"
          id="characterAge"
          name="characterAge"
          type="number"
          defaultValue={String(user?.characterAge) || ""}
          min={15}
          max={80}
        />

        {error && <p className="text-red-500">{error}</p>}

        <Button type="submit" className="mt-4">
          Save
        </Button>
      </form>
    </CenteredLayout>
  )
}

export default Settings
