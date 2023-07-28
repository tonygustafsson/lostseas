import { useState } from "react"

import LocationTabs from "@/components/LocationTabs"
import { useModal } from "@/components/ui/Modal/context"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useShop } from "@/hooks/queries/useShop"
import { getBarterGoodsValue, getNecessitiesInfo } from "@/utils/shop"

import ShopBuy from "./Buy"
import ShopSell from "./Sell"

export type ShopTab = "buy" | "sell"

const Shop = () => {
  const { data: player } = useGetPlayer()
  const [tab, setTab] = useState<ShopTab>("buy")
  const { buyNecessities, sellBarterGoods } = useShop()
  const { setModal, removeModal } = useModal()

  const barterGoodsValue = getBarterGoodsValue(player?.inventory)

  const showBuyNecessities = () => {
    const { cost: necessitiesCost5Days } = getNecessitiesInfo(
      player?.crewMembers.count || 0,
      5
    )
    const { cost: necessitiesCost10Days } = getNecessitiesInfo(
      player?.crewMembers.count || 0,
      10
    )
    const { cost: necessitiesCost25Days } = getNecessitiesInfo(
      player?.crewMembers.count || 0,
      25
    )

    setModal({
      id: "buynecesseties",
      title: "Buy necessities",
      content: (
        <div className="flex flex-col gap-4">
          <p>
            Choose for how many days at sea you want to buy food and water for.
          </p>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleBuyNecessities(5)}
              className="btn btn-primary"
              disabled={(player?.character.gold || 0) < necessitiesCost5Days}
            >
              5 days, {necessitiesCost5Days} gold
            </button>
            <button
              onClick={() => handleBuyNecessities(10)}
              className="btn btn-primary"
              disabled={(player?.character.gold || 0) < necessitiesCost10Days}
            >
              10 days, {necessitiesCost10Days} gold
            </button>
            <button
              onClick={() => handleBuyNecessities(25)}
              className="btn btn-primary"
              disabled={(player?.character.gold || 0) < necessitiesCost25Days}
            >
              25 days, {necessitiesCost25Days} gold
            </button>
          </div>
        </div>
      ),
    })
  }

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

  const handleBuyNecessities = (days: number) => {
    buyNecessities(days)
    removeModal("buynecesseties")
  }

  const handleSellBarterGoods = () => {
    sellBarterGoods()
    removeModal("sellbartergoods")
  }

  return (
    <>
      <div className="flex mb-6 gap-2">
        <button
          className="btn btn-secondary btn-sm"
          onClick={showBuyNecessities}
        >
          Buy necessities
        </button>

        {barterGoodsValue > 0 && (
          <button
            className="btn btn-secondary btn-sm"
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
    </>
  )
}

export default Shop
