import { Fragment } from "react"

import { MERCHANDISE } from "@/constants/merchandise"
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
              Your looted {successReport.lootedGold} gold and now have a total
              of {player.character.gold} gold.
            </li>
          )}

          {successReport.lootedMerchandise && (
            <li className="list-item">
              You also looted{" "}
              {Object.entries(successReport.lootedMerchandise).map(
                ([key, value]) => {
                  const unit =
                    value === 1
                      ? MERCHANDISE[key as keyof Inventory].singleUnit
                      : MERCHANDISE[key as keyof Inventory].unit

                  return (
                    <Fragment key={`looted-merchandise-report-${key}`}>
                      {value} {unit && `${unit} of `} {key}.{" "}
                    </Fragment>
                  )
                }
              )}
            </li>
          )}

          {successReport.crewMoodIncrease && (
            <li className="list-item">
              Your crews mood went up with {successReport.crewMoodIncrease}% and
              is now at {player.crewMembers.mood}%.
            </li>
          )}

          {successReport.crewHealthLoss && (
            <li className="list-item">
              Your crew lost {successReport.crewHealthLoss}% health, and now has
              a health of {player?.crewMembers.health}%.
            </li>
          )}

          {!!successReport.crewMemberRecruits && (
            <li className="list-item">
              {successReport.crewMemberRecruits} crew members of the enemy ship
              decided to join you, and you now have a total of{" "}
              {player.crewMembers.count} crew members.
            </li>
          )}

          {successReport.shipHealthLoss && (
            <li className="list-item">
              Your ships lost {successReport.shipHealthLoss}% health. Your ships
              now have the health of
              <ul className="list-decimal list-inside">
                {Object.entries(player?.ships).map(
                  ([shipId, { name, health, type }]) => (
                    <li key={shipId} className="list-item indent-6">
                      {name} ({type}): {health}%
                    </li>
                  )
                )}
              </ul>
            </li>
          )}
        </ul>
      )}

      {failureReport && (
        <ul className="list-disc list-inside">
          <li className="list-item">
            You lost all your gold. (Funds in bank are still safe)
          </li>

          {failureReport.crewHealthLoss && (
            <li className="list-item">
              Your crew lost {failureReport.crewHealthLoss}% health, and now has
              a health of {player.crewMembers.health}%.
            </li>
          )}
        </ul>
      )}
    </>
  )
}

export default ShopBuy
