import { MERCHANDISE } from "@/constants/merchandise"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import ShopItem from "./ShopItem"

const ShopSell = () => {
  const { data: player } = useGetPlayer()

  return (
    <div className="flex flex-wrap gap-6">
      {Object.keys(MERCHANDISE).map((item) => (
        <ShopItem
          key={`shop-item-${item}`}
          type="Sell"
          item={item as keyof Inventory}
          player={player}
        />
      ))}
    </div>
  )
}

export default ShopSell
