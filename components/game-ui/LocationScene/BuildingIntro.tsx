import Flag from "@/components/icons/Flag"
import { getBuilding } from "@/constants/townMaps"
import { cn } from "@/lib/utils"
import { getTownsNationality } from "@/utils/location"
import { getTownName } from "@/utils/location"
import { getNationName } from "@/utils/location"

type Props = {
  town: Character["town"]
  location: Character["location"]
  expanded?: boolean
}

const BuildingIntro = ({ town, location, expanded = false }: Props) => {
  const nation = getTownsNationality(town)
  const building = getBuilding(town, location)
  const description = building?.description

  return (
    <>
      <h1 className="text-parchment mb-4 font-serif text-3xl tracking-wide lg:text-5xl">
        {building?.name ?? `The ${location}`}
      </h1>

      <h2
        className={cn(
          "text-parchment flex items-center justify-center gap-2 font-serif text-xl transition-[margin] duration-300 motion-reduce:transition-none lg:text-2xl",
          expanded && "mb-4"
        )}
      >
        <Flag nation={nation} className="h-5 w-5 opacity-80 lg:h-7 lg:w-7" />
        {getTownName(town)}, {nation && getNationName(nation)}
      </h2>

      {/* Grid row animates from 0 to its content height, so the card grows upwards */}
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <p className="lg:text-md text-parchment/80 overflow-hidden text-left text-sm">
          {description}
        </p>
      </div>
    </>
  )
}

export default BuildingIntro
