import { GiMeat } from "react-icons/gi"

import MerchandiseShopItem from "@/components/MerchandiseShopItem"
import { Button } from "@/components/ui/button"
import {
  isTradeGoodAvailableInTown,
  MERCHANDISE,
} from "@/constants/merchandise"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useShop } from "@/hooks/queries/useShop"

type Props = {
  onBuyNecessities: () => void
}

const ShopBuy = ({ onBuyNecessities }: Props) => {
  const { data: player } = useGetPlayer()
  const { buy, sell } = useShop()

  const necessities = Object.entries(MERCHANDISE).filter(
    ([_, item]) => item.isNecessity && item.availableAt === "shop"
  )
  const barterGoods = Object.entries(MERCHANDISE).filter(
    ([itemKey, item]) =>
      item.availableAt === "shop" &&
      (item.isBarterGoods || item.isUtility) &&
      isTradeGoodAvailableInTown(
        itemKey as keyof Inventory,
        player?.character.town
      )
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
              Stock up on food and water for your crew. Buy supplies for your
              next voyage, taking your current inventory into account.
            </p>
          </div>

          <Button onClick={onBuyNecessities}>
            <GiMeat aria-hidden="true" />
            Buy necessities
          </Button>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {necessities.map(([itemKey]) => (
            <MerchandiseShopItem
              key={`shop-item-${itemKey}`}
              type="Buy"
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
                crew.
              </p>
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {barterGoods.map(([itemKey]) => (
              <MerchandiseShopItem
                key={`shop-item-${itemKey}`}
                type="Buy"
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

export default ShopBuy
