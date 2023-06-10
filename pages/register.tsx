import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import DefaultLayout from "@/components/layouts/default"
import Select from "@/components/ui/Select"
import TextField from "@/components/ui/TextField"
import { NATIONS } from "@/constants/locations"
import { usePlayer } from "@/hooks/queries/usePlayer"
import getEnglishFemaleName from "@/utils/getEnglishFemaleName"
import getEnglishMaleName from "@/utils/getEnglishMaleName"
import getEnglishSurname from "@/utils/getEnglishSurname"
import { getRandomInt } from "@/utils/random"
import validationRules from "@/utils/validation"

const validationSchema = z.object({
  name: validationRules.character.name,
  nationality: validationRules.character.nationality,
  gender: validationRules.character.gender,
  age: validationRules.character.age,
})

type ValidationSchema = z.infer<typeof validationSchema>

const Register = () => {
  const { register: playerRegister, registrationIsLoading } = usePlayer()

  const randomGender: CrewMember["gender"] =
    Math.random() > 0.25 ? "Male" : "Female"
  const randomName = `${
    randomGender === "Male" ? getEnglishMaleName() : getEnglishFemaleName()
  } ${getEnglishSurname()}`
  const randomAge = getRandomInt(14, 70)
  const randomNationalityIndex = getRandomInt(0, 3)
  const randomNationality = NATIONS[randomNationalityIndex]

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    mode: "onChange",
  })

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    playerRegister(data)
  }

  return (
    <DefaultLayout>
      <h1 className="font-serif text-4xl mb-8">Register</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4 max-w-md"
      >
        <h2 className="font-serif text-2xl mt-8">Character</h2>

        <TextField
          label="Name"
          {...register("name", { value: randomName })}
          error={errors.name?.message}
        />

        <Select
          label="Nationality"
          options={NATIONS}
          {...register("nationality", { value: randomNationality })}
        />

        <Select
          label="Gender"
          options={["Male", "Female"]}
          {...register("gender", { value: randomGender })}
        />

        <TextField
          type="number"
          label="Age"
          {...register("age", { value: randomAge, valueAsNumber: true })}
          error={errors.age?.message}
        />

        <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={
            (!isValid && isDirty) ||
            registrationIsLoading ||
            registrationIsLoading
          }
        >
          Register
        </button>
      </form>
    </DefaultLayout>
  )
}

export default Register
