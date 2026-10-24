"use client"

import { GiShoonerSailboat } from "react-icons/gi"
import { MdGroups } from "react-icons/md"

import useDrawer from "@/app/stores/drawer"
import CargoMeter from "@/components/CargoMeter"
import RadialProgressBar from "@/components/RadialProgressBar"
import FittingsList from "@/components/ships/FittingsList"
import ShipList from "@/components/ships/ShipList"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { cn } from "@/lib/utils"
import { getCargo } from "@/utils/cargo"

const FleetDrawer = () => {
  const { data: player } = useGetPlayer()

  const { open: openDrawer } = useDrawer()

  if (!player) {
    return null
  }

  const cargo = getCargo(player)

  return (
    <>
      <h1 className="mb-6 flex items-center gap-2 font-serif text-2xl">
        <GiShoonerSailboat className="text-accent" />
        Crew & Fleet
      </h1>

      <span className="my-4 block font-serif text-xl">Ships</span>

      <ShipList />

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

      <Separator className="my-8" />

      <h2 className="mt-8 mb-4 font-serif text-xl">Equipment</h2>
      <FittingsList />

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
    </>
  )
}

export default FleetDrawer
