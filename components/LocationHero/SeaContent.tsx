import { useEffect, useMemo } from "react"

import { SEA_DESCRIPTIONS } from "@/constants/locations"
import { useSea } from "@/hooks/queries/useSea"
import { getCurrentDate } from "@/utils/date"
import { getRandomInt } from "@/utils/random"

import RadialProgressBar from "../RadialProgressBar"
import WeatherIcon from "../WeatherIcon"

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
    if (journey?.ongoingJourney) {
      continueJourney()
    }
  }, [continueJourney, journey?.ongoingJourney])

  return (
    <>
      <h1 className="mb-4 font-serif text-3xl lg:text-5xl">Open Seas</h1>

      <div className="text-sm lg:mb-5">
        {journey && (
          <>
            <p className="mb-4 font-serif text-2xl">
              Traveling to {journey?.destination}, day {journey?.day} of{" "}
              {journey?.totalDays}
            </p>

            <p className="mb-4">{description}</p>

            <div className="mb-4 flex items-center justify-center gap-6">
              <RadialProgressBar
                startPercentage={
                  ((journey?.day - 1) / journey?.totalDays) * 100
                }
                percentage={(journey?.day / journey?.totalDays) * 100}
                showLabel={false}
                autoStrokeColor={false}
                className="text-info h-16 w-16"
              />

              <span className="font-serif text-base font-bold lg:text-xl">
                {currentDate}
              </span>

              <WeatherIcon className="text-info h-10 w-10" />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default SeaContent
