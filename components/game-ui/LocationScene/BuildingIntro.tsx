import Flag from "@/components/icons/Flag"
import { getBuilding } from "@/constants/townMaps"
import { getTownsNationality } from "@/utils/location"

type Props = {
  town: Character["town"]
  location: Character["location"]
}

const BuildingIntro = ({ town, location }: Props) => {
  const nation = getTownsNationality(town)
  const building = getBuilding(town, location)
  const description = building?.description

  return (
    <>
      <h1 className="mb-4 font-serif text-4xl tracking-wide text-stone-300 lg:text-5xl">
        {building?.name ?? `The ${location}`}
      </h1>

      <h2 className="mb-4 flex items-center justify-center gap-2 font-serif text-xl text-stone-300 lg:text-2xl">
        <Flag nation={nation} className="h-5 w-5 opacity-80 lg:h-7 lg:w-7" />
        {town}, {nation}
      </h2>

      <p className="lg:text-md mx-auto text-center text-sm text-stone-300">
        {description}
      </p>
    </>
  )
}

export default BuildingIntro
