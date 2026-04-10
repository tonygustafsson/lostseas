"use client"

import { useState } from "react"

import useModal from "@/app/stores/modals"
import LocationTabs from "@/components/LocationTabs"
import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group"
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

  const barterGoodsValue = player ? getBarterGoodsValue(player) : 0

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
            Do you want to sell all tradable goods available in this port? You
            will get {barterGoodsValue} gold.
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
      <ButtonGroup className="mb-6 self-center">
        <ButtonGroupText>Quick menu</ButtonGroupText>
        <Button variant="outline" onClick={showBuyNecessities}>
          Buy necessities
        </Button>

        {barterGoodsValue > 0 && (
          <Button variant="outline" onClick={showSellBarterGoods}>
            Sell tradable goods
          </Button>
        )}
      </ButtonGroup>

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
