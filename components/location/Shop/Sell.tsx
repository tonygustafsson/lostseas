import { MERCHANDISE } from "@/constants/merchandise"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import ShopItem from "./ShopItem"

const ShopSell = () => {
  const { data: player } = useGetPlayer()

  return (
    <div className="flex flex-wrap gap-6">
      {Object.entries(MERCHANDISE)
        .filter(([_, item]) => item.availableAt === "shop")
        .map(([itemKey]) => (
          <ShopItem
            key={`shop-item-${itemKey}`}
            type="Sell"
            item={itemKey as keyof Inventory}
            player={player}
          />
        ))}
    </div>
  )
}

export default ShopSell
