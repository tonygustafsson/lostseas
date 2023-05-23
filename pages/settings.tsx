import { useRouter } from "next/router"
import { useQRCode } from "next-qrcode"
import { useState } from "react"

import CenteredLayout from "@/components/layouts/centered"
import Button from "@/components/ui/Button"
import TextField from "@/components/ui/TextField"
import { useGetUser } from "@/hooks/queries/useUser"

const Settings = () => {
  const router = useRouter()
  const { data: user } = useGetUser()
  const { SVG } = useQRCode()

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

      <p>Account created: {new Date(user?.createdDate).toLocaleDateString()}</p>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4 max-w-md"
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

      <div className="w-full flex flex-col gap-4 max-w-md mt-8">
        <h2 className="font-serif text-2xl">Save your game</h2>

        <p>
          You can download or photograph the QR code below and login with it
          using a webcam.
        </p>

        <SVG
          text={user?.id || ""}
          options={{
            margin: 2,
            width: 300,
            color: {
              dark: "#000000",
              light: "#ffffff",
            },
          }}
        />
      </div>
    </CenteredLayout>
  )
}

export default Settings
