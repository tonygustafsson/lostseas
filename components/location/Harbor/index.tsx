import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { validateJourney } from "@/utils/validateJourney"

const Harbor = () => {
  const { data: player } = useGetPlayer()

  const leaveErrors = player?.locationStates?.harbor?.leaveErrors || false
  const journeyValidation = leaveErrors
    ? validateJourney(player)
    : { success: true, errors: [], neededFood: 0, neededWater: 0 }

  if (leaveErrors) {
    return (
      <div className="flex flex-col">
        <h2 className="text-3xl font-serif text-center text-error mb-4">
          Oops, not ready to leave yet
        </h2>

        <ul className="list-disc">
          {journeyValidation.errors.includes("NO_SHIPS") && (
            <li className="list-item">You do not own any ships.</li>
          )}

          {journeyValidation.errors.includes("NO_CREW") && (
            <li className="list-item">You do not have any crew members.</li>
          )}

          {journeyValidation.errors.includes("ANGRY_CREW") && (
            <li className="list-item">
              Your crew is an angry bunch, they do not want to travel with you
              any more. Make them happy by giving them gold or taking them to
              the tavern.
            </li>
          )}

          {journeyValidation.errors.includes("NO_FOOD") && (
            <li className="list-item">
              You do not have enough food for the journey. You need at least{" "}
              {journeyValidation.neededFood} crates of food.
            </li>
          )}

          {journeyValidation.errors.includes("NO_WATER") && (
            <li className="list-item">
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
