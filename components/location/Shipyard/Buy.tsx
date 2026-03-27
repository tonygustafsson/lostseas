"use client"

import { AlertTriangleIcon } from "lucide-react"

import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import MerchandiseShopItem from "@/components/MerchandiseShopItem"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { MERCHANDISE } from "@/constants/merchandise"
import { SHIP_TYPES } from "@/constants/ship"
import { TITLE_INFO } from "@/constants/title"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useShipyard } from "@/hooks/queries/useShipyard"

const ShipyardBuy = () => {
  const { data: player } = useGetPlayer()
  const { buyShip, buyFittings, sellFittings } = useShipyard()

  const handleBuyShip = (item: keyof typeof SHIP_TYPES) => {
    buyShip({ item })
  }

  const titleInfo = TITLE_INFO[player?.character.title || "Pirate"]
  const shipCount = Object.keys(player?.ships || {}).length
  const maxShipsReached = shipCount >= titleInfo.maxShips

  const shipBuyingDisabled = (price: number) =>
    maxShipsReached || price > (player?.character.gold || 0)

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

      <div className="flex flex-wrap gap-6">
        {Object.entries(SHIP_TYPES).map(([shipType, { description, buy }]) => (
          <MerchandiseCard
            key={`shipyard-buy-${shipType}`}
            title={shipType}
            disabled={shipBuyingDisabled(buy)}
            icon={<MerchandiseIcon item={shipType} />}
            body={
              <>
                <p>{description}</p>

                <div className="flex gap-2">
                  <div className="badge badge-secondary">Price: {buy} gold</div>
                </div>
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
