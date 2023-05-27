import { useState } from "react"

import Button from "@/components/ui/Button"
import { LOCATIONS } from "@/constants/locations"
import { useCharacter } from "@/hooks/queries/useCharacter"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import Modal from "./ui/Modal"

const Move = () => {
  const { move } = useCharacter()
  const { data: player } = useGetPlayer()

  const [moveModalIsOpen, setMoveModalIsOpen] = useState(false)

  const handleMove = (location: TownLocation | SeaLocation) => {
    move({ userId: player?.id || "", location })
    setMoveModalIsOpen(false)
  }

  return (
    <>
      <Button size="lg" onClick={() => setMoveModalIsOpen(true)}>
        Move
      </Button>

      <Modal
        isOpen={moveModalIsOpen}
        title="Pick your location"
        onClose={() => setMoveModalIsOpen(false)}
      >
        <div className="flex flex-wrap gap-2">
          {Object.values(LOCATIONS).map((location, idx) => (
            <Button
              key={`destination-${location}-${idx}`}
              className="text-white"
              onClick={() => handleMove(location)}
            >
              {location}
            </Button>
          ))}
        </div>
      </Modal>
    </>
  )
}

export default Move
