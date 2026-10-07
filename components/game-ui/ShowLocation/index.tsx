import { useEffect } from "react"

import Bank from "@/components/location/Bank"
import Cityhall from "@/components/location/Cityhall"
import Harbor from "@/components/location/Harbor"
import Market from "@/components/location/Market"
import Shipyard from "@/components/location/Shipyard"
import Shop from "@/components/location/Shop"
import Tavern from "@/components/location/Tavern"
import SeaMapCanvas from "@/components/Map/SeaMapCanvas"
import { SEA_TRAVEL_SPEED } from "@/constants/sea"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useSea } from "@/hooks/queries/useSea"

import JourneyProgress from "../LocationHero/JourneyProgress"
import SeaEventDialog from "./SeaEventDialog"

const ShowLocation = () => {
  const { data: player } = useGetPlayer()
  const { continueJourney, isContinueingJourney } = useSea()
  const journey = player?.character.journey
  const isAtSea = player?.character.location === "Sea"
  const seaState = player?.locationStates?.sea
  const isPaused = !!(
    seaState?.shipMeeting ||
    seaState?.attackSuccessReport ||
    seaState?.attackFailureReport
  )

  useEffect(() => {
    if (!isAtSea || !journey || isPaused || isContinueingJourney) return

    const timer = setTimeout(() => continueJourney(), SEA_TRAVEL_SPEED)

    return () => clearTimeout(timer)
  }, [continueJourney, isAtSea, isContinueingJourney, isPaused, journey])

  return (
    <div className="mt-8">
      <SeaEventDialog />

      {player?.character.location === "Shop" && <Shop />}
      {player?.character.location === "Bank" && <Bank />}
      {player?.character.location === "Market" && <Market />}
      {player?.character.location === "Tavern" && <Tavern />}
      {player?.character.location === "City hall" && <Cityhall />}
      {player?.character.location === "Shipyard" && <Shipyard />}
      {player?.character.location === "Harbor" && <Harbor />}

      {isAtSea && journey && (
        <div className="relative mt-8 overflow-hidden rounded-xl border border-neutral-700 bg-neutral-700 first:mt-0">
          <SeaMapCanvas journey={journey} isPaused={isPaused} />
          <div className="absolute top-3 left-3 z-10 max-w-[calc(100%-1.5rem)] rounded-lg border border-white/15 bg-neutral-950/90 px-3 py-2 shadow-lg backdrop-blur-sm">
            <JourneyProgress
              journey={journey}
              day={player.character.day}
              compact
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowLocation
