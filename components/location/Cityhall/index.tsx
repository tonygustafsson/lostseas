import { useState } from "react"

import LocationTabs from "@/components/LocationTabs"

import Governor from "./Governor"
import HandOver from "./HandOver"

export type CityHallTab = "governor" | "handover"

const Cityhall = () => {
  const [tab, setTab] = useState<CityHallTab>("governor")

  return (
    <>
      <LocationTabs<CityHallTab>
        items={[
          { id: "governor", label: "Governor" },
          { id: "handover", label: "Hand over" },
        ]}
        currentTab={tab}
        setCurrentTab={setTab}
      />

      {tab === "governor" && <Governor />}
      {tab === "handover" && <HandOver />}
    </>
  )
}

export default Cityhall
