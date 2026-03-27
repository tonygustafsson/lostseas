"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import useModal from "@/app/stores/modals"
import Select from "@/components/Select"
import TextField from "@/components/TextField"
import { useCharacter } from "@/hooks/queries/useCharacter"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { changeCharacterValidationSchema } from "@/utils/validation"

import { Button } from "./ui/button"

type ValidationSchema = z.infer<typeof changeCharacterValidationSchema>

const ChangeCharacterForm = () => {
  const { data: player } = useGetPlayer()
  const { update, updateIsLoading } = useCharacter()
  const { removeModal } = useModal()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(changeCharacterValidationSchema),
    mode: "onChange",
  })

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    update(data)
    removeModal("editCharacter")
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-4"
    >
      <TextField
        label="Name"
        {...register("name", { value: player?.character.name || "" })}
        error={errors.name?.message}
      />

      <Controller
        control={control}
        name="gender"
        defaultValue={player?.character.gender || "Male"}
        render={({ field }) => (
          <Select
            label="Gender"
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            options={["Male", "Female"]}
          />
        )}
      />

      <TextField
        label="Age"
        type="number"
        {...register("age", {
          valueAsNumber: true,
          value: player?.character.age,
        })}
        error={errors.age?.message}
      />

      <Button
        type="submit"
        className="mt-4"
        disabled={!isValid || updateIsLoading}
      >
        Save
      </Button>
    </form>
  )
}

export default ChangeCharacterForm
