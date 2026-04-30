"use client"

import { GiShoonerSailboat } from "react-icons/gi"
import { MdGroups } from "react-icons/md"

import useDrawer from "@/app/stores/drawer"
import RadialProgressBar from "@/components/RadialProgressBar"
import FittingsList from "@/components/ships/FittingsList"
import ShipList from "@/components/ships/ShipList"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const FleetDrawer = () => {
  const { data: player } = useGetPlayer()

  const { open: openDrawer } = useDrawer()

  if (!player) {
    return null
  }

  return (
    <>
      <h1 className="mb-6 flex items-center gap-2 font-serif text-2xl">
        <GiShoonerSailboat className="text-yellow-400" />
        Crew & Fleet
      </h1>

      <span className="my-4 block font-serif text-xl">Ships</span>
      <ShipList />

      <Separator className="my-8" />

      <h2 className="mt-8 mb-4 font-serif text-xl">Ship fittings</h2>
      <FittingsList />

      <Separator className="my-8" />

      <span className="my-4 block font-serif text-xl">Crew members</span>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="flex items-center justify-between rounded-md bg-neutral-900 p-4">
          <div>
            <div className="text-muted-foreground text-sm">Members</div>
            <div>{player?.crewMembers.count}</div>
          </div>
          <MdGroups className="h-11 w-11 text-yellow-400" />
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
