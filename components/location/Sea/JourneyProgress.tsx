import RadialProgressBar from "@/components/RadialProgressBar"
import WeatherIcon from "@/components/WeatherIcon"
import { getCurrentDate } from "@/utils/date"

type Props = {
  journey: Character["journey"]
  day: Character["day"]
}

const JourneyProgress = ({ journey, day }: Props) => {
  if (!journey) return null

  const currentDate = getCurrentDate(day)
  const startPercentage = ((journey.day - 1) / journey.totalDays) * 100
  const percentage = (journey.day / journey.totalDays) * 100

  return (
    <div className="flex items-center gap-2 text-base text-stone-300">
      <RadialProgressBar
        startPercentage={startPercentage}
        percentage={percentage}
        showLabel={false}
        autoStrokeColor={false}
        className="text-info size-12 shrink-0"
      />

      <div className="min-w-0">
        <p className="text-base leading-snug">
          Traveling to {journey.destination}, day {journey.day} of{" "}
          {journey.totalDays}
        </p>

        <div className="mt-1 flex items-center gap-2 text-base">
          <span>{currentDate}</span>
          <WeatherIcon className="text-info size-5 shrink-0" />
        </div>
      </div>
    </div>
  )
}

export default JourneyProgress
