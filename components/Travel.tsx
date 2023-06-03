import { TOWNS } from "@/constants/locations"
import { useCharacter } from "@/hooks/queries/useCharacter"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import Flag from "./icons/Flag"
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
                    <label
                      key={`destination-${town}-${townIdx}`}
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleTravel(town)}
                      htmlFor={modalId}
                    >
                      {town}
                    </label>
                  ))}
                </div>
              </>
            )
          )}
        </div>
      </Modal>
    </>
  )
}

export default Travel
