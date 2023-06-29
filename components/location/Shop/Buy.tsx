import { MERCHANDISE } from "@/constants/merchandise"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import ShopItem from "./ShopItem"

const ShopBuy = () => {
  const { data: player } = useGetPlayer()

  return (
    <div className="flex flex-wrap gap-6">
      {Object.entries(MERCHANDISE)
        .filter(([_, item]) => item.availableAt === "shop")
        .map(([itemKey]) => (
          <ShopItem
            key={`shop-item-${itemKey}`}
            type="Buy"
            item={itemKey as keyof Inventory}
            player={player}
          />
        ))}
    </div>
  )
}

export default ShopBuy
