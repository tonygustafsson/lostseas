import { FaUsers } from "react-icons/fa"
import {
  GiBandana,
  GiCoins,
  GiOpenedFoodCan,
  GiShoonerSailboat,
} from "react-icons/gi"

import MerchandiseIcon from "@/components/MerchandiseIcon"
import { MERCHANDISE } from "@/constants/merchandise"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const AttackReport = () => {
  const { data: player } = useGetPlayer()

  const successReport = player?.locationStates?.sea?.attackSuccessReport
  const failureReport = player?.locationStates?.sea?.attackFailureReport

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-serif mb-4">Report</h2>

      {successReport && (
        <ul className="flex flex-col gap-2">
          {successReport.lootedGold && (
            <li className="flex align-middle gap-2 text-lg">
              <GiCoins className="h-7 w-7 text-primary" />
              Your looted {successReport.lootedGold} gold and now have a total
              of {player.character.gold} gold.
            </li>
          )}

          {successReport.crewMoodIncrease && (
            <li className="flex align-middle gap-2 text-lg">
              <GiBandana className="h-7 w-7 text-primary" />
              Your crews mood went up with {successReport.crewMoodIncrease}% and
              is now at {player.crewMembers.mood}%.
            </li>
          )}

          {successReport.crewHealthLoss && (
            <li className="flex align-middle gap-2 text-lg">
              <GiBandana className="h-7 w-7 text-primary" />
              Your crew lost {successReport.crewHealthLoss}% health, and now has
              a health of {player?.crewMembers.health}%.
            </li>
          )}

          {!!successReport.crewMemberRecruits && (
            <li className="flex align-middle gap-2 text-lg">
              <FaUsers className="h-7 w-7 text-primary" />
              {successReport.crewMemberRecruits} crew members of the enemy ship
              decided to join you, and you now have a total of{" "}
              {player.crewMembers.count} crew members.
            </li>
          )}

          {successReport.shipHealthLoss && (
            <li className="flex align-middle gap-2 text-lg">
              <GiShoonerSailboat className="h-7 w-7 text-primary" />

              <div>
                Your ships lost {successReport.shipHealthLoss}% health. Your
                ships now have the health of
                <ul className="list-decimal list-inside">
                  {Object.entries(player?.ships).map(
                    ([shipId, { name, health, type }]) => (
                      <li key={shipId} className="list-item">
                        {name} ({type}): {health}%
                      </li>
                    )
                  )}
                </ul>
              </div>
            </li>
          )}

          {successReport.lootedMerchandise &&
            Object.entries(successReport.lootedMerchandise).map(
              ([key, value]) => {
                const unit =
                  value === 1
                    ? MERCHANDISE[key as keyof Inventory].singleUnit
                    : MERCHANDISE[key as keyof Inventory].unit

                return (
                  <li
                    className="flex align-middle gap-2 text-lg"
                    key={`looted-merchandise-report-${key}`}
                  >
                    <MerchandiseIcon item={key as keyof Inventory} />
                    You looted {value} {unit && `${unit} of `} {key}.{" "}
                  </li>
                )
              }
            )}
        </ul>
      )}

      {failureReport && (
        <ul className="flex flex-col gap-2">
          <li className="flex align-middle gap-2 text-lg">
            <GiCoins className="h-7 w-7 text-primary" />
            You lost all your gold. (Funds in bank are still safe)
          </li>

          <li className="flex align-middle gap-2 text-lg">
            <GiOpenedFoodCan className="h-7 w-7 text-primary" />
            You lost{" "}
            {failureReport.inventoryPercentageLoss === 100
              ? "all"
              : `${failureReport.inventoryPercentageLoss}%`}{" "}
            of your inventory.
          </li>

          {failureReport.crewHealthLoss && (
            <li className="flex align-middle gap-2 text-lg">
              <GiBandana className="h-7 w-7 text-primary" />
              Your crew lost {failureReport.crewHealthLoss}% health, and now has
              a health of {player.crewMembers.health}%.
            </li>
          )}

          {failureReport.sunkShip && (
            <li className="flex align-middle gap-2 text-lg">
              <GiShoonerSailboat className="h-7 w-7 text-primary" />
              They sunk your ship {failureReport.sunkShip}.
            </li>
          )}

          {failureReport.shipHealthLoss && (
            <li className="flex align-middle gap-2 text-lg">
              <GiShoonerSailboat className="h-7 w-7 text-primary" />

              <div>
                Your ships lost {failureReport.shipHealthLoss}% health. Your
                ships now have the health of
                <ul className="list-decimal list-inside">
                  {Object.entries(player?.ships).map(
                    ([shipId, { name, health, type }]) => (
                      <li key={shipId} className="list-item">
                        {name} ({type}): {health}%
                      </li>
                    )
                  )}
                </ul>
              </div>
            </li>
          )}
        </ul>
      )}
    </div>
  )
}

export default AttackReport
