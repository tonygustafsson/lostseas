import { getCurrentDate } from "@/utils/date"

import WeatherIcon from "../WeatherIcon"

type Props = {
  day: Character["day"]
}

const WeatherCard = ({ day }: Props) => {
  const currentDate = getCurrentDate(day)

  return (
    <div className="card w-full bg-gray-800 shadow-lg mt-4 rounded-md">
      <div className="card-body px-6 py-4">
        <div className="flex items-center justify-between">
          <span className="font-bold text-sm">{currentDate}</span>
          <WeatherIcon className="h-8 w-8 text-secondary" />
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
