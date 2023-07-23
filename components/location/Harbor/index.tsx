import { GiBandana, GiShoonerSailboat } from "react-icons/gi"

import MerchandiseIcon from "@/components/MerchandiseIcon"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const Harbor = () => {
  const { data: player } = useGetPlayer()

  const journeyValidation = player?.locationStates?.harbor?.journeyValidation

  if (journeyValidation && !journeyValidation.success) {
    return (
      <div className="flex flex-col">
        <h2 className="text-3xl font-serif text-center text-error mb-4">
          Yarr, not ready to leave yet
        </h2>

        <ul className="flex flex-col gap-2">
          {journeyValidation.errors.includes("NO_SHIPS") && (
            <li className="flex align-middle gap-2 text-lg">
              <GiShoonerSailboat className="h-7 w-7 text-primary" />
              You do not own any ships.
            </li>
          )}

          {journeyValidation.errors.includes("NO_CREW") && (
            <li className="flex align-middle gap-2 text-lg">
              <GiBandana className="h-7 w-7 text-primary" />
              You do not have any crew members.
            </li>
          )}

          {journeyValidation.errors.includes("ANGRY_CREW") && (
            <li className="flex align-middle gap-2 text-lg">
              <GiBandana className="h-7 w-7 text-primary" />
              Your crew is an angry bunch, they do not want to travel with you
              any more. Make them happy by giving them gold or taking them to
              the tavern.
            </li>
          )}

          {journeyValidation.errors.includes("NO_FOOD") && (
            <li className="flex align-middle gap-2 text-lg">
              <MerchandiseIcon item="food" />
              You do not have enough food for the journey. You need at least{" "}
              {journeyValidation.neededFood} crates of food.
            </li>
          )}

          {journeyValidation.errors.includes("NO_WATER") && (
            <li className="flex align-middle gap-2 text-lg">
              <MerchandiseIcon item="water" />
              You do not have enough water for the journey. You need at least{" "}
              {journeyValidation.neededWater} barrels of water.
            </li>
          )}
        </ul>
      </div>
    )
  }

  return null
}

export default Harbor
