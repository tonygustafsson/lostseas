import Flag from "@/components/icons/Flag"
import RadialProgressBar from "@/components/RadialProgressBar"
import WeatherIcon from "@/components/WeatherIcon"
import { TOWNS } from "@/constants/locations"
import { getLogDate } from "@/utils/date"

type Props = {
  journey: Character["journey"]
  day: Character["day"]
}

const JourneyProgress = ({ journey, day }: Props) => {
  if (!journey) return null

  const startPercentage = ((journey.day - 1) / journey.totalDays) * 100
  const percentage = (journey.day / journey.totalDays) * 100

  return (
    <div className="border-gold/40 bg-background/90 flex items-center gap-4 rounded-lg border px-4 py-2 backdrop-blur-sm">
      <div className="relative size-12 shrink-0">
        <RadialProgressBar
          startPercentage={startPercentage}
          percentage={percentage}
          showLabel={false}
          autoStrokeColor={false}
          className="text-gold size-12"
        />

        <Flag
          nation={TOWNS[journey.destination].nation}
          size={20}
          decorative
          className="absolute inset-0 m-auto"
        />
      </div>

      <div className="flex min-w-0 flex-col gap-1">
        <p className="text-gold text-xs tracking-widest uppercase">
          Sailing to
        </p>

        <h2 className="font-serif text-lg leading-tight">
          {journey.destination}
        </h2>

        <p className="text-muted-foreground text-sm">
          Day {journey.day} of {journey.totalDays}
        </p>

        <p className="text-muted-foreground flex items-center gap-2 font-serif text-sm italic">
          {getLogDate(day)}
          <WeatherIcon className="text-gold size-4 shrink-0" />
        </p>
      </div>
    </div>
  )
}

export default JourneyProgress
