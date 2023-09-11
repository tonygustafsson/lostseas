import { FaCoins, FaUsers } from "react-icons/fa"
import { GiBandana, GiOpenedFoodCan, GiShoonerSailboat } from "react-icons/gi"

import MerchandiseIcon from "@/components/MerchandiseIcon"
import ParrotBox from "@/components/ParrotBox"
import TreasureIcon from "@/components/TreasureIcon"
import { MERCHANDISE } from "@/constants/merchandise"
import { TREASURES } from "@/constants/treasures"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const AttackReport = () => {
  const { data: player } = useGetPlayer()

  const successReport = player?.locationStates?.sea?.attackSuccessReport
  const failureReport = player?.locationStates?.sea?.attackFailureReport

  return (
    <ParrotBox title={successReport ? "Success, Captain!" : "Yarr, we failed!"}>
      {successReport && (
        <ul className="flex flex-col gap-4">
          {successReport.foundTreasure && (
            <li className="flex align-middle gap-2 text-lg">
              <TreasureIcon
                item={successReport.foundTreasure.name}
                className="h-7 w-7 text-success"
              />
              You found a treasure - the {successReport.foundTreasure.name}.
              Rumors say it&apos;s worth{" "}
              {
                TREASURES.find(
                  (treasure) =>
                    successReport.foundTreasure &&
                    treasure.name === successReport.foundTreasure?.name
                )?.value
              }{" "}
              gold and that the governor of{" "}
              {successReport.foundTreasure.rewarder} is looking for it.
            </li>
          )}

          {successReport.lootedGold && (
            <li className="flex align-middle gap-2 text-lg">
              <FaCoins className="h-7 w-7 text-success" />
              Your looted {successReport.lootedGold} gold and now have a total
              of {player.character.gold} gold.
            </li>
          )}

          {successReport.crewMoodIncrease && (
            <li className="flex align-middle gap-2 text-lg">
              <GiBandana className="h-7 w-7 text-success" />
              Your crews mood went up with {successReport.crewMoodIncrease}% and
              is now at {player.crewMembers.mood}%.
            </li>
          )}

          {!!successReport.crewMemberRecruits && (
            <li className="flex align-middle gap-2 text-lg">
              <FaUsers className="h-7 w-7 text-success" />
              {successReport.crewMemberRecruits} crew members of the enemy ship
              decided to join you, and you now have a total of{" "}
              {player.crewMembers.count} crew members.
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
                    <MerchandiseIcon
                      item={key as keyof Inventory}
                      className="text-success"
                    />
                    {unit === "cannons" && <>You looted {value} cannons.</>}
                    {unit !== "cannons" && (
                      <>
                        You looted {value} {unit && `${unit} of `} {key}.
                      </>
                    )}
                  </li>
                )
              }
            )}

          {successReport.crewHealthLoss && (
            <li className="flex align-middle gap-2 text-lg">
              <GiBandana className="h-7 w-7 text-error" />
              Your crew lost {successReport.crewHealthLoss}% health, and now has
              a health of {player?.crewMembers.health}%.
            </li>
          )}

          {successReport.shipHealthLoss && (
            <li className="flex align-middle gap-2 text-lg">
              <GiShoonerSailboat className="h-7 w-7 text-error" />

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
        </ul>
      )}

      {failureReport && (
        <ul className="flex flex-col gap-4">
          <li className="flex align-middle gap-2 text-lg">
            <FaCoins className="h-7 w-7 text-error" />
            You lost all your gold. (Funds in bank are still safe)
          </li>

          <li className="flex align-middle gap-2 text-lg">
            <GiOpenedFoodCan className="h-7 w-7 text-error" />
            You lost{" "}
            {failureReport.inventoryPercentageLoss === 100
              ? "all"
              : `${failureReport.inventoryPercentageLoss}%`}{" "}
            of your inventory.
          </li>

          {failureReport.crewHealthLoss && (
            <li className="flex align-middle gap-2 text-lg">
              <GiBandana className="h-7 w-7 text-error" />
              Your crew lost {failureReport.crewHealthLoss}% health, and now has
              a health of {player.crewMembers.health}%.
            </li>
          )}

          {failureReport.sunkShip && (
            <li className="flex align-middle gap-2 text-lg">
              <GiShoonerSailboat className="h-7 w-7 text-error" />
              They sunk your ship {failureReport.sunkShip}.
            </li>
          )}

          {failureReport.shipHealthLoss && (
            <li className="flex align-middle gap-2 text-lg">
              <GiShoonerSailboat className="h-7 w-7 text-error" />

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
    </ParrotBox>
  )
}

export default AttackReport
