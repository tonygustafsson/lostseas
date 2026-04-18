import { useEffect, useMemo } from "react"

import { SEA_DESCRIPTIONS } from "@/constants/locations"
import { SEA_TRAVEL_SPEED } from "@/constants/sea"
import { useSea } from "@/hooks/queries/useSea"
import { getRandomInt } from "@/utils/random"

import JourneyProgress from "./JourneyProgress"

type Props = {
  journey: Character["journey"]
  day: Character["day"]
}

const SeaContent = ({ journey, day }: Props) => {
  const { continueJourney } = useSea()

  const description = useMemo(
    () => SEA_DESCRIPTIONS[getRandomInt(0, SEA_DESCRIPTIONS.length - 1)],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [day]
  )

  useEffect(() => {
    if (!journey?.ongoingJourney) return

    const timer = setTimeout(() => continueJourney(), SEA_TRAVEL_SPEED)

    return () => clearTimeout(timer)
  }, [continueJourney, journey?.ongoingJourney])

  return (
    <div className="text-sm text-stone-200/90 lg:text-base">
      {journey && (
        <>
          <JourneyProgress
            journey={journey}
            day={day}
            titleClass="text-3xl! lg:text-4xl!"
          />

          <p className="mx-auto mt-4 max-w-3xl leading-7">{description}</p>
        </>
      )}
    </div>
  )
}

export default SeaContent
