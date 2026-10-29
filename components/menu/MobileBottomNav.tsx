"use client"

import { useState } from "react"
import { FiMenu } from "react-icons/fi"
import {
  GiOpenedFoodCan,
  GiPirateCoat,
  GiShoonerSailboat,
} from "react-icons/gi"
import { RiTreasureMapLine } from "react-icons/ri"

import useDrawer from "@/app/stores/drawer"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useMapModal } from "@/hooks/useMapModal"

import DrawerBottom from "../DrawerBottom"
import { Button } from "../ui/button"
import MobileMenuContent from "./MobileMenuContent"

type Props = {
  className?: string
}

const MobileBottomNav = ({ className }: Props) => {
  const { data: player } = useGetPlayer()
  const { showMap, canTravel } = useMapModal()
  const { open: openDrawer } = useDrawer()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  if (!player) return null

  return (
    <>
      <div
        className={`bg-sidebar/95 fixed inset-x-0 bottom-0 z-20 overflow-hidden px-3 pt-2 shadow-[0_-12px_32px_rgba(0,0,0,0.45)] backdrop-blur-md [view-transition-name:bottom-nav] lg:hidden ${className}`}
      >
        <div className="via-gold/70 absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent" />

        <div className="bg-gold/10 absolute inset-x-0 -bottom-16 mx-auto h-24 w-64 rounded-full blur-2xl" />

        <div className="relative grid grid-cols-5 gap-1 pb-[calc(env(safe-area-inset-bottom)+0.25rem)]">
          <Button
            variant="ghost"
            onClick={showMap}
            disabled={!canTravel}
            className="hover:text-gold-light [&_svg]:text-accent h-auto flex-col gap-1 rounded-2xl px-1 py-2 text-[0.65rem] leading-none font-semibold transition-all hover:bg-white/5 active:scale-90"
          >
            <RiTreasureMapLine className="h-5 w-5" />
            Travel
          </Button>

          <Button
            variant="ghost"
            onClick={() => openDrawer("status")}
            className="hover:text-gold-light [&_svg]:text-accent h-auto flex-col gap-1 rounded-2xl px-1 py-2 text-[0.65rem] leading-none font-semibold transition-all hover:bg-white/5 active:scale-90"
          >
            <GiPirateCoat className="h-5 w-5" />
            Status
          </Button>

          <Button
            variant="ghost"
            onClick={() => openDrawer("fleet")}
            className="hover:text-gold-light [&_svg]:text-accent h-auto flex-col gap-1 rounded-2xl px-1 py-2 text-[0.65rem] leading-none font-semibold transition-all hover:bg-white/5 active:scale-90"
          >
            <GiShoonerSailboat className="h-5 w-5" />
            Fleet
          </Button>

          <Button
            variant="ghost"
            onClick={() => openDrawer("inventory")}
            className="hover:text-gold-light [&_svg]:text-accent h-auto flex-col gap-1 rounded-2xl px-1 py-2 text-[0.65rem] leading-none font-semibold transition-all hover:bg-white/5 active:scale-90"
          >
            <GiOpenedFoodCan className="h-5 w-5" />
            Inventory
          </Button>

          <Button
            variant="ghost"
            onClick={() => setIsMenuOpen(true)}
            className="hover:text-gold-light [&_svg]:text-accent h-auto flex-col gap-1 rounded-2xl px-1 py-2 text-[0.65rem] leading-none font-semibold transition-all hover:bg-white/5 active:scale-90"
          >
            <FiMenu className="h-5 w-5" />
            Menu
          </Button>
        </div>
      </div>

      <DrawerBottom
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        maxHeightPercent={80}
      >
        <MobileMenuContent onClose={() => setIsMenuOpen(false)} />
      </DrawerBottom>
    </>
  )
}

export default MobileBottomNav
