import { useState } from "react"

import DefaultLayout from "@/components/layouts/default"
import Select from "@/components/ui/Select"
import TextField from "@/components/ui/TextField"
import { usePlayer } from "@/hooks/queries/usePlayer"

const Register = () => {
  const { register, registrationIsLoading } = usePlayer()

  const [characterGender, setCharacterGender] = useState("Male")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const inputData = Object.fromEntries(
      formData.entries()
    ) as unknown as Player

    register(inputData)
  }

  return (
    <DefaultLayout>
      <h1 className="font-serif text-4xl mb-8">Register</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4 max-w-md"
      >
        <h2 className="font-serif text-2xl">Player</h2>

        <TextField id="user_name" name="user_name" label="Name" autoFocus />

        <h2 className="font-serif text-2xl mt-8">Character</h2>

        <TextField id="character_name" name="character_name" label="Name" />

        <Select
          label="Gender"
          name="character_gender"
          id="character_gender"
          value={characterGender}
          options={["Male", "Female"]}
          onChange={(e) => setCharacterGender(e.target.value)}
        />

        <TextField
          type="number"
          min={15}
          max={80}
          id="character_age"
          name="character_age"
          label="Age"
        />

        <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={registrationIsLoading}
        >
          Register
        </button>
      </form>
    </DefaultLayout>
  )
}

export default Register
