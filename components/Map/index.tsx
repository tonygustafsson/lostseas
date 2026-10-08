"use client"

import { usePathname, useRouter } from "next/navigation"

import useModal from "@/app/stores/modals"
import AdvisorTips from "@/components/advisor/AdvisorTips"
import { Button } from "@/components/ui/button"
import { useSea } from "@/hooks/queries/useSea"

import SeaMapCanvas from "./SeaMapCanvas"

type Props = {
  currentTown: Town | undefined
}

const DepartureWarnings = () => {
  const { removeModal } = useModal()

  return (
    <>
      <AdvisorTips title="Resolve these problems before setting sail." />

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
  const { startJourney, isStartingJourney } = useSea()
  const { removeModal, setModal } = useModal()
  const router = useRouter()
  const pathname = usePathname()

  const handleStartJourney = (town: Town) => {
    if (isStartingJourney) return

    startJourney(
      { town },
      {
        onSuccess: (response) => {
          if (response?.data?.success === false) {
            removeModal("map")

            setModal({
              id: "departureWarnings",
              title: "Cannot set sail",
              content: <DepartureWarnings />,
            })
          } else if (response?.data?.success) {
            removeModal("map")

            if (pathname !== "/") {
              router.push("/")
            }
          }
        },
      }
    )
  }

  return (
    <SeaMapCanvas currentTown={currentTown} onSelectTown={handleStartJourney} />
  )
}

export default Map
