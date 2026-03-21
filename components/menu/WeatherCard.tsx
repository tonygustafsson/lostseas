import { getCurrentDate } from "@/utils/date"

import { Card, CardContent } from "../ui/card"
import WeatherIcon from "../WeatherIcon"

type Props = {
  day: Character["day"]
}

const WeatherCard = ({ day }: Props) => {
  const currentDate = getCurrentDate(day)

  return (
    <Card size="sm">
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold">{currentDate}</span>
          <WeatherIcon className="text-accent h-8 w-8" />
        </div>
      </CardContent>
    </Card>
  )
}

export default WeatherCard
