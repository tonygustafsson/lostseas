"use client"

import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import MerchandiseShopItem from "@/components/MerchandiseShopItem"
import ShipHealthBadge from "@/components/ships/ShipHealthBadge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MERCHANDISE } from "@/constants/merchandise"
import { SHIP_TYPES } from "@/constants/ship"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useShipyard } from "@/hooks/queries/useShipyard"

const ShipyardSell = () => {
  const { data: player } = useGetPlayer()
  const { sellShip, buyFittings, sellFittings } = useShipyard()

  const handleSellShip = (id: Ship["id"]) => {
    sellShip({ id })
  }

  return (
    <>
      <h2 className="mb-4 font-serif text-xl">Ships</h2>

      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Object.entries(player?.ships || []).map(
          ([id, { name, type, health }]) => {
            const shipInfo = SHIP_TYPES[type as keyof typeof SHIP_TYPES]

            if (!shipInfo) return null

            return (
              <MerchandiseCard
                key={`shipyard-sell-${id}`}
                title={`${name} (${type})`}
                image={`/img/cards/shipyard/${type.toLowerCase()}.png`}
                icon={<MerchandiseIcon item={type} />}
                body={
                  <>
                    <p>{shipInfo.description}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <ShipHealthBadge health={health} />

                      <Badge variant="secondary">
                        Worth: {shipInfo.sell} gold
                      </Badge>
                    </div>
                  </>
                }
                actions={
                  <Button size="sm" onClick={() => handleSellShip(id)}>
                    Sell {type}
                  </Button>
                }
              />
            )
          }
        )}

        {!Object.keys(player?.ships || {}).length && (
          <p>You do not own any ships currently.</p>
        )}
      </div>

      <Separator className="my-12" />

      <h2 className="mb-4 font-serif text-xl">Equipment</h2>

      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Object.entries(MERCHANDISE)
          .filter(([_, item]) => item.availableAt === "shipyard")
          .map(([itemKey]) => (
            <MerchandiseShopItem
              key={`shop-item-${itemKey}`}
              item={itemKey as keyof typeof MERCHANDISE}
              type="Sell"
              player={player}
              onBuy={buyFittings}
              onSell={sellFittings}
            />
          ))}

        {!Object.entries(MERCHANDISE).some(
          ([item, info]) =>
            info.availableAt === "shipyard" &&
            (player?.inventory?.[item as keyof Inventory] ?? 0) > 0
        ) && <p>You do not own any equipment currently.</p>}
      </div>
    </>
  )
}

export default ShipyardSell
