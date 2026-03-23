import { TAVERN_ITEMS } from "@/constants/tavern"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import ShopItem from "./ShopItem"

const TavernBuy = () => {
  const { data: player } = useGetPlayer()

  return (
    <>
      <h2 className="mb-8 font-serif text-3xl">Buy</h2>

      <div className="flex flex-wrap gap-4">
        {Object.keys(TAVERN_ITEMS).map((item) => (
          <ShopItem
            key={`tavern-item-${item}`}
            item={item as keyof typeof TAVERN_ITEMS}
            player={player}
          />
        ))}
      </div>
    </>
  )
}

export default TavernBuy
