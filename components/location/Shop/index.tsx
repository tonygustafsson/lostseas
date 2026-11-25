"use client"

import { Box } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useShop } from "@/hooks/queries/useShop"
import { useWarnOnUnsavedChanges } from "@/hooks/useWarnOnUnsavedChanges"
import {
  getCargoAfterTrade,
  getCargoCapacity,
  getCargoLeftForItem,
  getStorableTarget,
} from "@/utils/cargo"
import {
  getAffordableTarget,
  getGoldLeftForItem,
  getPlannedAmount,
  getSellBarterGoodsTargets,
  getShopItems,
  getTradeChanges,
  hasPlannedBarterGoods,
  type TradeTargets,
} from "@/utils/shop"

import ShopSuppliesDialog from "./ShopSuppliesDialog"
import ShopTradeItem from "./ShopTradeItem"
import ShopTradeSummary from "./ShopTradeSummary"

const Shop = () => {
  const { data: player } = useGetPlayer()
  const { trade, isTrading } = useShop()
  const [targets, setTargets] = useState<TradeTargets>({})

  useWarnOnUnsavedChanges(
    getTradeChanges(player?.inventory, targets).length > 0
  )

  if (!player) return null

  const inventory = player.inventory
  const { necessities, utilities, barterGoods } = getShopItems(
    player.character.town
  )
  const crewMembers = player.crewMembers.count || 0
  const changes = getTradeChanges(inventory, targets)
  const cargoCapacity = getCargoCapacity(player.ships)
  const cargoAfter = getCargoAfterTrade(inventory, changes)

  const applyTargets = (newTargets: TradeTargets) => {
    setTargets((prev) => ({ ...prev, ...newTargets }))
  }

  const summary = (
    <ShopTradeSummary
      gold={player.character.gold}
      changes={changes}
      cargoAfter={cargoAfter}
      cargoCapacity={cargoCapacity}
      isTrading={isTrading}
      onReset={() => setTargets({})}
      onTransfer={() => trade(changes, { onSuccess: () => setTargets({}) })}
    />
  )

  const renderItem = (item: keyof Inventory) => {
    const owned = inventory?.[item] ?? 0
    const goldLeft = getGoldLeftForItem(player.character.gold, changes, item)
    const affordable = getAffordableTarget(item, owned, goldLeft)
    const storable = getStorableTarget(
      item,
      owned,
      getCargoLeftForItem(player, changes, item)
    )

    return (
      <ShopTradeItem
        key={item}
        item={item}
        owned={owned}
        target={getPlannedAmount(inventory, targets, item)}
        max={Math.min(affordable, storable)}
        storable={storable}
        limitedBy={storable < affordable ? "cargo" : "gold"}
        crewMembers={
          item === "food" || item === "water" ? crewMembers : undefined
        }
        onChange={(value) => applyTargets({ [item]: value })}
      />
    )
  }

  return (
    <div className="flex flex-col gap-8">
      {summary}

      <section aria-labelledby="shop-necessities-heading">
        <h2
          id="shop-necessities-heading"
          className="mb-4 font-serif text-2xl font-semibold"
        >
          Necessities
        </h2>

        <div className="mb-8">
          <ShopSuppliesDialog
            crewMembers={crewMembers}
            food={getPlannedAmount(inventory, targets, "food")}
            water={getPlannedAmount(inventory, targets, "water")}
            gold={player.character.gold}
            changes={changes}
            cargoAfter={cargoAfter}
            cargoCapacity={cargoCapacity}
            canSellBarterGoods={hasPlannedBarterGoods(
              barterGoods,
              inventory,
              targets
            )}
            onApply={applyTargets}
            onSellBarterGoods={() =>
              applyTargets(getSellBarterGoodsTargets(barterGoods))
            }
            onReset={() => setTargets({})}
          />
        </div>

        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {necessities.map(renderItem)}
        </ul>
      </section>

      {utilities.length > 0 && (
        <>
          <Separator />

          <section aria-labelledby="shop-utilities-heading">
            <h2
              id="shop-utilities-heading"
              className="mb-4 font-serif text-2xl font-semibold"
            >
              Utilities
            </h2>

            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {utilities.map(renderItem)}
            </ul>
          </section>
        </>
      )}

      {barterGoods.length > 0 && (
        <>
          <Separator />

          <section aria-labelledby="shop-barter-heading">
            <h2
              id="shop-barter-heading"
              className="mb-4 font-serif text-2xl font-semibold"
            >
              Barter goods
            </h2>

            <div className="mb-8">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={() =>
                  applyTargets(getSellBarterGoodsTargets(barterGoods))
                }
                disabled={
                  !hasPlannedBarterGoods(barterGoods, inventory, targets)
                }
              >
                <Box aria-hidden="true" />
                Sell all barter goods
              </Button>
            </div>

            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {barterGoods.map(renderItem)}
            </ul>
          </section>
        </>
      )}

      {summary}
    </div>
  )
}

export default Shop
