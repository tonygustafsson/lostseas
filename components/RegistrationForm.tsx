import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { GiPerspectiveDiceTwo } from "react-icons/gi"
import { z } from "zod"

import TextField from "@/components/TextField"
import { NATIONS } from "@/constants/locations"
import { usePlayer } from "@/hooks/queries/usePlayer"
import { useRandomCharacter } from "@/hooks/queries/useRandomCharacter"
import { getRandomCharacter } from "@/utils/getRandomCharacter"
import { registrationValidationSchema } from "@/utils/validation"

import Select from "./Select"
import { Button } from "./ui/button"
import { Switch } from "./ui/switch"

type ValidationSchema = z.infer<typeof registrationValidationSchema>

const randomCharacter = getRandomCharacter()

const RegistrationForm = () => {
  const { register: playerRegister, registrationIsLoading } = usePlayer()
  const { fetchRandomCharacter, isRandomizing } = useRandomCharacter()

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(registrationValidationSchema),
    mode: "onChange",
  })

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const response = await playerRegister(data)

    if (response?.status === 200) {
      window.location.reload()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <TextField
          label="Name"
          id="name"
          {...register("name", { value: randomCharacter.name })}
          error={errors.name?.message}
        />

        <Controller
          control={control}
          name="nationality"
          defaultValue={randomCharacter.nationality}
          render={({ field }) => (
            <Select
              label="Nationality"
              id="nationality"
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              options={Object.keys(NATIONS)}
            />
          )}
        />

        <Controller
          control={control}
          name="gender"
          defaultValue={randomCharacter.gender}
          render={({ field }) => (
            <Select
              label="Gender"
              name={field.name}
              value={field.value}
              id="gender"
              onChange={field.onChange}
              options={["Male", "Female"]}
            />
          )}
        />

        <TextField
          type="number"
          label="Age"
          id="age"
          {...register("age", {
            value: randomCharacter.age,
            valueAsNumber: true,
          })}
          error={errors.age?.message}
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <Button
          variant="secondary"
          className="rounded-full"
          onClick={async () => {
            const result = await fetchRandomCharacter()
            const char = result.data
            if (!char) return
            setValue("name", char.name)
            setValue("nationality", char.nationality)
            setValue("gender", char.gender)
            setValue("age", char.age)
          }}
          type="button"
          disabled={isRandomizing}
        >
          <GiPerspectiveDiceTwo
            className={isRandomizing ? "animate-spin" : undefined}
          />
          {isRandomizing ? "Randomizing..." : "Randomize"}
        </Button>

        <Controller
          control={control}
          name="musicOn"
          defaultValue={true}
          render={({ field }) => (
            <div className="flex items-center gap-4">
              <Switch
                id="toggleMusic"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <label htmlFor="toggleMusic">Music</label>
            </div>
          )}
        />

        <Controller
          control={control}
          name="soundEffectsOn"
          defaultValue={true}
          render={({ field }) => (
            <div className="flex items-center gap-4">
              <Switch
                id="soundEffects"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <label htmlFor="soundEffects">Sound effects</label>
            </div>
          )}
        />
      </div>

      <Button
        size="lg"
        type="submit"
        variant="highlight"
        className="w-full"
        disabled={(!isValid && isDirty) || registrationIsLoading}
      >
        Register and start playing
      </Button>
    </form>
  )
}

export default RegistrationForm
