import { Ship } from "lucide-react"
import { useState } from "react"
import { GiPirateCannon } from "react-icons/gi"

import LocationNavigation from "@/components/LocationNavigation"

import ShipyardEquipment from "./Equipment"
import ShipyardShips from "./Ships"

type ShipyardTab = "ships" | "equipment"

const Shipyard = () => {
  const [tab, setTab] = useState<ShipyardTab>("ships")

  return (
    <>
      <LocationNavigation
        items={[
          { id: "ships", label: "Ships", icon: <Ship /> },
          { id: "equipment", label: "Equipment", icon: <GiPirateCannon /> },
        ]}
        currentTab={tab}
        setCurrentTab={setTab}
      />

      {tab === "ships" && <ShipyardShips />}
      {tab === "equipment" && <ShipyardEquipment />}
    </>
  )
}

export default Shipyard
