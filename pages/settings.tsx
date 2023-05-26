import { useQRCode } from "next-qrcode"
import { useState } from "react"

import CenteredLayout from "@/components/layouts/centered"
import Button from "@/components/ui/Button"
import Select from "@/components/ui/Select"
import TextField from "@/components/ui/TextField"
import { useGetPlayer, usePlayerMutations } from "@/hooks/queries/usePlayer"

const Settings = () => {
  const { data: player } = useGetPlayer()
  const { changeSettings } = usePlayerMutations()
  const { SVG } = useQRCode()

  const [characterGender, setCharacterGender] = useState<"Male" | "Female">(
    player?.character.gender || "Male"
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    changeSettings(data)
  }

  if (!player) {
    return <p>Access denied</p>
  }

  return (
    <CenteredLayout>
      <h1 className="font-serif text-4xl mb-8">Settings</h1>

      <p>
        Account created: {new Date(player?.createdDate).toLocaleDateString()}
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4 max-w-md"
      >
        <h2 className="font-serif text-2xl">Player</h2>

        <TextField
          type="hidden"
          name="userId"
          defaultValue={player?.id || ""}
        />

        <TextField
          label="Name"
          id="user_name"
          name="user_name"
          defaultValue={player.user?.name || ""}
        />

        <h2 className="font-serif text-2xl mt-8">Character</h2>

        <TextField
          label="Name"
          id="character_name"
          name="character_name"
          defaultValue={player?.character.name || ""}
        />

        <Select
          label="Gender"
          name="character_gender"
          id="character_gender"
          value={characterGender}
          onChange={(e) => setCharacterGender(e.target.value)}
          options={["Male", "Female"]}
        />

        <TextField
          label="Age"
          id="character_age"
          name="character_age"
          type="number"
          defaultValue={String(player?.character.age) || ""}
          min={15}
          max={80}
        />

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
          text={player?.id || ""}
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
