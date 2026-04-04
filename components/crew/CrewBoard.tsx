"use client"

import { MdGroups } from "react-icons/md"

import DismissCrewMembers from "@/components/crew/DismissCrewMembers"
import GiveGold from "@/components/crew/GiveGold"
import GiveMedicine from "@/components/crew/GiveMedicine"
import RadialProgressBar from "@/components/RadialProgressBar"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

export const metadata = {
  title: "Crew",
}

export default function CrewBoard() {
  const { data: player } = useGetPlayer()

  if (!player) {
    return null
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="flex items-center justify-between rounded-md bg-gray-800 p-4">
          <div>
            <div className="text-muted-foreground text-sm">Members</div>
            <div>{player?.crewMembers.count}</div>
          </div>
          <MdGroups className="h-11 w-11 text-yellow-400" />
        </div>

        <div className="flex items-center justify-between rounded-md bg-gray-800 p-4">
          <div>
            <div className="text-muted-foreground text-sm">Health</div>
            <div>{player?.crewMembers.health}%</div>
          </div>
          <RadialProgressBar
            percentage={player?.crewMembers.health}
            className="h-12 w-12"
          />
        </div>

        <div className="flex items-center justify-between rounded-md bg-gray-800 p-4">
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

      <div className="mt-8 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <GiveMedicine />
        <GiveGold />
        <DismissCrewMembers />
      </div>
    </>
  )
}
