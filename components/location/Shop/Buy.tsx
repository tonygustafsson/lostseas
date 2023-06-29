import MerchandiseShopItem from "@/components/MerchandiseShopItem"
import { MERCHANDISE } from "@/constants/merchandise"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useShop } from "@/hooks/queries/useShop"

const ShopBuy = () => {
  const { data: player } = useGetPlayer()
  const { buy, sell } = useShop()

  return (
    <div className="flex flex-wrap gap-6">
      {Object.entries(MERCHANDISE)
        .filter(([_, item]) => item.availableAt === "shop")
        .map(([itemKey]) => (
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
