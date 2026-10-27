"use client"

import { GiShoonerSailboat } from "react-icons/gi"
import { MdGroups } from "react-icons/md"

import useDrawer from "@/app/stores/drawer"
import CargoMeter from "@/components/CargoMeter"
import {
  metricsOf,
  type StatisticsSeries,
} from "@/components/charts/chartConfig"
import HoldChart from "@/components/charts/HoldChart"
import StatisticsSeriesChart from "@/components/charts/StatisticsSeriesChart"
import RadialProgressBar from "@/components/RadialProgressBar"
import FittingsList from "@/components/ships/FittingsList"
import ShipList from "@/components/ships/ShipList"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useGetStatistics } from "@/hooks/queries/useStatistics"
import { cn } from "@/lib/utils"
import { getCargo } from "@/utils/cargo"
import { withMetrics } from "@/utils/statistics"

const cannonSeries: StatisticsSeries[] = [
  { metric: "mannedCannons", label: "Manned", color: "var(--gold)" },
  { metric: "cannons", label: "Owned", color: "var(--primary)" },
]

const FleetDrawer = () => {
  const { data: player } = useGetPlayer()

  const { data: stats = [] } = useGetStatistics(player?.id)

  const { open: openDrawer } = useDrawer()

  if (!player) {
    return null
  }

  const cargo = getCargo(player)

  // A chart needs at least two snapshots to draw a line
  const cannonEntries = withMetrics(stats, metricsOf(cannonSeries))

  return (
    <>
      <h1 className="mb-6 flex items-center gap-2 font-serif text-2xl">
        <GiShoonerSailboat className="text-accent" />
        Crew & Fleet
      </h1>

      <span className="my-4 block font-serif text-xl">Ships</span>

      <ShipList />

      <Separator className="my-8" />

      <h2 className="mt-8 mb-4 font-serif text-xl">Equipment</h2>

      <FittingsList />

      {cannonEntries.length >= 2 && (
        <div className="mt-4 flex flex-col gap-4 rounded-lg bg-neutral-900 p-4 shadow-md">
          <p className="text-muted-foreground text-sm">Cannons over time</p>

          <StatisticsSeriesChart
            title="Cannons"
            series={cannonSeries}
            entries={cannonEntries}
          />
        </div>
      )}

      <Separator className="my-8" />

      <span className="my-4 block font-serif text-xl">Crew members</span>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="flex items-center justify-between rounded-md bg-neutral-900 p-4">
          <div>
            <div className="text-muted-foreground text-sm">Members</div>
            <div>{player?.crewMembers.count}</div>
          </div>
          <MdGroups className="text-accent h-11 w-11" />
        </div>

        <div className="flex items-center justify-between rounded-md bg-neutral-900 p-4">
          <div>
            <div className="text-muted-foreground text-sm">Health</div>
            <div>{player?.crewMembers.health}%</div>
          </div>
          <RadialProgressBar
            percentage={player?.crewMembers.health}
            className="h-12 w-12"
          />
        </div>

        <div className="flex items-center justify-between rounded-md bg-neutral-900 p-4">
          <div>
            <div className="text-muted-foreground text-sm">Mood</div>
            <div>{player?.crewMembers.mood}%</div>
          </div>
          <RadialProgressBar
            percentage={player?.crewMembers.mood}
            className="h-12 w-12"
          />
        </div>
      </div>

      <Button
        className="mt-4 w-full"
        variant="outline"
        onClick={() => openDrawer("manageCrew")}
      >
        Manage Crew
      </Button>

      <Separator className="my-8" />

      <h2 className="mt-8 mb-4 font-serif text-xl">Cargo</h2>

      <div className="flex flex-col gap-2 rounded-md bg-neutral-900 p-4">
        <CargoMeter load={cargo.load} capacity={cargo.capacity} />

        <p
          className={cn(
            "text-sm",
            cargo.overload ? "text-destructive" : "text-muted-foreground"
          )}
        >
          {cargo.overload
            ? `Overloaded by ${cargo.overload}. You cannot leave port until you sell goods or buy another ship.`
            : `Room for ${cargo.free} more. Cannons and repair kits take no space.`}
        </p>
      </div>

      {cargo.load > 0 && (
        <div className="mt-4 rounded-md bg-neutral-900 p-4">
          <HoldChart ships={player.ships} inventory={player.inventory} />
        </div>
      )}
    </>
  )
}

export default FleetDrawer
