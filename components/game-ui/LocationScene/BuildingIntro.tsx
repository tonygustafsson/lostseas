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
      <h1 className="text-parchment mb-2 font-serif text-3xl tracking-wide lg:mb-4 lg:text-5xl">
        {building?.name ?? `The ${location}`}
      </h1>

      <h2
        className={cn(
          "text-parchment font-serif text-xl transition-[margin] duration-300 motion-reduce:transition-none lg:text-2xl",
          expanded && "mb-4"
        )}
      >
        {/* On desktop the flag hangs outside the text so the text stays centred */}
        <span className="relative inline-flex items-center gap-2 lg:inline">
          <Flag
            nation={nation}
            className="h-5 w-5 opacity-80 lg:absolute lg:top-1/2 lg:right-full lg:mr-2 lg:h-7 lg:w-7 lg:-translate-y-1/2"
          />
          {getTownName(town)}, {nation && getNationName(nation)}
        </span>
      </h2>

      {/* Grid row animates from 0 to its content height, so the card grows upwards */}
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <p
          inert={!expanded}
          className="lg:text-md text-parchment/80 overflow-hidden text-left text-sm"
        >
          {description}
        </p>
      </div>
    </>
  )
}

export default BuildingIntro
