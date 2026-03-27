"use client"

import {
  GiBandana,
  GiOpenedFoodCan,
  GiPirateCoat,
  GiPirateHat,
  GiShoonerSailboat,
} from "react-icons/gi"
import { RiTreasureMapLine } from "react-icons/ri"

import { useModal } from "@/app/stores/modals"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import Map from "../Map"
import { Separator } from "../ui/separator"
import MainMenuItem from "./MainMenuItem"

const MainMenu = () => {
  const { data: player } = useGetPlayer()
  const { setModal } = useModal()

  const numberOfShips = Object.values(player?.ships ?? {}).length
  const numberOfInventoryItems = Object.values(player?.inventory ?? {}).length

  const showMap = () => {
    setModal({
      id: "map",
      title: "Pick your destination",
      fullWidth: true,
      content: <Map currentTown={player?.character.town} />,
    })
  }

  return (
    <ul className="flex flex-col gap-1">
      <MainMenuItem
        href="/"
        icon={<GiPirateHat className="group-hover/play:text-accent size-5!" />}
        label="Play"
        className="group/play"
      />

      <MainMenuItem
        onClick={showMap}
        disabled={!!player?.character.journey}
        icon={
          <RiTreasureMapLine className="group-hover/map:text-accent size-5!" />
        }
        label="Map"
        className="group/map"
      />

      <Separator className="my-2" />

      <MainMenuItem
        href="/status"
        icon={
          <GiPirateCoat className="group-hover/status:text-accent size-5!" />
        }
        label="Status"
        className="group/status"
      />

      <MainMenuItem
        href="/ships"
        icon={
          <GiShoonerSailboat className="group-hover/ships:text-accent size-5!" />
        }
        label="Ships"
        badge={numberOfShips}
        className="group/ships"
      />

      <MainMenuItem
        href="/crew"
        icon={<GiBandana className="group-hover/crew:text-accent size-5!" />}
        label="Crew members"
        badge={player?.crewMembers.count}
        className="group/crew"
      />

      <MainMenuItem
        href="/inventory"
        icon={
          <GiOpenedFoodCan className="group-hover/inventory:text-accent size-5!" />
        }
        label="Inventory"
        badge={numberOfInventoryItems}
        className="group/inventory"
      />

      <Separator className="my-2" />
    </ul>
  )
}

export default MainMenu
