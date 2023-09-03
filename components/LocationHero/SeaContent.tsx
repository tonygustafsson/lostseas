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
      <h1 className="font-serif mb-4 text-3xl lg:text-5xl">Open Seas</h1>

      <div className="lg:mb-5 text-sm">
        {journey && (
          <>
            <p className="text-2xl mb-4 font-serif">
              Traveling to {journey?.destination}, day {journey?.day} of{" "}
              {journey?.totalDays}
            </p>

            <p className="mb-4">{description}</p>

            <div className="flex justify-center items-center gap-6 mb-4">
              <RadialProgressBar
                startPercentage={
                  ((journey?.day - 1) / journey?.totalDays) * 100
                }
                percentage={(journey?.day / journey?.totalDays) * 100}
                showLabel={false}
                autoStrokeColor={false}
                className="w-16 h-16 text-info"
              />

              <span className="font-bold text-base lg:text-xl font-serif">
                {currentDate}
              </span>

              <WeatherIcon className="h-10 w-10 text-info" />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default SeaContent
