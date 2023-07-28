import { useState } from "react"

import LocationTabs from "@/components/LocationTabs"
import { useModal } from "@/components/ui/Modal/context"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useShop } from "@/hooks/queries/useShop"
import { getBarterGoodsValue } from "@/utils/shop"

import ShopBuy from "./Buy"
import BuyNecessities from "./BuyNecessities"
import ShopSell from "./Sell"

export type ShopTab = "buy" | "sell"

const Shop = () => {
  const { data: player } = useGetPlayer()
  const [tab, setTab] = useState<ShopTab>("buy")
  const { sellBarterGoods } = useShop()
  const { setModal, removeModal } = useModal()

  const barterGoodsValue = getBarterGoodsValue(player?.inventory)

  const showBuyNecessities = () => {
    setModal({
      id: "buyNecesseties",
      title: "Buy necessities",
      content: <BuyNecessities player={player} />,
    })
  }

  const showSellBarterGoods = () => {
    setModal({
      id: "sellBarterGoods",
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
              onClick={() => removeModal("sellBarterGoods")}
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
    removeModal("sellBarterGoods")
  }

  return (
    <div className="flex flex-col">
      <div className="join self-center gap-1 mb-6">
        <button
          className="join-item btn btn-primary btn-sm"
          onClick={showBuyNecessities}
        >
          Buy necessities
        </button>

        {barterGoodsValue > 0 && (
          <button
            className="join-item btn btn-primary btn-sm"
            onClick={showSellBarterGoods}
          >
            Sell all barter goods
          </button>
        )}
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
    </div>
  )
}

export default Shop
