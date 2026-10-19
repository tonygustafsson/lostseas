"use client"

import { useState } from "react"

import useModal from "@/app/stores/modals"
import AdvisorTips from "@/components/advisor/AdvisorTips"
import { Button } from "@/components/ui/button"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useSea } from "@/hooks/queries/useSea"
import { getHarborBlockedQuip } from "@/utils/getPirateQuip"
import { getSuppliesDays } from "@/utils/journey"

import DestinationConfirm from "./DestinationConfirm"
import SeaMapCanvas from "./SeaMapCanvas"

type Props = {
  currentTown: Town | undefined
}

const DepartureWarnings = ({ destination }: { destination: Town }) => {
  const { removeModal } = useModal()
  const [quip] = useState(getHarborBlockedQuip)

  return (
    <>
      <AdvisorTips title={quip} destination={destination} />

      <Button
        size="sm"
        className="justify-self-end"
        onClick={() => removeModal("departureWarnings")}
      >
        Stay in town
      </Button>
    </>
  )
}

const Map = ({ currentTown }: Props) => {
  const { data: player } = useGetPlayer()
  const { startJourney, isStartingJourney } = useSea()
  const { removeModal, setModal } = useModal()
  const [destination, setDestination] = useState<Town>()

  const suppliesDays = player ? getSuppliesDays(player).days : undefined

  const handleStartJourney = (town: Town) => {
    if (isStartingJourney) return

    startJourney(
      { town },
      {
        onSuccess: (response) => {
          removeModal("map")

          if (response?.data?.success === false) {
            setModal({
              id: "departureWarnings",
              title: "Cannot set sail",
              content: <DepartureWarnings destination={town} />,
            })
          }
        },
      }
    )
  }

  return (
    <div className="relative">
      <SeaMapCanvas
        currentTown={currentTown}
        selectedTown={destination}
        suppliesDays={suppliesDays}
        onSelectTown={setDestination}
      />

      {player && destination && (
        <DestinationConfirm
          player={player}
          destination={destination}
          isPending={isStartingJourney}
          onConfirm={() => handleStartJourney(destination)}
          onCancel={() => setDestination(undefined)}
        />
      )}
    </div>
  )
}

export default Map
