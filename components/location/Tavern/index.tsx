import { GiPirateCaptain } from "react-icons/gi"

import ActionCard from "@/components/ActionCard"
import { TAVERN_ITEMS } from "@/constants/tavern"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import ShopItem from "./ShopItem"

const Tavern = () => {
  const { data: player } = useGetPlayer()

  return (
    <>
      {player?.locationStates?.tavern?.noOfSailors &&
        !player?.locationStates.tavern.isHostile && (
          <ActionCard
            title={`${player?.locationStates?.tavern?.noOfSailors} sailors approach you`}
            message="After a couple of drinks and a few games of cards, it turns out they want to join you on your adventure."
            icon={<GiPirateCaptain className="w-20 h-20 text-secondary" />}
            actions={
              <>
                <button className="btn btn-primary">Take them in</button>
                <button className="btn btn-secondary">Pass</button>
              </>
            }
          />
        )}

      {player?.locationStates?.tavern?.noOfSailors &&
        player?.locationStates.tavern.isHostile && (
          <ActionCard
            title={`${player?.locationStates?.tavern?.noOfSailors} sailors approach you`}
            message="After a couple of drinks they start to get aggressive and want to fight you."
            icon={<GiPirateCaptain className="w-20 h-20 text-secondary" />}
            actions={
              <>
                <button className="btn btn-primary">Fight them</button>
                <button className="btn btn-secondary">Avoid</button>
              </>
            }
          />
        )}

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
