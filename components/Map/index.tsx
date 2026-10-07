"use client"

import { usePathname, useRouter } from "next/navigation"

import useModal from "@/app/stores/modals"
import { useSea } from "@/hooks/queries/useSea"

import SeaMapCanvas from "./SeaMapCanvas"

type Props = {
  currentTown: Town | undefined
}

const Map = ({ currentTown }: Props) => {
  const { startJourney } = useSea()
  const { removeModal } = useModal()
  const router = useRouter()
  const pathname = usePathname()

  const handleStartJourney = (town: Town) => {
    removeModal("map")

    if (pathname !== "/") {
      router.push("/")
    }

    startJourney({ town })
  }

  return (
    <SeaMapCanvas currentTown={currentTown} onSelectTown={handleStartJourney} />
  )
}

export default Map
