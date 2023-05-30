import { useState } from "react"

import { TOWNS } from "@/constants/locations"
import { useCharacter } from "@/hooks/queries/useCharacter"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import Modal from "./ui/Modal"

const Travel = () => {
  const { travel, isTraveling } = useCharacter()
  const { data: player } = useGetPlayer()

  const [travelModalIsOpen, setTravelModalIsOpen] = useState(false)

  const handleTravel = (town: Town) => {
    travel({ userId: player?.id || "", town })
    setTravelModalIsOpen(false)
  }

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => setTravelModalIsOpen(true)}
        disabled={isTraveling}
      >
        Travel
      </button>

      <Modal
        isOpen={travelModalIsOpen}
        title="Pick your destination"
        onClose={() => setTravelModalIsOpen(false)}
      >
        <div className="flex flex-wrap gap-2">
          {TOWNS.map((town, idx) => (
            <button
              key={`destination-${town}-${idx}`}
              className="btn btn-secondary btn-sm"
              onClick={() => handleTravel(town)}
            >
              {town}
            </button>
          ))}
        </div>
      </Modal>
    </>
  )
}

export default Travel
