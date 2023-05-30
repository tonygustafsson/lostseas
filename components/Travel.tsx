import { TOWNS } from "@/constants/locations"
import { useCharacter } from "@/hooks/queries/useCharacter"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import Modal from "./ui/Modal"

const modalId = "travel-modal"

const Travel = () => {
  const { travel } = useCharacter()
  const { data: player } = useGetPlayer()

  const handleTravel = (town: Town) => {
    travel({ userId: player?.id || "", town })
  }

  return (
    <>
      <label htmlFor={modalId} className="btn btn-primary">
        Travel
      </label>

      <Modal id={modalId} title="Pick your destination">
        <div className="flex flex-wrap gap-2">
          {TOWNS.map((town, idx) => (
            <label
              key={`destination-${town}-${idx}`}
              className="btn btn-secondary btn-sm"
              onClick={() => handleTravel(town)}
              htmlFor={modalId}
            >
              {town}
            </label>
          ))}
        </div>
      </Modal>
    </>
  )
}

export default Travel
