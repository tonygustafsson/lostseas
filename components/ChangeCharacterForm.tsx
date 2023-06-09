import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import { useModal } from "@/components/ui/Modal/context"
import Select from "@/components/ui/Select"
import TextField from "@/components/ui/TextField"
import { useCharacter } from "@/hooks/queries/useCharacter"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const validationSchema = z.object({
  userId: z
    .string()
    .refine(
      (value) =>
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
          value
        ),
      "User GUID is malformatted"
    ),
  name: z.string().min(3).max(50),
  gender: z.enum(["Male", "Female"]),
  age: z.number().min(15).max(80),
})

type ValidationSchema = z.infer<typeof validationSchema>

const ChangeCharacterForm = () => {
  const { data: player } = useGetPlayer()
  const { update, updateIsLoading } = useCharacter()
  const { removeModal } = useModal()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    mode: "onChange",
  })

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    update(data)
    removeModal("editcharacter")
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4"
    >
      <TextField
        type="hidden"
        {...register("userId", { value: player?.id || "" })}
      />

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
