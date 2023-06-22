import { TAVERN_ITEMS } from "@/constants/tavern"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import ShopItem from "./ShopItem"

export type TavernTab = "Buy" | "Dice"

const TavernBuy = () => {
  const { data: player } = useGetPlayer()

  return (
    <>
      <h2 className="text-3xl font-serif mb-8">Buy</h2>

      <div className="flex flex-wrap gap-6">
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
