import { useState } from "react"

import DefaultLayout from "@/components/layouts/default"
import Select from "@/components/ui/Select"
import TextField from "@/components/ui/TextField"
import { usePlayer } from "@/hooks/queries/usePlayer"
import getEnglishFemaleName from "@/utils/getEnglishFemaleName"
import getEnglishMaleName from "@/utils/getEnglishMaleName"
import getEnglishSurname from "@/utils/getEnglishSurname"

const Register = () => {
  const { register, registrationIsLoading } = usePlayer()

  const randomGender: CrewMember["gender"] =
    Math.random() > 0.25 ? "Male" : "Female"
  const randomName = `${
    randomGender === "Male" ? getEnglishMaleName() : getEnglishFemaleName()
  } ${getEnglishSurname()}`
  const randomAge = Math.floor(Math.random() * (70 - 14 + 1) + 14)

  const [characterName, setCharacterName] = useState(randomName)
  const [characterAge, setCharacterAge] = useState(randomAge)
  const [characterGender, setCharacterGender] = useState(randomGender)

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
        <h2 className="font-serif text-2xl mt-8">Character</h2>

        <TextField
          id="character_name"
          name="character_name"
          label="Name"
          value={characterName}
          onChange={(e) => setCharacterName(e)}
          required
        />

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
          required
          min={15}
          max={80}
          id="character_age"
          name="character_age"
          label="Age"
          value={characterAge.toString()}
          onChange={(e) => setCharacterAge(parseInt(e))}
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
