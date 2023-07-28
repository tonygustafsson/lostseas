import { useState } from "react"

import LocationTabs from "@/components/LocationTabs"
import { useModal } from "@/components/ui/Modal/context"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useShop } from "@/hooks/queries/useShop"
import { getBarterGoodsValue } from "@/utils/shop"

import ShopBuy from "./Buy"
import ShopSell from "./Sell"

export type ShopTab = "buy" | "sell"

const Shop = () => {
  const { data: player } = useGetPlayer()
  const [tab, setTab] = useState<ShopTab>("buy")
  const { sellBarterGoods } = useShop()
  const { setModal, removeModal } = useModal()

  const barterGoodsValue = getBarterGoodsValue(player?.inventory)

  const showSellBarterGoods = () => {
    setModal({
      id: "sellbartergoods",
      title: "Are you sure?",
      content: (
        <div className="flex flex-col gap-4">
          <p>
            Do you want to sell all items you don&apos;t need? You will get{" "}
            {barterGoodsValue} gold.
          </p>

          <div className="flex gap-2">
            <button onClick={handleSellBarterGoods} className="btn btn-primary">
              Go ahead
            </button>
            <button
              onClick={() => removeModal("sellbartergoods")}
              className="btn btn-secondary"
            >
              No thanks
            </button>
          </div>
        </div>
      ),
    })
  }

  const handleSellBarterGoods = () => {
    sellBarterGoods()
    removeModal("sellbartergoods")
  }

  return (
    <>
      {barterGoodsValue > 0 && (
        <div className="flex mb-6">
          <button
            className="btn btn-secondary btn-sm"
            onClick={showSellBarterGoods}
          >
            Sell all barter goods
          </button>
        </div>
      )}

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
