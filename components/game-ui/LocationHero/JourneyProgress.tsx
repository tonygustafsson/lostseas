import { getCurrentDate } from "@/utils/date"

import RadialProgressBar from "../../RadialProgressBar"
import WeatherIcon from "../../WeatherIcon"

type Props = {
  journey: Character["journey"]
  day: Character["day"]
  titleClass?: string
  compact?: boolean
}

const JourneyProgress = ({
  journey,
  day,
  titleClass,
  compact = false,
}: Props) => {
  if (!journey) return null

  const currentDate = getCurrentDate(day)
  const startPercentage = ((journey.day - 1) / journey.totalDays) * 100
  const percentage = (journey.day / journey.totalDays) * 100

  if (compact) {
    return (
      <div className="flex items-center gap-3 text-base text-stone-100">
        <RadialProgressBar
          startPercentage={startPercentage}
          percentage={percentage}
          showLabel={false}
          autoStrokeColor={false}
          className="size-12 shrink-0 text-sky-300"
        />
        <div className="min-w-0">
          <p className="text-base leading-snug">
            Traveling to {journey.destination}, day {journey.day} of{" "}
            {journey.totalDays}
          </p>
          <div className="mt-1 flex items-center gap-2 text-base">
            <span>{currentDate}</span>
            <WeatherIcon className="size-5 shrink-0 text-sky-300" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <p
        className={`mb-4 font-serif text-2xl text-stone-100 lg:text-3xl ${titleClass}`}
      >
        Traveling to {journey.destination}, day {journey.day} of{" "}
        {journey.totalDays}
      </p>

      <div className="flex items-center justify-center gap-6">
        <RadialProgressBar
          startPercentage={startPercentage}
          percentage={percentage}
          showLabel={false}
          autoStrokeColor={false}
          className="size-12 text-sky-300"
        />

        <span className="text-lg text-stone-100 lg:text-xl">{currentDate}</span>

        <WeatherIcon className="h-10 w-10 text-sky-300" />
      </div>
    </>
  )
}

export default JourneyProgress
