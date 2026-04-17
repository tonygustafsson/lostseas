import { useEffect, useMemo } from "react"

import { SEA_DESCRIPTIONS } from "@/constants/locations"
import { SEA_TRAVEL_SPEED } from "@/constants/sea"
import { useSea } from "@/hooks/queries/useSea"
import { getCurrentDate } from "@/utils/date"
import { getRandomInt } from "@/utils/random"

import RadialProgressBar from "../../RadialProgressBar"
import WeatherIcon from "../../WeatherIcon"

type Props = {
  journey: Character["journey"]
  day: Character["day"]
}

const SeaContent = ({ journey, day }: Props) => {
  const { continueJourney } = useSea()
  const currentDate = getCurrentDate(day)
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
    <>
      <h1 className="mb-4 font-serif text-4xl tracking-wide text-stone-50 lg:text-6xl">
        Open Seas
      </h1>

      <div className="text-sm text-stone-200/90 lg:text-base">
        {journey && (
          <>
            <p className="mb-4 font-serif text-2xl text-stone-100 lg:text-3xl">
              Traveling to {journey?.destination}, day {journey?.day} of{" "}
              {journey?.totalDays}
            </p>

            <p className="mx-auto mb-6 max-w-3xl leading-7">{description}</p>

            <div className="mb-4 flex items-center justify-center gap-6">
              <RadialProgressBar
                startPercentage={
                  ((journey?.day - 1) / journey?.totalDays) * 100
                }
                percentage={(journey?.day / journey?.totalDays) * 100}
                showLabel={false}
                autoStrokeColor={false}
                className="h-16 w-16 text-sky-300"
              />

              <span className="font-serif text-base font-bold text-stone-100 lg:text-xl">
                {currentDate}
              </span>

              <WeatherIcon className="h-10 w-10 text-sky-300" />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default SeaContent
