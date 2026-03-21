import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import Select from "@/components/Select"
import TextField from "@/components/TextField"
import { NATIONS } from "@/constants/locations"
import { usePlayer } from "@/hooks/queries/usePlayer"
import { getRandomCharacter } from "@/utils/getRandomCharacter"
import { registrationValidationSchema } from "@/utils/validation"

import { Button } from "./ui/button"

type ValidationSchema = z.infer<typeof registrationValidationSchema>

const randomCharacter = getRandomCharacter()

const RegistrationForm = () => {
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h2 className="font-serif text-2xl">Character</h2>

      <Button
        variant="secondary"
        onClick={fetchNewRandomCharacter}
        type="button"
      >
        Randomize
      </Button>

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

      <h2 className="mt-4 font-serif text-2xl">Settings</h2>

      <div className="flex flex-col gap-4 pb-4">
        <div className="flex items-center gap-4">
          <input
            id="toggleMusic"
            type="checkbox"
            className="toggle toggle-info toggle-sm"
            {...register("musicOn", { value: true })}
          />
          <label htmlFor="toggleMusic">Music</label>
        </div>

        <div className="flex items-center gap-4">
          <input
            id="soundEffects"
            type="checkbox"
            className="toggle toggle-info toggle-sm"
            {...register("soundEffectsOn", { value: true })}
          />
          <label htmlFor="soundEffects">Sound effects</label>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={(!isValid && isDirty) || registrationIsLoading}
      >
        Register
      </Button>
    </form>
  )
}

export default RegistrationForm
