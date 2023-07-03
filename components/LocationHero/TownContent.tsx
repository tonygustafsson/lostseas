import { LOCATION_DESCRIPTION } from "@/constants/text"
import { getTownsNationality } from "@/utils/townNation"

import Flag from "../icons/Flag"

type Props = {
  town: Character["town"]
  location: Character["location"]
}

const TownContent = ({ town, location }: Props) => {
  const nation = getTownsNationality(town)

  return (
    <>
      <h1 className="font-serif mb-4 text-3xl lg:text-5xl">
        {town}s {location}
      </h1>

      <h2 className="font-serif mb-3 lg:mb-5 text-lg lg:text-2xl flex gap-3 justify-center items-center">
        <Flag nation={nation} className="w-5 h-5 lg:w-7 lg:h-7 opacity-[0.8]" />
        {nation}
      </h2>

      <p className="lg:mb-5 text-sm">{LOCATION_DESCRIPTION[location]}</p>
    </>
  )
}

export default TownContent
