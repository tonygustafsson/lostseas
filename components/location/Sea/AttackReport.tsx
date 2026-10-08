import Image from "next/image"
import { useMemo } from "react"
import { FaCoins, FaUsers } from "react-icons/fa"
import { GiBandana, GiOpenedFoodCan, GiShoonerSailboat } from "react-icons/gi"

import AdvisorTipItem from "@/components/advisor/AdvisorTipItem"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import TreasureIcon from "@/components/TreasureIcon"
import { MERCHANDISE } from "@/constants/merchandise"
import { TREASURES } from "@/constants/treasures"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import {
  getAttackFailureQuip,
  getAttackSuccessQuip,
} from "@/utils/getPirateQuip"

const AttackReport = () => {
  const { data: player } = useGetPlayer()
  const successReport = player?.locationStates?.sea?.attackSuccessReport
  const failureReport = player?.locationStates?.sea?.attackFailureReport
  const report = successReport || failureReport
  const foundTreasure = successReport?.foundTreasure

  const quip = useMemo(
    () => (successReport ? getAttackSuccessQuip() : getAttackFailureQuip()),
    [successReport]
  )

  if (!player || !report) return null

  return (
    <>
      <div className="flex items-center gap-2">
        <Image
          src="/img/parrot.svg"
          alt="Parrot"
          width={100}
          height={100}
          draggable={false}
          className="size-8 shrink-0 select-none"
        />

        <div>
          <h2 className="font-serif text-lg font-bold">
            {successReport ? "Victory" : "Defeat"}
          </h2>
          <p className="text-muted-foreground text-sm leading-snug italic">
            {quip}
          </p>
        </div>
      </div>

      <ul className="flex flex-col gap-1">
        {successReport && (
          <>
            {foundTreasure && (
              <AdvisorTipItem
                variant="success"
                icon={<TreasureIcon item={foundTreasure.name} />}
              >
                Found {foundTreasure.name}: worth{" "}
                {
                  TREASURES.find(
                    (treasure) => treasure.name === foundTreasure.name
                  )?.value
                }{" "}
                gold. Bring it to the governor of {foundTreasure.rewarder}.
              </AdvisorTipItem>
            )}

            {successReport.lootedGold > 0 && (
              <AdvisorTipItem variant="success" icon={<FaCoins />}>
                +{successReport.lootedGold} gold · {player.character.gold} total
              </AdvisorTipItem>
            )}

            {successReport.crewMoodIncrease > 0 && (
              <AdvisorTipItem variant="success" icon={<GiBandana />}>
                Crew mood +{successReport.crewMoodIncrease} ·{" "}
                {player.crewMembers.mood}% now
              </AdvisorTipItem>
            )}

            {successReport.crewMemberRecruits > 0 && (
              <AdvisorTipItem variant="success" icon={<FaUsers />}>
                +{successReport.crewMemberRecruits} crew ·{" "}
                {player.crewMembers.count} total
              </AdvisorTipItem>
            )}

            {Object.entries(successReport.lootedMerchandise || {}).map(
              ([key, value]) => {
                if (value <= 0) return null

                const item = key as keyof Inventory
                const unit =
                  value === 1
                    ? MERCHANDISE[item].singleUnit
                    : MERCHANDISE[item].unit

                return (
                  <AdvisorTipItem
                    variant="success"
                    key={key}
                    icon={<MerchandiseIcon item={item} />}
                  >
                    +{value}{" "}
                    {item === "cannons"
                      ? unit
                      : `${unit} ${unit ? "of " : ""}${item === "repairKits" ? "repair kits" : item}`}
                  </AdvisorTipItem>
                )
              }
            )}
          </>
        )}

        {failureReport && (
          <>
            <AdvisorTipItem variant="error" icon={<FaCoins />}>
              All carried gold lost · Bank savings safe
            </AdvisorTipItem>

            <AdvisorTipItem variant="error" icon={<GiOpenedFoodCan />}>
              {failureReport.inventoryPercentageLoss === 100
                ? "All inventory lost"
                : `${failureReport.inventoryPercentageLoss}% of inventory lost`}
            </AdvisorTipItem>

            {failureReport.sunkShip && (
              <AdvisorTipItem variant="error" icon={<GiShoonerSailboat />}>
                Ship sunk: {failureReport.sunkShip}
              </AdvisorTipItem>
            )}
          </>
        )}

        {report.crewHealthLoss > 0 && (
          <AdvisorTipItem variant="error" icon={<GiBandana />}>
            Crew health −{report.crewHealthLoss} · {player.crewMembers.health}%
            now
          </AdvisorTipItem>
        )}

        {report.shipHealthLoss > 0 && (
          <AdvisorTipItem variant="error" icon={<GiShoonerSailboat />}>
            Ship health −{report.shipHealthLoss}
            {Object.keys(player.ships).length > 0 && (
              <span className="block text-xs">
                {Object.values(player.ships)
                  .map((ship) => `${ship.name} (${ship.type}) ${ship.health}%`)
                  .join(" · ")}
              </span>
            )}
          </AdvisorTipItem>
        )}
      </ul>
    </>
  )
}

export default AttackReport
