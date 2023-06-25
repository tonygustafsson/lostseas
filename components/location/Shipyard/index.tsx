import { useState } from "react"

import LocationTabs from "@/components/LocationTabs"

import ShipyardBuy from "./Buy"
import ShipyardRepair from "./Repair"
import ShipyardSell from "./Sell"

export type ShipyardTab = "buy" | "sell" | "repair"

const Shipyard = () => {
  const [tab, setTab] = useState<ShipyardTab>("buy")

  return (
    <>
      <LocationTabs<ShipyardTab>
        items={[
          { id: "buy", label: "Buy" },
          { id: "sell", label: "Sell" },
          { id: "repair", label: "Repair" },
        ]}
        currentTab={tab}
        setCurrentTab={setTab}
      />

      {tab === "buy" && <ShipyardBuy />}
      {tab === "sell" && <ShipyardSell />}
      {tab === "repair" && <ShipyardRepair />}
    </>
  )
}

export default Shipyard
