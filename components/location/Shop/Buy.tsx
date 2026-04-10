import MerchandiseShopItem from "@/components/MerchandiseShopItem"
import {
  isTradeGoodAvailableInTown,
  MERCHANDISE,
} from "@/constants/merchandise"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useShop } from "@/hooks/queries/useShop"

const ShopBuy = () => {
  const { data: player } = useGetPlayer()
  const { buy, sell } = useShop()

  const availableItems = Object.entries(MERCHANDISE).filter(
    ([itemKey, item]) =>
      item.availableAt === "shop" &&
      isTradeGoodAvailableInTown(
        itemKey as keyof Inventory,
        player?.character.town
      )
  )

  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {availableItems.map(([itemKey]) => (
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
  )
}

export default ShopBuy
