import { useState } from "react"

import Button from "@/components/ui/Button"
import { TOWNS } from "@/constants/towns"
import { useGetPlayer, usePlayerMutations } from "@/hooks/queries/usePlayer"

import Modal from "./ui/Modal"

const Travel = () => {
  const { travel } = usePlayerMutations()
  const { data: player } = useGetPlayer()

  const [travelModalIsOpen, setTravelModalIsOpen] = useState(false)

  const handleTravel = (town: Town) => {
    travel({ userId: player?.id || "", town })
    setTravelModalIsOpen(false)
  }

  return (
    <>
      <div className="w-1/2">
        <Button size="lg" onClick={() => setTravelModalIsOpen(true)}>
          Travel
        </Button>
      </div>

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
