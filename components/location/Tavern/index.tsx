import { TAVERN_ITEMS } from "@/constants/tavern"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import ShopItem from "./ShopItem"

const Tavern = () => {
  const { data: player } = useGetPlayer()

  return (
    <div className="flex flex-wrap gap-6">
      {Object.keys(TAVERN_ITEMS).map((item) => (
        <ShopItem
          key={`tavern-item-${item}`}
          item={item as keyof typeof TAVERN_ITEMS}
          player={player}
        />
      ))}
    </div>
  )
}

export default Tavern
