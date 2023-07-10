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
          {successReport.crewHealthLoss && (
            <li className="list-item">
              Your crew lost {successReport.crewHealthLoss}% health, and now has
              a health of {successReport.newCrewHealth}%
            </li>
          )}
        </ul>
      )}

      {failureReport && (
        <ul className="list-disc list-inside">
          {failureReport.crewHealthLoss && (
            <li className="list-item">
              Your crew lost {failureReport.crewHealthLoss}% health, and now has
              a health of {failureReport.newCrewHealth}%
            </li>
          )}
        </ul>
      )}
    </>
  )
}

export default ShopBuy
