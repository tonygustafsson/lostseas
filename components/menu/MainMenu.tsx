"use client"

import { RiTreasureMapLine } from "react-icons/ri"

import useModal from "@/app/stores/modals"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import Map from "../Map"
import { Button } from "../ui/button"

const MainMenu = () => {
  const { data: player } = useGetPlayer()
  const { setModal } = useModal()

  const showMap = () => {
    setModal({
      id: "map",
      title: "Pick your destination",
      fullWidth: true,
      content: <Map currentTown={player?.character.town} />,
    })
  }

  return (
    <Button
      onClick={showMap}
      disabled={!!player?.character.journey}
      className="group/map"
    >
      <RiTreasureMapLine className="group-hover/map:text-accent size-5!" />
      Travel
    </Button>
  )
}

export default MainMenu
