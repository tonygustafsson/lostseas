"use client"

import { useState } from "react"

import ShopTradeItem from "@/components/location/Shop/ShopTradeItem"
import ShopTradeSummary from "@/components/location/Shop/ShopTradeSummary"
import { MERCHANDISE } from "@/constants/merchandise"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useTrade } from "@/hooks/queries/useTrade"
import { useWarnOnUnsavedChanges } from "@/hooks/useWarnOnUnsavedChanges"
import {
  getAffordableTarget,
  getGoldLeftForItem,
  getPlannedAmount,
  getTradeChanges,
  type TradeTargets,
} from "@/utils/shop"

const EQUIPMENT = (Object.keys(MERCHANDISE) as (keyof Inventory)[]).filter(
  (item) => MERCHANDISE[item].availableAt === "shipyard"
)

/**
 * Cannons and repair kits, traded like the shop: plan how many you want to
 * own and press Transfer. Equipment doesn't take up space in the hold, so
 * only gold limits it, and the summary stops a trade you can't pay for.
 */
const ShipyardEquipment = () => {
  const { data: player } = useGetPlayer()
  // The whole trade at once, like the shop
  const { trade: tradeFittings, isTrading: isTradingFittings } = useTrade(
    "/api/shipyard/trade"
  )
  const [targets, setTargets] = useState<TradeTargets>({})

  useWarnOnUnsavedChanges(
    getTradeChanges(player?.inventory, targets).length > 0
  )

  if (!player) {
    return null
  }

  const inventory = player.inventory
  const gold = player.character.gold
  const changes = getTradeChanges(inventory, targets)

  return (
    <div className="flex flex-col gap-8">
      <ShopTradeSummary
        gold={gold}
        changes={changes}
        isTrading={isTradingFittings}
        onReset={() => setTargets({})}
        onTransfer={() =>
          tradeFittings(changes, { onSuccess: () => setTargets({}) })
        }
      />

      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {EQUIPMENT.map((item) => {
          const owned = inventory?.[item] ?? 0
          const goldLeft = getGoldLeftForItem(gold, changes, item)

          return (
            <ShopTradeItem
              key={item}
              item={item}
              owned={owned}
              target={getPlannedAmount(inventory, targets, item)}
              max={getAffordableTarget(item, owned, goldLeft)}
              storable={Infinity}
              limitedBy="gold"
              onChange={(value) =>
                setTargets((prev) => ({ ...prev, [item]: value }))
              }
            />
          )
        })}
      </ul>
    </div>
  )
}

export default ShipyardEquipment
