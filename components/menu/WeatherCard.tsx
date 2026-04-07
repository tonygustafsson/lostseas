import { getCurrentDate } from "@/utils/date"

import { Card, CardContent } from "../ui/card"
import WeatherIcon from "../WeatherIcon"

type Props = {
  day: Character["day"]
}

const WeatherCard = ({ day }: Props) => {
  const currentDate = getCurrentDate(day)

  return (
    <Card className="bg-neutral-900 p-2">
      <CardContent className="px-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold">{currentDate}</span>
          <WeatherIcon className="text-accent size-6" />
        </div>
      </CardContent>
    </Card>
  )
}

export default WeatherCard
