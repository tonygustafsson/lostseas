"use client"

import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MERCHANDISE } from "@/constants/merchandise"
import { useMarket } from "@/hooks/queries/useMarket"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { capitalize } from "@/utils/string"

import MarketApothecary from "./MarketApothecary"

const Market = () => {
  const { data: player } = useGetPlayer()
  const { acceptMarketBargain, buyRemedy, isBuyingRemedy } = useMarket()

  const items = player?.locationStates?.market?.items
  const hasOffers = Object.keys(items || {}).length > 0

  const handleAccept = (item: keyof LocationStateMarketItems) => {
    acceptMarketBargain({ item })
  }

  return (
    <div className="mb-8">
      {hasOffers && (
        <>
          <h2 className="mb-4 font-serif text-xl">Traders</h2>

          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {Object.entries(items || {}).map(([item, { price, quantity }]) => {
              const inventoryItem = item as keyof LocationStateMarketItems
              const canAffortIt =
                price * quantity <= (player?.character.gold || 0)
              const { buy } = MERCHANDISE[inventoryItem]
              const discount = Math.round((1 - price / buy) * 100)

              return (
                <MerchandiseCard
                  key={`market-${item}`}
                  title={capitalize(item)}
                  image={`/img/cards/${MERCHANDISE[inventoryItem].availableAt}/${item}.png`}
                  indicator={
                    player?.inventory?.[inventoryItem]?.toString() || "0"
                  }
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

                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">
                          Price: {price * quantity} gold
                        </Badge>

                        {discount > 0 && (
                          <Badge className="bg-success/10 text-success">
                            {discount}% discount
                          </Badge>
                        )}
                      </div>
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
          </div>

          {player && <Separator className="my-12" />}
        </>
      )}

      {player && (
        <MarketApothecary
          player={player}
          onBuy={(remedy) => buyRemedy({ remedy })}
          isBuying={isBuyingRemedy}
        />
      )}
    </div>
  )
}

export default Market
