import { LOCATION_DESCRIPTION } from "@/constants/text"
import { getCurrentDate } from "@/utils/date"

type Props = {
  location: Character["location"]
  journey: Character["journey"]
  day: Character["day"]
}

const SeaContent = ({ location, journey, day }: Props) => (
  <>
    <h1 className="font-serif mb-4 text-3xl lg:text-5xl">Open Seas</h1>

    <p className="lg:mb-5 text-sm">
      {journey?.destination ? (
        <>
          <p>
            Traveling to {journey?.destination}, day {journey?.day} of{" "}
            {journey?.totalDays}
          </p>

          <p>{getCurrentDate(day)}</p>
        </>
      ) : (
        LOCATION_DESCRIPTION[location]
      )}
    </p>
  </>
)

export default SeaContent
