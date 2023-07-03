import { LOCATION_DESCRIPTION } from "@/constants/text"
import { getCurrentDate } from "@/utils/date"

import RadialProgressBar from "../RadialProgressBar"
import WeatherIcon from "../WeatherIcon"

type Props = {
  location: Character["location"]
  journey: Character["journey"]
  day: Character["day"]
}

const SeaContent = ({ location, journey, day }: Props) => {
  const currentDate = getCurrentDate(day)

  return (
    <>
      <h1 className="font-serif mb-4 text-3xl lg:text-5xl">Open Seas</h1>

      <div className="lg:mb-5 text-sm">
        {journey ? (
          <>
            <p className="text-2xl mb-4 font-serif">
              Traveling to {journey?.destination}, day {journey?.day} of{" "}
              {journey?.totalDays}
            </p>

            <div className="flex justify-center items-center gap-3 mb-4">
              <RadialProgressBar
                startPercentage={
                  ((journey?.day - 1) / journey?.totalDays) * 100
                }
                percentage={(journey?.day / journey?.totalDays) * 100}
                showLabel={false}
                autoStrokeColor={false}
                className="w-16 h-16 text-info"
              />
              <div className="card">
                <div className="card-body px-6 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-bold text-xl font-serif">
                      {currentDate}
                    </span>
                    <WeatherIcon className="h-8 w-8 text-info" />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          LOCATION_DESCRIPTION[location]
        )}
      </div>
    </>
  )
}

export default SeaContent
