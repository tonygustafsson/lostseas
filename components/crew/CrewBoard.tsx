"use client"

import { MdGroups } from "react-icons/md"

import RadialProgressBar from "@/components/RadialProgressBar"
import { Button } from "@/components/ui/button"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

export const metadata = {
  title: "Crew",
}

type Props = {
  onManage: () => void
}

export default function CrewBoard({ onManage }: Props) {
  const { data: player } = useGetPlayer()

  if (!player) {
    return null
  }

  return (
    <>
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

      <Button className="mt-4 w-full" variant="outline" onClick={onManage}>
        Manage Crew
      </Button>
    </>
  )
}
