import { cn } from "@/lib/utils"
import { getDateOfDay, getLogDate } from "@/utils/date"
import { WEATHER_NAMES } from "@/utils/weather"

import { Card, CardContent } from "../ui/card"
import WeatherIcon from "../WeatherIcon"

type Props = {
  day: Character["day"]
  weather: Character["weather"]
}

// The oversized backdrop icon is tinted per weather, so the sky reads at a glance
const ICON_COLORS: Record<WeatherType, string> = {
  sunny: "text-gold/30",
  partlySunny: "text-gold/30",
  cloudy: "text-muted-foreground/25",
  rainy: "text-sea/30",
  foggy: "text-parchment/15 blur-[1px]",
}

// Fixed locale so server and client render the same weekday
const getWeekday = (day: Character["day"]) =>
  getDateOfDay(day).toLocaleDateString("en-GB", { weekday: "long" })

const WeatherCard = ({ day, weather }: Props) => (
  <Card className="bg-card relative overflow-hidden p-2">
    <WeatherIcon
      weather={weather}
      className={cn(
        "pointer-events-none absolute -top-4 -right-4 size-28",
        ICON_COLORS[weather]
      )}
    />

    <CardContent className="relative flex min-w-0 flex-col px-2 py-2">
      <span className="text-muted-foreground text-xs tracking-widest uppercase">
        {getWeekday(day)}
      </span>

      <span className="font-serif text-base leading-tight">
        {getLogDate(day)}
      </span>

      <span className="text-parchment font-serif text-sm italic">
        {WEATHER_NAMES[weather]}
      </span>
    </CardContent>
  </Card>
)

export default WeatherCard
