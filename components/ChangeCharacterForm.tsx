import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import { useModal } from "@/components/ui/Modal/context"
import Select from "@/components/ui/Select"
import TextField from "@/components/ui/TextField"
import { useCharacter } from "@/hooks/queries/useCharacter"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { changeCharacterValidationSchema } from "@/utils/validation"

type ValidationSchema = z.infer<typeof changeCharacterValidationSchema>

const ChangeCharacterForm = () => {
  const { data: player } = useGetPlayer()
  const { update, updateIsLoading } = useCharacter()
  const { removeModal } = useModal()

  const {
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
      className="w-full flex flex-col gap-4"
    >
      <TextField
        label="Name"
        {...register("name", { value: player?.character.name || "" })}
        error={errors.name?.message}
      />

      <Select
        label="Gender"
        options={["Male", "Female"]}
        {...register("gender", { value: player?.character.gender || "Male" })}
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

      <button
        type="submit"
        className="btn btn-primary mt-4"
        disabled={!isValid || updateIsLoading}
      >
        Save
      </button>
    </form>
  )
}

export default ChangeCharacterForm
