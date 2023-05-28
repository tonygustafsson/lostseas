import { Button } from "@material-tailwind/react"
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
      <Button
        size="lg"
        onClick={() => setTravelModalIsOpen(true)}
        disabled={isTraveling}
      >
        Travel
      </Button>

      <Modal
        isOpen={travelModalIsOpen}
        title="Pick your destination"
        onClose={() => setTravelModalIsOpen(false)}
      >
        <div className="flex flex-wrap gap-2">
          {TOWNS.map((town, idx) => (
            <Button
              key={`destination-${town}-${idx}`}
              className="text-white"
              onClick={() => handleTravel(town)}
            >
              {town}
            </Button>
          ))}
        </div>
      </Modal>
    </>
  )
}

export default Travel
