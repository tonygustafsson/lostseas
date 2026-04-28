"use client"

import { TbHelp } from "react-icons/tb"

import useDrawer from "@/app/stores/drawer"
import DrawerPanel from "@/components/DrawerPanel"
import GuideContent from "@/components/GuideContent"

const GuideDrawer = () => {
  const { active: activeDrawer, close: closeDrawer } = useDrawer()
  const isOpen = activeDrawer === "guide"

  return (
    <DrawerPanel isOpen={isOpen} onClose={closeDrawer} className="sm:w-lg">
      <h1 className="mb-2 flex items-center gap-2 font-serif text-2xl">
        <TbHelp className="text-yellow-400" />
        Player Guide
      </h1>

      <GuideContent />
    </DrawerPanel>
  )
}

export default GuideDrawer
