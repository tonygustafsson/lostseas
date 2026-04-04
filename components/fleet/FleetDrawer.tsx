"use client"

import { GiShoonerSailboat } from "react-icons/gi"

import useDrawer from "@/app/stores/drawer"
import CrewBoard from "@/components/crew/CrewBoard"
import DrawerPanel from "@/components/DrawerPanel"
import FittingsList from "@/components/ships/FittingsList"
import ShipList from "@/components/ships/ShipList"
import { Separator } from "@/components/ui/separator"

const FleetDrawer = () => {
  const { active: activeDrawer, close: closeDrawer } = useDrawer()
  const isOpen = activeDrawer === "fleet"

  return (
    <DrawerPanel isOpen={isOpen} onClose={closeDrawer} className="sm:w-lg">
      <h1 className="mb-6 flex items-center gap-2 font-serif text-2xl">
        <GiShoonerSailboat className="text-yellow-400" />
        Crew & Fleet
      </h1>

      <h2 className="mb-4 font-serif text-xl">Ships</h2>
      <ShipList />

      <Separator className="my-8" />

      <h2 className="mb-4 font-serif text-xl">Crew members</h2>
      <CrewBoard />

      <h2 className="mt-8 mb-4 font-serif text-xl">Ship fittings</h2>
      <FittingsList />
    </DrawerPanel>
  )
}

export default FleetDrawer
