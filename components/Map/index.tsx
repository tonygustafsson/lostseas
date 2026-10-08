"use client"

import { usePathname, useRouter } from "next/navigation"

import useModal from "@/app/stores/modals"
import DepartureWarnings from "@/components/advisor/DepartureWarnings"
import { useSea } from "@/hooks/queries/useSea"

import SeaMapCanvas from "./SeaMapCanvas"

type Props = {
  currentTown: Town | undefined
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
              compact: true,
              content: <DepartureWarnings />,
            })
          } else if (response?.data?.success) {
            removeModal("map")

            if (pathname !== "/") router.push("/")
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
