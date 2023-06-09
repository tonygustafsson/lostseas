import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import { useModal } from "@/components/ui/Modal/context"
import Select from "@/components/ui/Select"
import TextField from "@/components/ui/TextField"
import { useCharacter } from "@/hooks/queries/useCharacter"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const validationSchema = z.object({
  name: z.string().min(3).max(50),
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
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  })

  const [characterGender, setCharacterGender] = useState<"Male" | "Female">(
    player?.character.gender || "Male"
  )

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    console.log(data)

    //update(data)

    //removeModal("editcharacter")
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4"
    >
      <TextField type="hidden" name="userId" defaultValue={player?.id || ""} />

      <TextField
        label="Name"
        defaultValue={player?.character.name || ""}
        {...register("name")}
      />

      <Select
        label="Gender"
        name="character_gender"
        id="character_gender"
        value={characterGender}
        onChange={(e) => setCharacterGender(e.target.value)}
        options={["Male", "Female"]}
      />

      <TextField
        label="Age"
        type="number"
        defaultValue={String(player?.character.age) || ""}
        {...register("age")}
      />

      <button
        type="submit"
        className="btn btn-primary mt-4"
        disabled={updateIsLoading}
      >
        Save
      </button>
    </form>
  )
}

export default ChangeCharacterForm
