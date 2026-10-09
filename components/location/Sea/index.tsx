import { useEffect } from "react"

import SeaMapCanvas from "@/components/Map/SeaMapCanvas"
import { SEA_TRAVEL_SPEED } from "@/constants/sea"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useSea } from "@/hooks/queries/useSea"

import JourneyProgress from "./JourneyProgress"
import SeaEventDialog from "./SeaEventDialog"

const Sea = () => {
  const { data: player } = useGetPlayer()
  const { continueJourney, isContinueingJourney } = useSea()
  const journey = player?.character.journey
  const seaState = player?.locationStates?.sea
  const isPaused = !!(
    seaState?.shipMeeting ||
    seaState?.attackSuccessReport ||
    seaState?.attackFailureReport
  )

  useEffect(() => {
    if (!journey || isPaused || isContinueingJourney) return

    const timer = setTimeout(() => continueJourney(), SEA_TRAVEL_SPEED)

    return () => clearTimeout(timer)
  }, [continueJourney, isContinueingJourney, isPaused, journey])

  if (!player || !journey) return null

  return (
    <>
      <SeaEventDialog />

      <div className="relative overflow-hidden rounded-xl border border-neutral-700 bg-neutral-700">
        <SeaMapCanvas journey={journey} isPaused={isPaused} />

        <div className="absolute top-3 left-3 z-10 max-w-[calc(100%-1.5rem)] rounded-lg border border-white/15 bg-neutral-950/90 px-3 py-2 shadow-lg backdrop-blur-sm">
          <JourneyProgress journey={journey} day={player.character.day} />
        </div>
      </div>
    </>
  )
}

export default Sea
