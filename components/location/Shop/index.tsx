import { useState } from "react"

import LocationTabs from "@/components/LocationTabs"
import { useShop } from "@/hooks/queries/useShop"

import ShopBuy from "./Buy"
import ShopSell from "./Sell"

export type ShopTab = "buy" | "sell"

const Shop = () => {
  const [tab, setTab] = useState<ShopTab>("buy")
  const { sellBarterGoods } = useShop()

  const handleSellBarterGoods = () => {
    sellBarterGoods()
  }

  return (
    <>
      <div className="flex mb-6">
        <button
          className="btn btn-secondary btn-sm"
          onClick={handleSellBarterGoods}
        >
          Sell all barter goods
        </button>
      </div>

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
