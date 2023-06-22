import { useState } from "react"

import ShopBuy from "./Buy"
import ShopSell from "./Sell"
import ShopTabs from "./Tabs"

export type ShopTab = "Buy" | "Sell"

const Shop = () => {
  const [tab, setTab] = useState<ShopTab>("Buy")

  return (
    <>
      <ShopTabs tab={tab} setTab={setTab} />

      {tab === "Buy" && <ShopBuy />}
      {tab === "Sell" && <ShopSell />}
    </>
  )
}

export default Shop
