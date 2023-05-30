import { LOCATIONS } from "@/constants/locations"
import { useCharacter } from "@/hooks/queries/useCharacter"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import Modal from "./ui/Modal"

const modalId = "move-modal"

const Move = () => {
  const { move } = useCharacter()
  const { data: player } = useGetPlayer()

  const handleMove = (location: TownLocation | SeaLocation) => {
    move({ userId: player?.id || "", location })
  }

  return (
    <>
      <label htmlFor={modalId} className="btn btn-primary">
        Move
      </label>

      <Modal id={modalId} title="Pick your location">
        <div className="flex flex-wrap gap-2">
          {Object.values(LOCATIONS).map((location, idx) => (
            <label
              key={`destination-${location}-${idx}`}
              className="btn btn-secondary"
              onClick={() => handleMove(location)}
              htmlFor={modalId}
            >
              {location}
            </label>
          ))}
        </div>
      </Modal>
    </>
  )
}

export default Move
