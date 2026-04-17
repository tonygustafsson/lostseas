import { getCurrentDate } from "@/utils/date"

import RadialProgressBar from "../../RadialProgressBar"
import WeatherIcon from "../../WeatherIcon"

type Props = {
  journey: Character["journey"]
  day: Character["day"]
  titleClass?: string
}

const JourneyProgress = ({ journey, day, titleClass }: Props) => {
  if (!journey) return null

  const currentDate = getCurrentDate(day)

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
          startPercentage={((journey.day - 1) / journey.totalDays) * 100}
          percentage={(journey.day / journey.totalDays) * 100}
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
