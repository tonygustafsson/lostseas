import {
  GiBrandyBottle,
  GiMeat,
  GiPorcelainVase,
  GiPowder,
  GiRolledCloth,
  GiSmokingPipe,
  GiWaterFlask,
} from "react-icons/gi"

import { useGetPlayer } from "@/hooks/queries/usePlayer"

import ShopItem from "./ShopItem"

const Shop = () => {
  const { data: player } = useGetPlayer()

  return (
    <div className="flex flex-wrap gap-6">
      <ShopItem
        item="food"
        description="You need food to travel the open seas."
        icon={<GiMeat className="text-6xl text-primary" />}
        player={player}
      />

      <ShopItem
        item="water"
        description="You need water to travel the open seas."
        icon={<GiWaterFlask className="text-6xl text-primary" />}
        player={player}
      />

      <ShopItem
        item="porcelain"
        description="A great trading asset. Not used for anything specific."
        icon={<GiPorcelainVase className="text-6xl text-primary" />}
        player={player}
      />

      <ShopItem
        item="spices"
        description="A great trading asset. Not used for anything specific."
        icon={<GiPowder className="text-6xl text-primary" />}
        player={player}
      />

      <ShopItem
        item="silk"
        description="A great trading asset. Not used for anything specific."
        icon={<GiRolledCloth className="text-6xl text-primary" />}
        player={player}
      />

      <ShopItem
        item="tobacco"
        description="A great trading asset and can also make your crew happy."
        icon={<GiSmokingPipe className="text-6xl text-primary" />}
        player={player}
      />

      <ShopItem
        item="rum"
        description="A great trading asset and can also make your crew happy."
        icon={<GiBrandyBottle className="text-6xl text-primary" />}
        player={player}
      />
    </div>
  )
}

export default Shop
