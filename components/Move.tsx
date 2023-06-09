import { LOCATIONS } from "@/constants/locations"
import { useCharacter } from "@/hooks/queries/useCharacter"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import { useModal } from "./ui/Modal/context"

const Move = () => {
  const { move } = useCharacter()
  const { data: player } = useGetPlayer()
  const { setModal, removeModal } = useModal()

  const openMoveModal = () => {
    setModal({
      id: "move",
      title: "Pick your location",
      content: (
        <>
          <div className="flex flex-wrap gap-2">
            {Object.values(LOCATIONS)
              .filter((location) => location !== "Sea" && location !== "Harbor")
              .map((location, idx) => (
                <button
                  key={`destination-${location}-${idx}`}
                  className="btn btn-secondary"
                  onClick={() => handleMove(location)}
                >
                  {location}
                </button>
              ))}
          </div>
        </>
      ),
    })
  }

  const handleMove = (location: TownLocation | SeaLocation) => {
    move({ userId: player?.id || "", location })
    removeModal("move")
  }

  return (
    <button className="btn btn-primary" onClick={openMoveModal}>
      Move
    </button>
  )
}

export default Move
