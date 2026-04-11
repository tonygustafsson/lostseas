"use client"

import useDrawer from "@/app/stores/drawer"
import AdvisorTips from "@/components/advisor/AdvisorTips"
import DrawerPanel from "@/components/DrawerPanel"

const AdvisorDrawer = () => {
  const { active, close } = useDrawer()

  return (
    <DrawerPanel
      isOpen={active === "advisor"}
      onClose={close}
      className="sm:w-lg"
    >
      <AdvisorTips title="Goodday, Captain!" />
    </DrawerPanel>
  )
}

export default AdvisorDrawer
