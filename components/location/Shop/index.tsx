"use client"

import { useState } from "react"

import { useModal } from "@/app/stores/modals"
import LocationTabs from "@/components/LocationTabs"
import { Button } from "@/components/ui/button"
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
            <Button onClick={handleSellBarterGoods}>Go ahead</Button>
            <Button
              onClick={() => removeModal("sellBarterGoods")}
              variant="secondary"
            >
              No thanks
            </Button>
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
      <div className="join mb-6 gap-1 self-center">
        <Button className="join-item btn-sm" onClick={showBuyNecessities}>
          Buy necessities
        </Button>

        {barterGoodsValue > 0 && (
          <Button className="join-item btn-sm" onClick={showSellBarterGoods}>
            Sell all barter goods
          </Button>
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
