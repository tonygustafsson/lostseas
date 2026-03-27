"use client"

import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MERCHANDISE } from "@/constants/merchandise"
import { useMarket } from "@/hooks/queries/useMarket"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { capitalize } from "@/utils/string"

const Market = () => {
  const { data: player } = useGetPlayer()
  const { acceptMarketBargain } = useMarket()

  const items = player?.locationStates?.market?.items

  const handleAccept = (item: keyof LocationStateMarketItems) => {
    acceptMarketBargain({ item })
  }

  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries(items || {}).map(([item, { price, quantity }]) => {
        const inventoryItem = item as keyof LocationStateMarketItems
        const canAffortIt = price * quantity <= (player?.character.gold || 0)

        return (
          <MerchandiseCard
            key={`market-${item}`}
            title={capitalize(item)}
            indicator={player?.inventory?.[inventoryItem]?.toString() || "0"}
            icon={<MerchandiseIcon item={inventoryItem} />}
            disabled={!canAffortIt}
            body={
              <>
                <p>
                  You find <strong>{quantity}</strong>{" "}
                  {quantity === 1
                    ? MERCHANDISE[inventoryItem].singleUnit
                    : MERCHANDISE[inventoryItem].unit}{" "}
                  of {item} for <strong>{price} gold</strong>.
                </p>

                <p>{MERCHANDISE[inventoryItem].description}</p>

                <Badge variant="secondary" className="mt-4">
                  Price: {price * quantity} gold
                </Badge>
              </>
            }
            actions={
              <Button
                size="sm"
                onClick={() => handleAccept(inventoryItem)}
                disabled={!canAffortIt}
              >
                Buy
              </Button>
            }
          />
        )
      })}

      {!Object.keys(items || {}).length && (
        <div className="my-8">
          <p className="text-xl">There are no items for sale.</p>
        </div>
      )}
    </div>
  )
}

export default Market
