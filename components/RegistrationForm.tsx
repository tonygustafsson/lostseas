import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form"
import { z } from "zod"

import CharacterPickerDialog from "@/components/character/CharacterPickerDialog"
import SelectedCharacter from "@/components/character/SelectedCharacter"
import TextField from "@/components/TextField"
import { usePlayer } from "@/hooks/queries/usePlayer"
import { useRandomCharacter } from "@/hooks/queries/useRandomCharacter"
import { registrationValidationSchema } from "@/utils/validation"

import { Button } from "./ui/button"
import { Switch } from "./ui/switch"

type ValidationSchema = z.infer<typeof registrationValidationSchema>

type Props = {
  initialCharacter: CharacterCreation
}

const RegistrationForm = ({ initialCharacter }: Props) => {
  const { register: playerRegister, registrationIsLoading } = usePlayer()
  const [pickerOpen, setPickerOpen] = useState(false)

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(registrationValidationSchema),
    mode: "onChange",
    defaultValues: {
      characterId: initialCharacter.characterId,
      name: initialCharacter.name,
    },
  })

  const characterId = useWatch({ control, name: "characterId" })
  const { fetchRandomCharacter, isRandomizing } =
    useRandomCharacter(characterId)

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const response = await playerRegister(data)

    if (response?.status === 200) {
      window.location.reload()
    }
  }

  const applyCharacter = (id: string, name: string) => {
    setValue("characterId", id, { shouldValidate: true })
    setValue("name", name, { shouldValidate: true })
  }

  const randomize = async () => {
    const { data: character } = await fetchRandomCharacter()
    if (!character) return

    applyCharacter(character.characterId, character.name)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <SelectedCharacter
        characterId={characterId}
        onChangeClick={() => setPickerOpen(true)}
        onRandomizeClick={randomize}
        isRandomizing={isRandomizing}
        nameField={
          <TextField
            label="Name"
            {...register("name")}
            error={errors.name?.message}
          />
        }
      />

      <CharacterPickerDialog
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        selectedId={characterId}
        onSelect={(character) => applyCharacter(character.id, character.name)}
      />

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
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
          name="ambienceOn"
          defaultValue={true}
          render={({ field }) => (
            <div className="flex items-center gap-4">
              <Switch
                id="toggleAmbience"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <label htmlFor="toggleAmbience">Ambience</label>
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
        disabled={!isValid || registrationIsLoading}
      >
        Register and start playing
      </Button>
    </form>
  )
}

export default RegistrationForm
