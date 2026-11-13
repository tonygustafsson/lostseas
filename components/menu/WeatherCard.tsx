import { getDateOfDay, getLogDate } from "@/utils/date"
import { WEATHER_NAMES } from "@/utils/weather"

import { Card, CardContent } from "../ui/card"
import WeatherIcon from "../WeatherIcon"

type Props = {
  day: Character["day"]
  weather: Character["weather"]
}

// Fixed locale so server and client render the same weekday
const getWeekday = (day: Character["day"]) =>
  getDateOfDay(day).toLocaleDateString("en-GB", { weekday: "long" })

const WeatherCard = ({ day, weather }: Props) => (
  <Card className="bg-card p-2">
    <CardContent className="flex items-center gap-4 px-2 py-2">
      <div className="border-sea/40 bg-sea/10 flex size-10 shrink-0 items-center justify-center rounded-full border">
        <WeatherIcon weather={weather} className="text-parchment size-6" />
      </div>

      <div className="flex min-w-0 flex-col">
        <span className="text-muted-foreground text-xs tracking-widest uppercase">
          {getWeekday(day)}
        </span>

        <span className="font-serif text-base leading-tight">
          {getLogDate(day)}
        </span>

        <span className="text-parchment/80 font-serif text-sm italic">
          {WEATHER_NAMES[weather]}
        </span>
      </div>
    </CardContent>
  </Card>
)

export default WeatherCard
