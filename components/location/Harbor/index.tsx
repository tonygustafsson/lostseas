import Image from "next/image"
import { GiBandana, GiCoins, GiShoonerSailboat } from "react-icons/gi"

import MerchandiseIcon from "@/components/MerchandiseIcon"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const Harbor = () => {
  const { data: player } = useGetPlayer()

  const journeyValidation = player?.locationStates?.harbor?.journeyValidation
  const landingTips = player?.locationStates?.harbor?.landingTips

  if (journeyValidation && !journeyValidation.success) {
    return (
      <>
        <div className="flex">
          <Image
            src="/img/parrot.webp"
            alt="Parrot"
            width={100}
            height={57}
            draggable={false}
            className="mx-6 opacity-80 select-none"
          />

          <div className="chat chat-start">
            <div className="chat-bubble bg-slate-600">
              Yarr, not ready to leave yet.
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-gray-900 rounded-lg p-6">
          <ul className="flex flex-col gap-2">
            {journeyValidation.errors.includes("NO_SHIPS") && (
              <li className="flex align-middle gap-2 text-lg">
                <GiShoonerSailboat className="h-7 w-7 text-primary" />
                You do not own any ships.
              </li>
            )}

            {journeyValidation.errors.includes("DAMAGED_SHIPS") && (
              <li className="flex align-middle gap-2 text-lg">
                <GiShoonerSailboat className="h-7 w-7 text-primary" />
                Some of your ships are too damaged to continue traveling. Fix
                them in the shipyard.
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

            {journeyValidation.errors.includes("CREW_IS_ILL") && (
              <li className="flex align-middle gap-2 text-lg">
                <GiBandana className="h-7 w-7 text-primary" />
                Your crew health is too low, they are too ill to travel. Give
                them medicine.
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
      </>
    )
  }

  if (landingTips) {
    return (
      <>
        <div className="flex">
          <Image
            src="/img/parrot.webp"
            alt="Parrot"
            width={100}
            height={57}
            draggable={false}
            className="mx-6 opacity-80 select-none"
          />

          <div className="chat chat-start">
            <div className="chat-bubble bg-slate-600">Heads up!</div>
          </div>
        </div>

        <div className="flex flex-col bg-gray-900 rounded-lg p-6">
          <ul className="flex flex-col gap-2">
            {landingTips.includes("TOO_MUCH_GOLD") && (
              <li className="flex align-middle gap-2 text-lg">
                <GiCoins className="h-7 w-7 text-primary" />
                You are carrying {player.character.gold} gold, it would be wise
                to spend it on something useful or save it in the bank so you
                won&apos;t loose it if you are defeated at sea.
              </li>
            )}

            {landingTips.includes("DAMAGED_SHIPS") && (
              <li className="flex align-middle gap-2 text-lg">
                <GiShoonerSailboat className="h-7 w-7 text-primary" />
                Some of your ships are too damaged to continue traveling. Fix
                them in the shipyard.
              </li>
            )}

            {landingTips.includes("NO_CREW") && (
              <li className="flex align-middle gap-2 text-lg">
                <GiBandana className="h-7 w-7 text-primary" />
                You do not have any crew members.
              </li>
            )}

            {landingTips.includes("ANGRY_CREW") && (
              <li className="flex align-middle gap-2 text-lg">
                <GiBandana className="h-7 w-7 text-primary" />
                Your crew is an angry bunch, they do not want to travel with you
                any more. Make them happy by giving them gold or taking them to
                the tavern.
              </li>
            )}

            {landingTips.includes("CREW_IS_ILL") && (
              <li className="flex align-middle gap-2 text-lg">
                <GiBandana className="h-7 w-7 text-primary" />
                Your crew health is too low, they are too ill to travel. Give
                them medicine.
              </li>
            )}

            {landingTips.includes("NEED_MORE_FOOD") && (
              <li className="flex align-middle gap-2 text-lg">
                <MerchandiseIcon item="food" />
                You will probably need more food in stock in order to make the
                next journey.
              </li>
            )}

            {landingTips.includes("NEED_MORE_WATER") && (
              <li className="flex align-middle gap-2 text-lg">
                <MerchandiseIcon item="water" />
                You will probably need more water in stock in order to make the
                next journey.
              </li>
            )}
          </ul>
        </div>
      </>
    )
  }

  return null
}

export default Harbor
