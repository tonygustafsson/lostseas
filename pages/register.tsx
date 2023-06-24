import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import DefaultLayout from "@/components/layouts/default"
import Select from "@/components/ui/Select"
import TextField from "@/components/ui/TextField"
import { NATIONS } from "@/constants/locations"
import { usePlayer } from "@/hooks/queries/usePlayer"
import { getRandomCharacter } from "@/utils/getRandomCharacter"
import { registrationValidationSchema } from "@/utils/validation"

type ValidationSchema = z.infer<typeof registrationValidationSchema>

type Props = {
  randomCharacter: CharacterCreation
}

const Register = ({ randomCharacter }: Props) => {
  const { register: playerRegister, registrationIsLoading } = usePlayer()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(registrationValidationSchema),
    mode: "onChange",
  })

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    playerRegister(data)
  }

  const fetchNewRandomCharacter = async () => {
    const randomCharacterResponse = await fetch(`/api/user/getRandomCharacter`)
    const randomCharacter =
      (await randomCharacterResponse.json()) as CharacterCreation

    setValue("name", randomCharacter.name)
    setValue("nationality", randomCharacter.nationality)
    setValue("gender", randomCharacter.gender)
    setValue("age", randomCharacter.age)
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
          {...register("name", { value: randomCharacter.name })}
          error={errors.name?.message}
        />

        <Select
          label="Nationality"
          options={NATIONS}
          {...register("nationality", { value: randomCharacter.nationality })}
        />

        <Select
          label="Gender"
          options={["Male", "Female"]}
          {...register("gender", { value: randomCharacter.gender })}
        />

        <TextField
          type="number"
          label="Age"
          {...register("age", {
            value: randomCharacter.age,
            valueAsNumber: true,
          })}
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

        <button
          onClick={fetchNewRandomCharacter}
          type="button"
          className="btn btn-secondary mt-4"
        >
          Randomize character
        </button>
      </form>
    </DefaultLayout>
  )
}

export const getServerSideProps = async () => {
  const randomCharacter = getRandomCharacter()

  return {
    props: {
      randomCharacter,
    },
  }
}

export default Register
