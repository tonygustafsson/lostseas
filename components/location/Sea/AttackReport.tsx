import { HeartPulse, Smile } from "lucide-react"
import Image from "next/image"
import { useMemo } from "react"
import { FaCoins, FaUsers } from "react-icons/fa"
import { GiOpenedFoodCan, GiShoonerSailboat } from "react-icons/gi"

import MerchandiseIcon from "@/components/MerchandiseIcon"
import TreasureIcon from "@/components/TreasureIcon"
import { MERCHANDISE } from "@/constants/merchandise"
import { TREASURES } from "@/constants/treasures"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { cn } from "@/lib/utils"
import {
  getAttackFailureQuip,
  getAttackSuccessQuip,
} from "@/utils/getPirateQuip"
import { snakeCaseToTitleCase } from "@/utils/string"

import AttackReportItem from "./AttackReportItem"

const AttackReport = () => {
  const { data: player } = useGetPlayer()
  const successReport = player?.locationStates?.sea?.attackSuccessReport
  const failureReport = player?.locationStates?.sea?.attackFailureReport
  const report = successReport || failureReport
  const foundTreasure = successReport?.foundTreasure
  const remainingSupplies = Object.entries(player?.inventory || {}).filter(
    ([item]) => item !== "cannons"
  )

  const quip = useMemo(
    () => (successReport ? getAttackSuccessQuip() : getAttackFailureQuip()),
    [successReport]
  )

  if (!player || !report) return null

  return (
    <>
      <div
        className={cn(
          "flex items-center gap-4 rounded-lg border p-4",
          successReport
            ? "border-success/40 bg-success/15"
            : "border-destructive/40 bg-destructive/15"
        )}
      >
        <Image
          src="/img/parrot.svg"
          alt="Parrot"
          width={100}
          height={100}
          draggable={false}
          className="size-16 shrink-0 select-none"
        />

        <div className="min-w-0">
          <h2
            className={cn(
              "font-serif text-2xl font-bold",
              successReport ? "text-success" : "text-destructive"
            )}
          >
            {successReport ? "Victory!" : "Defeat at sea"}
          </h2>
          <p className="text-muted-foreground mt-1 text-sm leading-snug italic">
            {quip}
          </p>
        </div>
      </div>

      <ul
        className="grid grid-cols-2 gap-2 sm:grid-cols-3"
        aria-label="Battle results"
      >
        {successReport && (
          <>
            {foundTreasure && (
              <AttackReportItem
                variant="success"
                title={foundTreasure.name}
                change="+1 treasure"
                icon={<TreasureIcon item={foundTreasure.name} />}
                className="col-span-2 sm:col-span-3"
              >
                <p>
                  Worth{" "}
                  {
                    TREASURES.find(
                      (treasure) => treasure.name === foundTreasure.name
                    )?.value
                  }{" "}
                  gold · {Object.keys(player.treasures || {}).length}{" "}
                  {Object.keys(player.treasures || {}).length === 1
                    ? "treasure"
                    : "treasures"}{" "}
                  aboard
                </p>
                <p>Bring it to the governor of {foundTreasure.rewarder}.</p>
              </AttackReportItem>
            )}

            {successReport.lootedGold > 0 && (
              <AttackReportItem
                variant="success"
                title="Gold"
                change={`+${successReport.lootedGold}`}
                icon={<FaCoins />}
              >
                {player.character.gold} gold aboard
              </AttackReportItem>
            )}

            {successReport.crewMoodIncrease > 0 && (
              <AttackReportItem
                variant="success"
                title="Crew mood"
                change={`+${successReport.crewMoodIncrease}%`}
                icon={<Smile />}
              >
                {player.crewMembers.mood}% mood now
              </AttackReportItem>
            )}

            {successReport.crewMemberRecruits > 0 && (
              <AttackReportItem
                variant="success"
                title="Crew"
                change={`+${successReport.crewMemberRecruits}`}
                icon={<FaUsers />}
              >
                {player.crewMembers.count} crew aboard
              </AttackReportItem>
            )}

            {Object.entries(successReport.lootedMerchandise || {}).map(
              ([key, value]) => {
                if (value <= 0) return null

                const item = key as keyof Inventory
                const unit =
                  value === 1
                    ? MERCHANDISE[item].singleUnit
                    : MERCHANDISE[item].unit
                const total = player.inventory?.[item] || 0
                const totalUnit =
                  total === 1
                    ? MERCHANDISE[item].singleUnit
                    : MERCHANDISE[item].unit

                return (
                  <AttackReportItem
                    variant="success"
                    key={key}
                    title={item === "repairKits" ? "Repair kits" : item}
                    change={`+${value} ${unit}`}
                    icon={<MerchandiseIcon item={item} />}
                  >
                    {total} {totalUnit} aboard
                  </AttackReportItem>
                )
              }
            )}
          </>
        )}

        {failureReport && (
          <>
            <AttackReportItem
              variant="error"
              title="Gold"
              change="All lost"
              icon={<FaCoins />}
            >
              <p>{player.character.gold} gold aboard</p>
              <p>{player.character.account} gold safe in the bank</p>
            </AttackReportItem>

            {remainingSupplies.map(([key, total]) => {
              const item = key as keyof Inventory
              const unit =
                total === 1
                  ? MERCHANDISE[item].singleUnit
                  : MERCHANDISE[item].unit

              return (
                <AttackReportItem
                  variant="error"
                  key={key}
                  title={snakeCaseToTitleCase(item)}
                  change={`−${Number(failureReport.inventoryPercentageLoss.toFixed(1))}%`}
                  icon={<MerchandiseIcon item={item} />}
                >
                  {total} {unit} remaining
                </AttackReportItem>
              )
            })}

            {!remainingSupplies.length && (
              <AttackReportItem
                variant="error"
                title="Supplies"
                change={`−${Number(failureReport.inventoryPercentageLoss.toFixed(1))}%`}
                icon={<GiOpenedFoodCan />}
              >
                No supplies remaining
              </AttackReportItem>
            )}

            {failureReport.sunkShip && (
              <AttackReportItem
                variant="error"
                title={failureReport.sunkShip}
                change="Sunk"
                icon={<GiShoonerSailboat />}
              >
                {Object.keys(player.ships).length}{" "}
                {Object.keys(player.ships).length === 1 ? "ship" : "ships"}{" "}
                remaining
              </AttackReportItem>
            )}
          </>
        )}

        {report.crewHealthLoss > 0 && (
          <AttackReportItem
            variant="error"
            title="Crew health"
            change={`−${report.crewHealthLoss}%`}
            icon={<HeartPulse />}
          >
            {player.crewMembers.health}% health now
          </AttackReportItem>
        )}

        {report.shipHealthLoss > 0 &&
          Object.values(player.ships).map((ship) => (
            <AttackReportItem
              key={ship.id}
              variant="error"
              title={ship.name}
              change={`−${report.shipHealthLoss}%`}
              icon={<MerchandiseIcon item={ship.type} />}
            >
              {ship.health}% health now · {ship.type}
            </AttackReportItem>
          ))}
      </ul>

      {failureReport && (
        <p className="text-muted-foreground text-xs">
          Your cannons and treasures are safe.
        </p>
      )}
    </>
  )
}

export default AttackReport
