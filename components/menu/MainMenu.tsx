"use client"

import {
  GiOpenedFoodCan,
  GiPirateCoat,
  GiShoonerSailboat,
} from "react-icons/gi"
import { RiTreasureMapLine } from "react-icons/ri"

import useDrawer from "@/app/stores/drawer"
import useModal from "@/app/stores/modals"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import Map from "../Map"
import { Separator } from "../ui/separator"
import MainMenuItem from "./MainMenuItem"

const MainMenu = () => {
  const { data: player } = useGetPlayer()
  const { setModal } = useModal()
  const { open: openDrawer } = useDrawer()

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
        onClick={showMap}
        disabled={!!player?.character.journey}
        icon={
          <RiTreasureMapLine className="group-hover/map:text-accent size-5!" />
        }
        label="Travel"
        className="group/map"
      />

      <Separator className="my-2" />

      <MainMenuItem
        onClick={() => openDrawer("status")}
        icon={
          <GiPirateCoat className="group-hover/status:text-accent size-5!" />
        }
        label="Status"
        className="group/status"
      />

      <MainMenuItem
        onClick={() => openDrawer("fleet")}
        icon={
          <GiShoonerSailboat className="group-hover/fleet:text-accent size-5!" />
        }
        label="Crew & Fleet"
        className="group/fleet"
      />

      <MainMenuItem
        onClick={() => openDrawer("inventory")}
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
