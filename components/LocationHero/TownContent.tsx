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
      <h1 className="mb-4 font-serif text-4xl tracking-wide text-stone-300 lg:text-5xl">
        The {location}
      </h1>

      <h2 className="mb-5 flex items-center justify-center gap-3 font-serif text-xl text-stone-300 lg:text-2xl">
        <Flag nation={nation} className="h-5 w-5 opacity-[0.8] lg:h-7 lg:w-7" />
        {town}, {nation}
      </h2>

      <p className="lg:text-md mx-auto text-center text-sm text-stone-300">
        {description}
      </p>
    </>
  )
}

export default TownContent
