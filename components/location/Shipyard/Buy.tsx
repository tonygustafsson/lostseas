"use client"

import { AlertTriangleIcon } from "lucide-react"

import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import MerchandiseShopItem from "@/components/MerchandiseShopItem"
import ShipHealthBadge from "@/components/ships/ShipHealthBadge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MERCHANDISE } from "@/constants/merchandise"
import { SHIP_REPAIR_COST, SHIP_TYPES } from "@/constants/ship"
import { TITLE_INFO } from "@/constants/title"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useShipyard } from "@/hooks/queries/useShipyard"

const ShipyardBuy = () => {
  const { data: player } = useGetPlayer()
  const { buyShip, buyFittings, sellFittings, repairShip } = useShipyard()

  const handleBuyShip = (item: keyof typeof SHIP_TYPES) => {
    buyShip({ item })
  }

  const titleInfo = TITLE_INFO[player?.character.title || "Pirate"]
  const shipCount = Object.keys(player?.ships || {}).length
  const maxShipsReached = shipCount >= titleInfo.maxShips

  const shipBuyingDisabled = (price: number) =>
    maxShipsReached || price > (player?.character.gold || 0)

  const damagedShips = Object.entries(player?.ships || []).filter(
    ([_, { health }]) => health < 75
  )

  return (
    <>
      {maxShipsReached && (
        <Alert className="mb-8 bg-gray-800">
          <AlertTriangleIcon />
          <AlertTitle>Max ships reached</AlertTitle>
          <AlertDescription>
            You can only have {titleInfo.maxShips} ships as long as you have the
            title {titleInfo.title}.
          </AlertDescription>
        </Alert>
      )}

      {damagedShips.length > 0 && (
        <>
          <p className="text-lg">Ships needing repair</p>

          <div className="mt-4 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {damagedShips.map(([id, { name, type, health }]) => {
              const shipInfo = SHIP_TYPES[type as keyof typeof SHIP_TYPES]
              const repairCost = (100 - health) * SHIP_REPAIR_COST

              if (!shipInfo) return null

              return (
                <MerchandiseCard
                  key={`shipyard-quick-repair-${id}`}
                  title={`${name} (${type})`}
                  image={`/img/cards/shipyard/${type.toLowerCase()}.png`}
                  icon={<MerchandiseIcon item={type} />}
                  body={<ShipHealthBadge health={health} className="mt-2" />}
                  actions={
                    <Button size="sm" onClick={() => repairShip({ id })}>
                      Repair for {repairCost} gold
                    </Button>
                  }
                />
              )
            })}
          </div>

          <Separator className="my-12" />
        </>
      )}

      <h2 className="mb-4 font-serif text-xl">Ships</h2>

      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Object.entries(SHIP_TYPES).map(([shipType, { description, buy }]) => (
          <MerchandiseCard
            key={`shipyard-buy-${shipType}`}
            title={shipType}
            image={`/img/cards/shipyard/${shipType.toLowerCase()}.png`}
            disabled={shipBuyingDisabled(buy)}
            icon={<MerchandiseIcon item={shipType} />}
            body={
              <>
                <p>{description}</p>

                <Badge variant="secondary" className="mt-4">
                  Price: {buy} gold
                </Badge>
              </>
            }
            actions={
              <Button
                size="sm"
                onClick={() =>
                  handleBuyShip(shipType as keyof typeof SHIP_TYPES)
                }
                disabled={shipBuyingDisabled(buy)}
              >
                Buy
              </Button>
            }
          />
        ))}
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
              type="Buy"
              player={player}
              onBuy={buyFittings}
              onSell={sellFittings}
            />
          ))}
      </div>
    </>
  )
}

export default ShipyardBuy
