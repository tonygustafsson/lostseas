"use client"

import { FiSettings } from "react-icons/fi"

import useDrawer from "@/app/stores/drawer"
import DrawerPanel from "@/components/DrawerPanel"
import SettingsPanel from "@/components/settings/SettingsPanel"
import SoundControls from "@/components/Sound/Controls"
import { Separator } from "@/components/ui/separator"

const SettingsDrawer = () => {
  const { active: activeDrawer, close: closeDrawer } = useDrawer()
  const isOpen = activeDrawer === "settings"

  return (
    <DrawerPanel isOpen={isOpen} onClose={closeDrawer} className="sm:w-lg">
      <h1 className="mb-6 flex items-center gap-2 font-serif text-2xl">
        <FiSettings className="text-yellow-400" />
        Settings
      </h1>

      <div className="lg:hidden">
        <h2 className="mb-4 font-serif text-xl">Sound</h2>
        <SoundControls />
        <Separator className="my-6" />
      </div>

      <SettingsPanel />
    </DrawerPanel>
  )
}

export default SettingsDrawer
