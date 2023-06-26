import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import { useShips } from "@/hooks/queries/useShips"
import { renameShipValidationSchema } from "@/utils/validation"

import TextField from "./ui/TextField"

type Props = {
  id: Ship["id"]
  name: Ship["name"]
}

type ValidationSchema = z.infer<typeof renameShipValidationSchema>

const RenameShipForm = ({ id, name }: Props) => {
  const { rename, isRenaming } = useShips()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(renameShipValidationSchema),
    mode: "onChange",
  })

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    rename(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4 max-w-md"
    >
      <TextField type="hidden" {...register("id", { value: id })} />

      <TextField
        label="Name"
        autoFocus
        {...register("name", { value: name })}
        error={errors.name?.message}
      />

      <button
        type="submit"
        className="btn btn-primary mt-4"
        disabled={(!isValid && isDirty) || isRenaming}
      >
        Change name
      </button>
    </form>
  )
}

export default RenameShipForm
