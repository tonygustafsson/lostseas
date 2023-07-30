import { zodResolver } from "@hookform/resolvers/zod"
import Head from "next/head"
import Image from "next/image"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import FullscreenLayout from "@/components/layouts/fullscreen"
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

      <FullscreenLayout>
        <div className="hero min-h-screen justify-items-stretch rounded-lg relative">
          <Image
            src="/img/place/tavern.webp"
            layout="fill"
            objectFit="cover"
            alt="Lost Seas background"
            className="absolute top-0 left-0 opacity-40 z-10"
          />

          <div className="hero-content justify-self-center md:w-1/2 max-w-[600px] text-neutral-content py-8 md:py-24 z-20">
            <div className="w-full bg-base-300 bg-opacity-70 p-8 rounded-lg">
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
                  {...register("nationality", {
                    value: randomCharacter.nationality,
                  })}
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
            </div>
          </div>
        </div>
      </FullscreenLayout>
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
