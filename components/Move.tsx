import { useState } from "react"

import { LOCATIONS } from "@/constants/locations"
import { useCharacter } from "@/hooks/queries/useCharacter"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import Modal from "./ui/Modal"

const Move = () => {
  const { move, isMoving } = useCharacter()
  const { data: player } = useGetPlayer()

  const [moveModalIsOpen, setMoveModalIsOpen] = useState(false)

  const handleMove = (location: TownLocation | SeaLocation) => {
    move({ userId: player?.id || "", location })
    setMoveModalIsOpen(false)
  }

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => setMoveModalIsOpen(true)}
        disabled={isMoving}
      >
        Move
      </button>

      <Modal
        isOpen={moveModalIsOpen}
        title="Pick your location"
        onClose={() => setMoveModalIsOpen(false)}
      >
        <div className="flex flex-wrap gap-2">
          {Object.values(LOCATIONS).map((location, idx) => (
            <button
              key={`destination-${location}-${idx}`}
              className="btn btn-secondary"
              onClick={() => handleMove(location)}
            >
              {location}
            </button>
          ))}
        </div>
      </Modal>
    </>
  )
}

export default Move
