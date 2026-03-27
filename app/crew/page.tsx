import { MdGroups } from "react-icons/md"

import DismissCrewMembers from "@/components/crew/DismissCrewMembers"
import GiveGold from "@/components/crew/GiveGold"
import GiveMedicine from "@/components/crew/GiveMedicine"
import DefaultLayout from "@/components/layouts/default"
import RadialProgressBar from "@/components/RadialProgressBar"
import { getLoggedInPlayer } from "@/utils/app/getLoggedInPlayer"

export const metadata = {
  title: "Crew",
}

export default async function Page() {
  const player = await getLoggedInPlayer()

  if (!player) {
    return <p>Access denied</p>
  }

  return (
    <DefaultLayout>
      <>
        <h1 className="text mb-8 font-serif text-3xl">Crew members</h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex items-center justify-between rounded-md bg-gray-800 p-4">
            <div>
              <div className="text-muted-foreground text-sm">Crew members</div>
              <div className="mt-1 text-2xl font-semibold">
                {player?.crewMembers.count}
              </div>
            </div>
            <MdGroups className="h-11 w-11 text-yellow-400" />
          </div>

          <div className="flex items-center justify-between rounded-md bg-gray-800 p-4">
            <div>
              <div className="text-muted-foreground text-sm">Health</div>
              <div className="mt-1 text-2xl font-semibold">
                {player?.crewMembers.health}%
              </div>
            </div>
            <RadialProgressBar
              percentage={player?.crewMembers.health}
              className="h-12 w-12"
            />
          </div>

          <div className="flex items-center justify-between rounded-md bg-gray-800 p-4">
            <div>
              <div className="text-muted-foreground text-sm">Mood</div>
              <div className="mt-1 text-2xl font-semibold">
                {player?.crewMembers.mood}%
              </div>
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
    </DefaultLayout>
  )
}
