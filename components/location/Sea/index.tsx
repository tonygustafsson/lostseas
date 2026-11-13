import { useEffect } from "react"

import { preloadTownMap } from "@/components/game-ui/LocationScene/preloadTownMap"
import SeaMapCanvas from "@/components/Map/SeaMapCanvas"
import { SEA_TRAVEL_SPEED } from "@/constants/sea"
import { getTownMap } from "@/constants/townMaps"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useSea } from "@/hooks/queries/useSea"

import JourneyProgress from "./JourneyProgress"
import SeaEventDialog from "./SeaEventDialog"

const Sea = () => {
  const { data: player } = useGetPlayer()
  const { continueJourney } = useSea()
  const journey = player?.character.journey
  const journeyDay = journey?.day
  const seaState = player?.locationStates?.sea
  const isPaused = !!(
    seaState?.shipMeeting ||
    seaState?.attackSuccessReport ||
    seaState?.attackFailureReport
  )

  // Each day is advanced optimistically, so the timer follows the day and
  // runs alongside the request instead of waiting for it
  useEffect(() => {
    if (!journeyDay || isPaused) {
      return
    }

    const timer = setTimeout(() => continueJourney(), SEA_TRAVEL_SPEED)

    return () => clearTimeout(timer)
  }, [continueJourney, isPaused, journeyDay])

  if (!player || !journey) return null

  // The voyage gives the destination's harbour plenty of time to load
  const destinationMap = getTownMap(journey.destination)

  if (destinationMap) {
    preloadTownMap(destinationMap)
  }

  return (
    <>
      <SeaEventDialog />

      <div className="relative overflow-hidden rounded-xl border border-neutral-700 bg-neutral-700">
        <SeaMapCanvas
          weather={player.character.weather}
          journey={journey}
          isPaused={isPaused}
        />

        <div className="absolute top-4 left-4 z-10 max-w-[calc(100%-2rem)] rounded-lg shadow-lg">
          <JourneyProgress
            journey={journey}
            day={player.character.day}
            weather={player.character.weather}
          />
        </div>
      </div>
    </>
  )
}

export default Sea
