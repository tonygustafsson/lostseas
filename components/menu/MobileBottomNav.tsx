"use client"

import { FiSettings } from "react-icons/fi"
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
import { Button } from "../ui/button"

const MobileBottomNav = () => {
  const { data: player } = useGetPlayer()
  const { setModal } = useModal()
  const { open: openDrawer } = useDrawer()

  const showTravel = () => {
    setModal({
      id: "map",
      title: "Pick your destination",
      fullWidth: true,
      content: <Map currentTown={player?.character.town} />,
    })
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-slate-950/95 px-3 pt-2 shadow-[0_-12px_32px_rgba(2,6,23,0.45)] backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-5 gap-1 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
        <Button
          variant="ghost"
          onClick={showTravel}
          disabled={!!player?.character.journey}
          className="h-auto flex-col gap-1 rounded-2xl px-1 py-2 text-[0.65rem] leading-none font-semibold text-slate-400 transition-colors hover:bg-white/5 hover:text-amber-50"
        >
          <RiTreasureMapLine className="h-5 w-5" />
          Travel
        </Button>

        <Button
          variant="ghost"
          onClick={() => openDrawer("fleet")}
          className="h-auto flex-col gap-1 rounded-2xl px-1 py-2 text-[0.65rem] leading-none font-semibold text-slate-400 transition-colors hover:bg-white/5 hover:text-amber-50"
        >
          <GiShoonerSailboat className="h-5 w-5" />
          Fleet
        </Button>

        <Button
          variant="ghost"
          onClick={() => openDrawer("inventory")}
          className="h-auto flex-col gap-1 rounded-2xl px-1 py-2 text-[0.65rem] leading-none font-semibold text-slate-400 transition-colors hover:bg-white/5 hover:text-amber-50"
        >
          <GiOpenedFoodCan className="h-5 w-5" />
          Inventory
        </Button>

        <Button
          variant="ghost"
          onClick={() => openDrawer("status")}
          className="h-auto flex-col gap-1 rounded-2xl px-1 py-2 text-[0.65rem] leading-none font-semibold text-slate-400 transition-colors hover:bg-white/5 hover:text-amber-50"
        >
          <GiPirateCoat className="h-5 w-5" />
          Status
        </Button>

        <Button
          variant="ghost"
          onClick={() => openDrawer("settings")}
          className="h-auto flex-col gap-1 rounded-2xl px-1 py-2 text-[0.65rem] leading-none font-semibold text-slate-400 transition-colors hover:bg-white/5 hover:text-amber-50"
        >
          <FiSettings className="h-5 w-5" />
          Settings
        </Button>
      </div>
    </div>
  )
}

export default MobileBottomNav
