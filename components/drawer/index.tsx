"use client"

import useDrawer, { DrawerId } from "@/app/stores/drawer"
import DrawerPanel from "@/components/DrawerPanel"

import AdvisorDrawer from "./drawerContent/Advisor"
import EditCharacterDrawer from "./drawerContent/EditCharacter"
import FleetDrawer from "./drawerContent/Fleet"
import GuideDrawer from "./drawerContent/Guide"
import InventoryDrawer from "./drawerContent/Inventory"
import LogsDrawer from "./drawerContent/Logs"
import SettingsDrawer from "./drawerContent/Settings"
import StatisticsDrawer from "./drawerContent/Statistics"
import StatusDrawer from "./drawerContent/Status"

const ComponentMap: Record<DrawerId, React.FC> = {
  inventory: InventoryDrawer,
  status: StatusDrawer,
  fleet: FleetDrawer,
  settings: SettingsDrawer,
  guide: GuideDrawer,
  advisor: AdvisorDrawer,
  logs: LogsDrawer,
  statistics: StatisticsDrawer,
  editCharacter: EditCharacterDrawer,
}

const Drawer = () => {
  const { active: activeDrawer, close: closeDrawer } = useDrawer()

  const isOpen = !!activeDrawer
  const DrawerComponent = activeDrawer ? ComponentMap[activeDrawer] : null

  return (
    <DrawerPanel isOpen={isOpen} onClose={closeDrawer} className="sm:w-lg">
      {DrawerComponent ? <DrawerComponent /> : null}
    </DrawerPanel>
  )
}

export default Drawer
