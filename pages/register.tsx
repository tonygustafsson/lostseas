import { zodResolver } from "@hookform/resolvers/zod"
import Head from "next/head"
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
    <>
      <Head>
        <title>Register - Lost Seas</title>
      </Head>

      <DefaultLayout>
        <h1 className="font-serif text-4xl mb-8">Register</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4 max-w-md"
        >
          <h2 className="font-serif text-2xl">Character</h2>

          <TextField
            label="Name"
            {...register("name", { value: randomCharacter.name })}
            error={errors.name?.message}
          />

          <Select
            label="Nationality"
            options={Object.keys(NATIONS)}
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

          <h2 className="font-serif text-2xl mt-4">Settings</h2>

          <div className="flex flex-col gap-4 pb-4">
            <div className="flex items-center gap-4">
              <input
                id="toggleMusic"
                type="checkbox"
                className="toggle toggle-sm toggle-info"
                {...register("musicOn", { value: true })}
              />
              <label htmlFor="toggleMusic">Music</label>
            </div>

            <div className="flex items-center gap-4">
              <input
                id="soundEffects"
                type="checkbox"
                className="toggle toggle-sm toggle-info"
                {...register("soundEffectsOn", { value: true })}
              />
              <label htmlFor="soundEffects">Sound effects</label>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary mt-4"
            disabled={(!isValid && isDirty) || registrationIsLoading}
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
    </>
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
