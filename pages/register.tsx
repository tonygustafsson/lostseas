import { useState } from "react"

import DefaultLayout from "@/components/layouts/default"
import Select from "@/components/ui/Select"
import TextField from "@/components/ui/TextField"
import { NATIONS } from "@/constants/locations"
import { usePlayer } from "@/hooks/queries/usePlayer"
import getEnglishFemaleName from "@/utils/getEnglishFemaleName"
import getEnglishMaleName from "@/utils/getEnglishMaleName"
import getEnglishSurname from "@/utils/getEnglishSurname"
import { getRandomInt } from "@/utils/random"

const Register = () => {
  const { register, registrationIsLoading } = usePlayer()

  const randomGender: CrewMember["gender"] =
    Math.random() > 0.25 ? "Male" : "Female"
  const randomName = `${
    randomGender === "Male" ? getEnglishMaleName() : getEnglishFemaleName()
  } ${getEnglishSurname()}`
  const randomAge = getRandomInt(14, 70)
  const randomNationalityIndex = getRandomInt(0, 3)
  const randomNationality = NATIONS[randomNationalityIndex]

  const [name, setName] = useState(randomName)
  const [age, setAge] = useState(randomAge)
  const [gender, setGender] = useState(randomGender)
  const [nationality, setNationality] = useState(randomNationality)

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
          id="name"
          name="name"
          label="Name"
          value={name}
          minLength={3}
          onChange={(e) => setName(e)}
          required
        />

        <Select
          label="Nationality"
          name="nationality"
          id="nationality"
          value={nationality}
          options={NATIONS}
          onChange={(e) => setNationality(e.target.value)}
        />

        <Select
          label="Gender"
          name="gender"
          id="gender"
          value={gender}
          options={["Male", "Female"]}
          onChange={(e) => setGender(e.target.value)}
        />

        <TextField
          type="number"
          required
          min={14}
          max={70}
          id="age"
          name="age"
          label="Age"
          value={age.toString()}
          onChange={(e) => setAge(parseInt(e))}
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
