import { FaCoins } from "react-icons/fa"
import { GiBandana, GiShoonerSailboat } from "react-icons/gi"

import MerchandiseIcon from "@/components/MerchandiseIcon"
import ParrotBox from "@/components/ParrotBox"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const Harbor = () => {
  const { data: player } = useGetPlayer()

  const journeyValidation = player?.locationStates?.harbor?.journeyValidation
  const landingTips = player?.locationStates?.harbor?.landingTips

  return (
    <>
      {journeyValidation && !journeyValidation.success && (
        <ParrotBox title="Yarr, not ready to leave yet">
          <ul className="flex flex-col gap-4">
            {journeyValidation.errors.includes("NO_SHIPS") && (
              <li className="flex align-middle gap-4 text-lg">
                <GiShoonerSailboat className="h-7 w-7 text-primary" />
                <div className="flex-1">You do not own any ships.</div>
              </li>
            )}

            {journeyValidation.errors.includes("DAMAGED_SHIPS") && (
              <li className="flex align-middle gap-4 text-lg">
                <GiShoonerSailboat className="h-7 w-7 text-primary" />
                <div className="flex-1">
                  Some of your ships are too damaged to continue traveling. Fix
                  them in the shipyard.
                </div>
              </li>
            )}

            {journeyValidation.errors.includes("NOT_ENOUGH_CREW_MEMBERS") && (
              <li className="flex align-middle gap-4 text-lg">
                <GiBandana className="h-7 w-7 text-primary" />
                <div className="flex-1">
                  You need at least {journeyValidation.minCrew} crew members to
                  successfully sail your ships.
                </div>
              </li>
            )}

            {journeyValidation.errors.includes("TOO_MANY_CREW_MEMBERS") && (
              <li className="flex align-middle gap-4 text-lg">
                <GiBandana className="h-7 w-7 text-primary" />
                <div className="flex-1">
                  Your ships can carry {journeyValidation.maxCrew} crew members
                  at most. Get a new ship or dismiss some crew members.
                </div>
              </li>
            )}

            {journeyValidation.errors.includes("ANGRY_CREW") && (
              <li className="flex align-middle gap-4 text-lg">
                <GiBandana className="h-7 w-7 text-primary" />
                <div className="flex-1">
                  Your crew is an angry bunch, they do not want to travel with
                  you any more. Make them happy by giving them gold or taking
                  them to the tavern.
                </div>
              </li>
            )}

            {journeyValidation.errors.includes("CREW_IS_ILL") && (
              <li className="flex align-middle gap-4 text-lg">
                <GiBandana className="h-7 w-7 text-primary" />
                <div className="flex-1">
                  Your crew health is too low, they are too ill to travel. Give
                  them medicine.
                </div>
              </li>
            )}

            {journeyValidation.errors.includes("NO_FOOD") && (
              <li className="flex align-middle gap-4 text-lg">
                <MerchandiseIcon item="food" />
                <div className="flex-1">
                  You do not have enough food for the journey. You need at least{" "}
                  {journeyValidation.neededFood} crates of food.
                </div>
              </li>
            )}

            {journeyValidation.errors.includes("NO_WATER") && (
              <li className="flex align-middle gap-4 text-lg">
                <MerchandiseIcon item="water" />
                <div className="flex-1">
                  You do not have enough water for the journey. You need at
                  least {journeyValidation.neededWater} barrels of water.
                </div>
              </li>
            )}
          </ul>
        </ParrotBox>
      )}

      {landingTips && (
        <ParrotBox title="Heads up!">
          <ul className="flex flex-col gap-4">
            {landingTips.includes("TOO_MUCH_GOLD") && (
              <li className="flex align-middle gap-4 text-lg">
                <FaCoins className="h-7 w-7 text-primary" />
                <div className="flex-1">
                  You are carrying {player.character.gold} gold, it would be
                  wise to spend it on something useful or save it in the bank so
                  you won&apos;t loose it if you are defeated at sea.
                </div>
              </li>
            )}

            {landingTips.includes("DAMAGED_SHIPS") && (
              <li className="flex align-middle gap-4 text-lg">
                <GiShoonerSailboat className="h-7 w-7 text-primary" />
                <div className="flex-1">
                  Some of your ships are too damaged to continue traveling. Fix
                  them in the shipyard.
                </div>
              </li>
            )}

            {landingTips.includes("NO_CREW") && (
              <li className="flex align-middle gap-4 text-lg">
                <GiBandana className="h-7 w-7 text-primary" />
                <div className="flex-1">You do not have any crew members.</div>
              </li>
            )}

            {landingTips.includes("ANGRY_CREW") && (
              <li className="flex align-middle gap-4 text-lg">
                <GiBandana className="h-7 w-7 text-primary" />
                <div className="flex-1">
                  Your crew is an angry bunch, they do not want to travel with
                  you any more. Make them happy by giving them gold or taking
                  them to the tavern.
                </div>
              </li>
            )}

            {landingTips.includes("CREW_IS_ILL") && (
              <li className="flex align-middle gap-4 text-lg">
                <GiBandana className="h-7 w-7 text-primary" />
                <div className="flex-1">
                  Your crew health is too low, they are too ill to travel. Give
                  them medicine.
                </div>
              </li>
            )}

            {landingTips.includes("NEED_MORE_FOOD") && (
              <li className="flex align-middle gap-4 text-lg">
                <MerchandiseIcon item="food" />
                <div className="flex-1">
                  You will probably need more food in stock in order to make the
                  next journey.
                </div>
              </li>
            )}

            {landingTips.includes("NEED_MORE_WATER") && (
              <li className="flex align-middle gap-4 text-lg">
                <MerchandiseIcon item="water" />
                <div className="flex-1">
                  You will probably need more water in stock in order to make
                  the next journey.
                </div>
              </li>
            )}
          </ul>
        </ParrotBox>
      )}
    </>
  )
}

export default Harbor
