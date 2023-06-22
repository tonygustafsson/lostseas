import { useState } from "react"

import ShipyardBuy from "./Buy"
import ShipyardSell from "./Sell"
import ShipyardTabs from "./Tabs"

export type ShipyardTab = "Buy" | "Sell" | "Repair"

const Shipyard = () => {
  const [tab, setTab] = useState<ShipyardTab>("Buy")

  return (
    <>
      <ShipyardTabs tab={tab} setTab={setTab} />

      {tab === "Buy" && <ShipyardBuy />}
      {tab === "Sell" && <ShipyardSell />}
      {tab === "Repair" && <p>Not implemented yet.</p>}
    </>
  )
}

export default Shipyard
