import { TOWNS } from "@/constants/locations"
import { getTownsNationality } from "@/utils/location"

import Flag from "../icons/Flag"

type Props = {
  town: Character["town"]
  location: Character["location"]
}

const TownContent = ({ town, location }: Props) => {
  const nation = getTownsNationality(town)
  const description = town && TOWNS[town].descriptions?.[location]

  return (
    <>
      <h1 className="mb-4 font-serif text-3xl lg:text-5xl">The {location}</h1>

      <h2 className="mb-3 flex items-center justify-center gap-3 font-serif text-lg lg:mb-5 lg:text-2xl">
        <Flag nation={nation} className="h-5 w-5 opacity-[0.8] lg:h-7 lg:w-7" />
        {town}, {nation}
      </h2>

      <p className="text-left text-sm lg:mb-5">{description}</p>
    </>
  )
}

export default TownContent
