import { GiPirateCaptain } from "react-icons/gi"

import ActionCard from "@/components/ActionCard"
import { TAVERN_ITEMS } from "@/constants/tavern"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import ShopItem from "./ShopItem"

const Tavern = () => {
  const { data: player } = useGetPlayer()

  return (
    <>
      <ActionCard
        title="A bunch of sailors approach you"
        message="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi."
        icon={<GiPirateCaptain className="w-20 h-20 text-secondary" />}
        actions={
          <>
            <button className="btn btn-primary">Talk to them</button>
            <button className="btn btn-secondary">Ignore them</button>
          </>
        }
      />

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

export default Tavern
