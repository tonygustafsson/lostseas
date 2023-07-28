import { useModal } from "@/components/ui/Modal/context"
import { useShop } from "@/hooks/queries/useShop"
import { getDaysWorthOfNecessities, getNecessitiesInfo } from "@/utils/shop"

type Props = {
  player?: Player
}

const BuyNecessities = ({ player }: Props) => {
  const { buyNecessities } = useShop()
  const { removeModal } = useModal()

  const daysWorthOfNecessities = getDaysWorthOfNecessities({
    crewMembers: player?.crewMembers.count || 0,
    currentFood: player?.inventory?.food,
    currentWater: player?.inventory?.water,
  })

  const handleBuyNecessities = (days: number) => {
    buyNecessities(days)
    removeModal("buyNecesseties")
  }

  return (
    <div className="flex flex-col gap-4">
      <p>
        You current inventory allows you to travel for {daysWorthOfNecessities}{" "}
        days.
      </p>
      <p>
        Choose for how many days at sea you want to buy food and water for.
        Existing inventory will be taken into account.
      </p>

      <div className="flex flex-wrap gap-2">
        {[5, 10, 25, 50].map((days) => {
          const { cost: necessitiesCost } = getNecessitiesInfo({
            crewMembers: player?.crewMembers.count || 0,
            currentFood: player?.inventory?.food || 0,
            currentWater: player?.inventory?.water || 0,
            days,
          })

          if (necessitiesCost < 1) {
            return null
          }

          return (
            <button
              key={`necessities-${days}`}
              onClick={() => handleBuyNecessities(days)}
              className="btn btn-primary"
              disabled={(player?.character.gold || 0) < necessitiesCost}
            >
              {days} days, {necessitiesCost} gold
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default BuyNecessities
