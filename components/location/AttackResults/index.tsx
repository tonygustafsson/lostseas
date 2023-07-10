import { useGetPlayer } from "@/hooks/queries/usePlayer"

const ShopBuy = () => {
  const { data: player } = useGetPlayer()

  const successReport = player?.locationStates?.sea?.attackSuccessReport
  const failureReport = player?.locationStates?.sea?.attackFailureReport

  return (
    <>
      <h2 className="text-3xl font-serif mb-4">Report</h2>

      {successReport && (
        <ul className="list-disc list-inside">
          {successReport.lootedGold && (
            <li className="list-item">
              Your looted {successReport.lootedGold} gold.
            </li>
          )}
          {successReport.crewMoodIncrease && (
            <li className="list-item">
              Your crews mood went up with {successReport.crewMoodIncrease}% and
              is now at {successReport.newCrewMood}%.
            </li>
          )}
          {successReport.crewHealthLoss && (
            <li className="list-item">
              Your crew lost {successReport.crewHealthLoss}% health, and now has
              a health of {successReport.newCrewHealth}%.
            </li>
          )}
          {successReport.shipHealthLoss && (
            <li className="list-item">
              Your ships lost {successReport.shipHealthLoss}% health, and now
              has a health of WHAT%.
            </li>
          )}
        </ul>
      )}

      {failureReport && (
        <ul className="list-disc list-inside">
          {failureReport.crewHealthLoss && (
            <li className="list-item">
              Your crew lost {failureReport.crewHealthLoss}% health, and now has
              a health of {failureReport.newCrewHealth}%.
            </li>
          )}
        </ul>
      )}
    </>
  )
}

export default ShopBuy
