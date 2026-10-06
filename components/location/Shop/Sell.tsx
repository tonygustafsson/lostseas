import { Box } from "lucide-react"

import MerchandiseShopItem from "@/components/MerchandiseShopItem"
import { Button } from "@/components/ui/button"
import {
  isTradeGoodAvailableInTown,
  MERCHANDISE,
} from "@/constants/merchandise"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useShop } from "@/hooks/queries/useShop"
import { getBarterGoodsValue } from "@/utils/shop"

type Props = {
  onSellBarterGoods: () => void
}

const ShopSell = ({ onSellBarterGoods }: Props) => {
  const { data: player } = useGetPlayer()
  const { buy, sell } = useShop()

  const necessities = Object.entries(MERCHANDISE).filter(
    ([itemKey, item]) =>
      item.isNecessity &&
      !!player?.inventory?.[itemKey as keyof Inventory] &&
      item.availableAt === "shop"
  )
  const barterGoods = Object.entries(MERCHANDISE).filter(
    ([itemKey, item]) =>
      (item.isBarterGoods || item.isUtility) &&
      item.availableAt === "shop" &&
      isTradeGoodAvailableInTown(
        itemKey as keyof Inventory,
        player?.character.town
      ) &&
      (player?.inventory?.[itemKey as keyof Inventory] || 0) > 0
  )
  const barterGoodsValue = player ? getBarterGoodsValue(player) : 0

  if (!necessities.length && !barterGoods.length)
    return (
      <p className="text-muted-foreground mt-2 text-sm">
        There are no items available for sale at this time.
      </p>
    )

  return (
    <div className="flex flex-col gap-8">
      <section aria-labelledby="shop-necessities-heading">
        <div className="mb-4 flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
          <div>
            <h2
              id="shop-necessities-heading"
              className="font-serif text-2xl font-semibold"
            >
              Necessities
            </h2>

            <p className="text-muted-foreground mt-2 text-sm">
              Sell food and water from your inventory.
            </p>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {necessities.map(([itemKey]) => (
            <MerchandiseShopItem
              key={`shop-item-${itemKey}`}
              type="Sell"
              item={itemKey as keyof Inventory}
              player={player}
              onBuy={buy}
              onSell={sell}
            />
          ))}
        </div>
      </section>

      {barterGoods.length > 0 && (
        <section aria-labelledby="shop-barter-heading" className="mt-8">
          <div className="mb-4 flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
            <div>
              <h2
                id="shop-barter-heading"
                className="font-serif text-2xl font-semibold"
              >
                Barter goods
              </h2>

              <p className="text-muted-foreground mt-2 text-sm">
                Trade goods available in this port, or buy medicine for your
                crew. Sell all barter goods at once while keeping your medicine.
              </p>
            </div>

            <Button
              onClick={onSellBarterGoods}
              disabled={barterGoodsValue <= 0}
            >
              <Box aria-hidden="true" />
              Sell all barter goods
            </Button>
          </div>

          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {barterGoods.map(([itemKey]) => (
              <MerchandiseShopItem
                key={`shop-item-${itemKey}`}
                type="Sell"
                item={itemKey as keyof Inventory}
                player={player}
                onBuy={buy}
                onSell={sell}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default ShopSell
