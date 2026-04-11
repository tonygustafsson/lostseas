import { m as motion } from "framer-motion"
import Image from "next/image"
import { FaCoins, FaUsers } from "react-icons/fa"
import { GiBandana, GiOpenedFoodCan, GiShoonerSailboat } from "react-icons/gi"

import AdvisorTipItem from "@/components/advisor/AdvisorTipItem"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import TreasureIcon from "@/components/TreasureIcon"
import { MERCHANDISE } from "@/constants/merchandise"
import { TREASURES } from "@/constants/treasures"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const AttackReport = () => {
  const { data: player } = useGetPlayer()

  const successReport = player?.locationStates?.sea?.attackSuccessReport
  const failureReport = player?.locationStates?.sea?.attackFailureReport

  return (
    <>
      <div className="flex items-start gap-2">
        <Image
          src="/img/parrot.svg"
          alt="Parrot"
          width={100}
          height={100}
          draggable={false}
          className="mx-4 mt-1 shrink-0 select-none"
        />

        <motion.div
          initial={{ translateX: -50, opacity: 0, scale: 0 }}
          animate={{ translateX: [-50, 0], opacity: [0, 1], scale: [0, 1] }}
          className="max-w-full"
        >
          {successReport ? "Success, Captain!" : "Yarr, we failed!"}
        </motion.div>
      </div>

      {successReport && (
        <ul className="flex flex-col gap-4">
          {successReport.foundTreasure && (
            <AdvisorTipItem
              variant="success"
              icon={
                <TreasureIcon
                  item={successReport.foundTreasure.name}
                  className="h-7 w-7"
                />
              }
            >
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
            </AdvisorTipItem>
          )}

          {successReport.lootedGold && (
            <AdvisorTipItem
              variant="success"
              icon={<FaCoins className="h-7 w-7" />}
            >
              Your looted {successReport.lootedGold} gold and now have a total
              of {player.character.gold} gold.
            </AdvisorTipItem>
          )}

          {successReport.crewMoodIncrease && (
            <AdvisorTipItem
              variant="success"
              icon={<GiBandana className="h-7 w-7" />}
            >
              Your crews mood went up with {successReport.crewMoodIncrease}% and
              is now at {player.crewMembers.mood}%.
            </AdvisorTipItem>
          )}

          {!!successReport.crewMemberRecruits && (
            <AdvisorTipItem
              variant="success"
              icon={<FaUsers className="h-7 w-7" />}
            >
              {successReport.crewMemberRecruits} crew members of the enemy ship
              decided to join you, and you now have a total of{" "}
              {player.crewMembers.count} crew members.
            </AdvisorTipItem>
          )}

          {successReport.lootedMerchandise &&
            Object.entries(successReport.lootedMerchandise).map(
              ([key, value]) => {
                const unit =
                  value === 1
                    ? MERCHANDISE[key as keyof Inventory].singleUnit
                    : MERCHANDISE[key as keyof Inventory].unit

                return (
                  <AdvisorTipItem
                    variant="success"
                    key={`looted-merchandise-report-${key}`}
                    icon={<MerchandiseIcon item={key as keyof Inventory} />}
                  >
                    {unit === "cannons" && <>You looted {value} cannons.</>}
                    {unit !== "cannons" && (
                      <>
                        You looted {value} {unit && `${unit} of `} {key}.
                      </>
                    )}
                  </AdvisorTipItem>
                )
              }
            )}

          {successReport.crewHealthLoss && (
            <AdvisorTipItem
              variant="error"
              icon={<GiBandana className="h-7 w-7" />}
            >
              Your crew lost {successReport.crewHealthLoss}% health, and now has
              a health of {player?.crewMembers.health}%.
            </AdvisorTipItem>
          )}

          {successReport.shipHealthLoss && (
            <AdvisorTipItem
              variant="error"
              icon={<GiShoonerSailboat className="h-7 w-7" />}
            >
              Your ships lost {successReport.shipHealthLoss}% health. Your ships
              now have the health of
              <ul className="list-inside list-decimal">
                {Object.entries(player?.ships).map(
                  ([shipId, { name, health, type }]) => (
                    <li key={shipId} className="list-item">
                      {name} ({type}): {health}%
                    </li>
                  )
                )}
              </ul>
            </AdvisorTipItem>
          )}
        </ul>
      )}

      {failureReport && (
        <ul className="flex flex-col gap-4">
          <AdvisorTipItem
            variant="error"
            icon={<FaCoins className="h-7 w-7" />}
          >
            You lost all your gold. (Funds in bank are still safe)
          </AdvisorTipItem>

          <AdvisorTipItem
            variant="error"
            icon={<GiOpenedFoodCan className="h-7 w-7" />}
          >
            You lost{" "}
            {failureReport.inventoryPercentageLoss === 100
              ? "all"
              : `${failureReport.inventoryPercentageLoss}%`}{" "}
            of your inventory.
          </AdvisorTipItem>

          {failureReport.crewHealthLoss && (
            <AdvisorTipItem
              variant="error"
              icon={<GiBandana className="h-7 w-7" />}
            >
              Your crew lost {failureReport.crewHealthLoss}% health, and now has
              a health of {player.crewMembers.health}%.
            </AdvisorTipItem>
          )}

          {failureReport.sunkShip && (
            <AdvisorTipItem
              variant="error"
              icon={<GiShoonerSailboat className="h-7 w-7" />}
            >
              They sunk your ship {failureReport.sunkShip}.
            </AdvisorTipItem>
          )}

          {failureReport.shipHealthLoss && (
            <AdvisorTipItem
              variant="error"
              icon={<GiShoonerSailboat className="h-7 w-7" />}
            >
              Your ships lost {failureReport.shipHealthLoss}% health. Your ships
              now have the health of
              <ul className="list-inside list-decimal">
                {Object.entries(player?.ships).map(
                  ([shipId, { name, health, type }]) => (
                    <li key={shipId} className="list-item">
                      {name} ({type}): {health}%
                    </li>
                  )
                )}
              </ul>
            </AdvisorTipItem>
          )}
        </ul>
      )}
    </>
  )
}

export default AttackReport
