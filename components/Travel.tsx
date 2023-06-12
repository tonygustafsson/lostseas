import { TOWNS } from "@/constants/locations"
import { useCharacter } from "@/hooks/queries/useCharacter"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import Flag from "./icons/Flag"
import { useModal } from "./ui/Modal/context"

const Travel = () => {
  const { travel } = useCharacter()
  const { data: player } = useGetPlayer()
  const { setModal, removeModal } = useModal()

  const openTravelModal = () => {
    setModal({
      id: "travel",
      title: "Pick your destination",
      content: (
        <>
          <div className="flex flex-wrap gap-3">
            {(Object.entries(TOWNS) as [Nation, Town[]][]).map(
              ([nation, towns], nationIdx) => (
                <>
                  <p className="w-full font-bold flex gap-2">
                    <Flag nation={nation} size={24} />
                    {nation}
                  </p>

                  <div
                    key={`destination-${nation}-${nationIdx}`}
                    className="flex flex-wrap gap-3 bg-slate-800 rounded-lg p-4"
                  >
                    {towns.map((town, townIdx) => (
                      <button
                        key={`destination-${town}-${townIdx}`}
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleTravel(town)}
                      >
                        {town}
                      </button>
                    ))}
                  </div>
                </>
              )
            )}
          </div>
        </>
      ),
    })
  }

  const handleTravel = (town: Town) => {
    travel({ playerId: player?.id || "", town })
    removeModal("travel")
  }

  return (
    <button className="btn btn-primary" onClick={openTravelModal}>
      Travel
    </button>
  )
}

export default Travel
