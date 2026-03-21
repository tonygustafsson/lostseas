import { getCurrentDate } from "@/utils/date"

import WeatherIcon from "../WeatherIcon"

type Props = {
  day: Character["day"]
}

const WeatherCard = ({ day }: Props) => {
  const currentDate = getCurrentDate(day)

  return (
    <div className="card mt-4 w-full rounded-md bg-gray-800 shadow-lg">
      <div className="card-body p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold">{currentDate}</span>
          <WeatherIcon className="text-secondary h-8 w-8" />
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
