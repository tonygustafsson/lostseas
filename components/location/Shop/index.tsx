"use client"

import { Box } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useShop } from "@/hooks/queries/useShop"
import {
  getAffordableTarget,
  getDailyConsumption,
  getGoldLeftForItem,
  getPlannedAmount,
  getSellBarterGoodsTargets,
  getShopItems,
  getTradeChanges,
  hasPlannedBarterGoods,
  type TradeTargets,
} from "@/utils/shop"

import ShopNecessitiesPresets from "./ShopNecessitiesPresets"
import ShopTradeItem from "./ShopTradeItem"
import ShopTradeSummary from "./ShopTradeSummary"

const Shop = () => {
  const { data: player } = useGetPlayer()
  const { trade, isTrading } = useShop()
  const [targets, setTargets] = useState<TradeTargets>({})

  if (!player) return null

  const inventory = player.inventory
  const { necessities, utilities, barterGoods } = getShopItems(
    player.character.town
  )
  const crewMembers = player.crewMembers.count || 0
  const changes = getTradeChanges(inventory, targets)
  const dailyUse = getDailyConsumption(crewMembers)

  const applyTargets = (newTargets: TradeTargets) => {
    setTargets((prev) => ({ ...prev, ...newTargets }))
  }

  const summary = (
    <ShopTradeSummary
      gold={player.character.gold}
      changes={changes}
      isTrading={isTrading}
      onReset={() => setTargets({})}
      onTransfer={() => trade(changes, { onSuccess: () => setTargets({}) })}
    />
  )

  const renderItem = (item: keyof Inventory) => {
    const owned = inventory?.[item] ?? 0
    const goldLeft = getGoldLeftForItem(player.character.gold, changes, item)

    return (
      <ShopTradeItem
        key={item}
        item={item}
        owned={owned}
        target={getPlannedAmount(inventory, targets, item)}
        affordable={getAffordableTarget(item, owned, goldLeft)}
        dailyUse={
          item === "food" || item === "water" ? dailyUse[item] : undefined
        }
        onChange={(value) => applyTargets({ [item]: value })}
      />
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <p className="text-muted-foreground text-sm">
        Set how much of each item you want to own. Below what you have sells,
        above it buys. Nothing changes until you press Transfer.
      </p>

      {summary}

      <section aria-labelledby="shop-necessities-heading">
        <h2
          id="shop-necessities-heading"
          className="mb-4 font-serif text-2xl font-semibold"
        >
          Necessities
        </h2>

        <div className="mb-4">
          <ShopNecessitiesPresets
            crewMembers={crewMembers}
            food={getPlannedAmount(inventory, targets, "food")}
            water={getPlannedAmount(inventory, targets, "water")}
            onApply={applyTargets}
          />
        </div>

        <ul className="flex flex-col gap-2">{necessities.map(renderItem)}</ul>
      </section>

      {utilities.length > 0 && (
        <section aria-labelledby="shop-utilities-heading">
          <h2
            id="shop-utilities-heading"
            className="mb-4 font-serif text-2xl font-semibold"
          >
            Utilities
          </h2>

          <ul className="flex flex-col gap-2">{utilities.map(renderItem)}</ul>
        </section>
      )}

      {barterGoods.length > 0 && (
        <section aria-labelledby="shop-barter-heading">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <h2
              id="shop-barter-heading"
              className="font-serif text-2xl font-semibold"
            >
              Barter goods
            </h2>

            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                applyTargets(getSellBarterGoodsTargets(barterGoods))
              }
              disabled={!hasPlannedBarterGoods(barterGoods, inventory, targets)}
            >
              <Box aria-hidden="true" />
              Sell all barter goods
            </Button>
          </div>

          <ul className="flex flex-col gap-2">{barterGoods.map(renderItem)}</ul>
        </section>
      )}

      {summary}
    </div>
  )
}

export default Shop
