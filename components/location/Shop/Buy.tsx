import { MERCHANDISE } from "@/constants/merchandise"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import ShopItem from "./ShopItem"

const ShopBuy = () => {
  const { data: player } = useGetPlayer()

  return (
    <div className="flex flex-wrap gap-6">
      {Object.keys(MERCHANDISE).map((item) => (
        <ShopItem
          key={`shop-item-${item}`}
          type="Buy"
          item={item as keyof Inventory}
          player={player}
        />
      ))}
    </div>
  )
}

export default ShopBuy
