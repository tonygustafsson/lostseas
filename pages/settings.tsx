import { useQRCode } from "next-qrcode"
import { useState } from "react"

import DefaultLayout from "@/components/layouts/default"
import Select from "@/components/ui/Select"
import TextField from "@/components/ui/TextField"
import { useGetPlayer, usePlayer } from "@/hooks/queries/usePlayer"

const Settings = () => {
  const { data: player } = useGetPlayer()
  const { changeSettings, changeSettingsIsLoading } = usePlayer()
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
    <DefaultLayout>
      <h1 className="text-3xl font-serif text mb-8">Settings</h1>

      <p className="mb-4">
        Account created: {new Date(player?.createdDate).toLocaleDateString()}
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4 max-w-md"
      >
        <TextField
          type="hidden"
          name="userId"
          defaultValue={player?.id || ""}
        />

        <h2 className="font-serif text-2xl mt-4">Character</h2>

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

        <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={changeSettingsIsLoading}
        >
          Save
        </button>
      </form>

      <div className="w-full flex flex-col gap-4 max-w-md mt-8">
        <h2 className="font-serif text-2xl">Save your game</h2>

        <h3 className="font-serif text-large">By User ID</h3>

        <p>Here is the User ID that you can use for logging in:</p>

        <pre className="text-green-300">{player?.id}</pre>

        <h3 className="font-serif text-large">By QR code</h3>

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
    </DefaultLayout>
  )
}

export default Settings
