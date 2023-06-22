import { useState } from "react"

import LocationTabs from "@/components/LocationTabs"

import ShopBuy from "./Buy"
import ShopSell from "./Sell"

export type ShopTab = "buy" | "sell"

const Shop = () => {
  const [tab, setTab] = useState<ShopTab>("buy")

  return (
    <>
      <LocationTabs<ShopTab>
        items={[
          { id: "buy", label: "Buy" },
          { id: "sell", label: "Sell" },
        ]}
        currentTab={tab}
        setCurrentTab={setTab}
      />

      {tab === "buy" && <ShopBuy />}
      {tab === "sell" && <ShopSell />}
    </>
  )
}

export default Shop
