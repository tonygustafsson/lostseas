import Link from "next/link"
import { useRef, useState } from "react"
import { GiCoins } from "react-icons/gi"

import Flag from "@/components/icons/Flag"
import DefaultLayout from "@/components/layouts/default"
import Modal from "@/components/ui/Modal"
import Select from "@/components/ui/Select"
import TextField from "@/components/ui/TextField"
import { useCharacter } from "@/hooks/queries/useCharacter"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const Status = () => {
  const { data: player } = useGetPlayer()
  const { update, updateIsLoading } = useCharacter()

  const characterModalId = "character-modal"
  const modalControlRef = useRef<HTMLInputElement>(null)

  const [characterGender, setCharacterGender] = useState<"Male" | "Female">(
    player?.character.gender || "Male"
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    update(data)

    modalControlRef.current?.click()
  }

  if (!player) {
    return <p>Access denied</p>
  }

  return (
    <DefaultLayout>
      <h1 className="text-3xl font-serif text mb-6">Status</h1>

      <div className="card w-full bg-gray-800 shadow-lg mt-8 rounded-md">
        <div className="card-body p-6">
          <h2 className="card-title">
            <Flag
              nation={player?.character.nationality}
              size={24}
              className="opacity-[0.8]"
            />
            {player?.character.name}
          </h2>
          <p>
            You are a {player?.character.age} year old{" "}
            {player?.character.gender.toLowerCase()} from{" "}
            {player?.character.nationality}.
          </p>
          <div className="stats bg-gray-700 mt-4">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <GiCoins className="h-8 w-8" />
              </div>
              <div className="stat-title">Doubloons</div>
              <div className="stat-value text-2xl">
                {player?.character.doubloons}
              </div>
            </div>
          </div>
          v
          <div className="card-actions justify-end mt-4">
            <label
              htmlFor={characterModalId}
              className="btn btn-secondary btn-sm"
            >
              Change
            </label>

            <Link href="/inventory">
              <button className="btn btn-primary btn-sm">Inventory</button>
            </Link>
          </div>
        </div>
      </div>

      <Modal
        id={characterModalId}
        title="Change your character"
        ref={modalControlRef}
      >
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <TextField
            type="hidden"
            name="userId"
            defaultValue={player?.id || ""}
          />

          <TextField
            label="Name"
            id="character_name"
            name="character_name"
            defaultValue={player?.character.name || ""}
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
            id="character_age"
            name="character_age"
            type="number"
            defaultValue={String(player?.character.age) || ""}
            min={15}
            max={80}
          />

          <button
            type="submit"
            className="btn btn-primary mt-4"
            disabled={updateIsLoading}
          >
            Save
          </button>
        </form>
      </Modal>
    </DefaultLayout>
  )
}

export default Status
