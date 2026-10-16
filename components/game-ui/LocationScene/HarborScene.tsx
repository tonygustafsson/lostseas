import { useState } from "react"
import { RiTreasureMapLine } from "react-icons/ri"

import AdvisorTips from "@/components/advisor/AdvisorTips"
import Flag from "@/components/icons/Flag"
import { Button } from "@/components/ui/button"
import { TOWNS } from "@/constants/locations"
import { getTownMap } from "@/constants/townMaps"
import { useCharacter } from "@/hooks/queries/useCharacter"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useMapModal } from "@/hooks/useMapModal"
import { getHarborArrivedQuip, getHarborTownQuip } from "@/utils/getPirateQuip"
import { getTownsNationality } from "@/utils/location"

import TownMap from "./TownMap"

type Props = {
  town: Character["town"]
}

const HarborScene = ({ town }: Props) => {
  const { move } = useCharacter()
  const { data: player } = useGetPlayer()
  const { showMap, canTravel } = useMapModal()
  const [arrivedQuip] = useState(getHarborArrivedQuip)
  const [townQuip] = useState(getHarborTownQuip)
  const map = getTownMap(town)
  const nation = getTownsNationality(town)
  const hasArrived =
    player?.locationStates?.harbor?.lastHarborReason === "arrived"

  const handleMove = (location: TownLocation) => move({ location })

  return (
    <div className="bg-card overflow-hidden rounded-xl border shadow-2xl">
      {map && (
        <div className="border-gold/40 border-b bg-slate-950">
          <TownMap map={map} alt={`Map of ${town}`} onMove={handleMove} />
        </div>
      )}

      <div className="grid gap-8 px-4 py-8 sm:px-6 lg:grid-cols-5 lg:gap-12 lg:p-12">
        <div className="flex flex-col items-center text-center lg:col-span-3 lg:items-start lg:text-left">
          <p className="text-gold mb-2 text-xs font-semibold tracking-widest uppercase">
            The Harbor
          </p>

          <h1 className="flex items-center gap-4 font-serif text-4xl tracking-wide text-stone-200 lg:text-5xl">
            <Flag nation={nation} className="size-8 opacity-80 lg:size-10" />
            {town}
          </h1>

          <p className="text-muted-foreground mt-1 font-serif text-lg">
            A port of {nation}
          </p>

          <div className="via-gold/50 lg:from-gold/50 my-6 h-px w-32 bg-linear-to-r from-transparent to-transparent" />

          <p className="max-w-prose leading-relaxed text-stone-300">
            {town && TOWNS[town].harborDescription}
          </p>

          <Button
            variant="highlight"
            size="lg"
            onClick={showMap}
            disabled={!canTravel}
            className="mt-8 w-full px-6 font-serif text-lg sm:h-11 sm:w-auto sm:px-14 lg:text-xl"
          >
            <RiTreasureMapLine className="size-5!" />
            Set sail
          </Button>
        </div>

        <div className="lg:col-span-2">
          <AdvisorTips
            heading={hasArrived ? "Land ho!" : "Back in town"}
            title={hasArrived ? arrivedQuip : townQuip}
            showAllClear
          />
        </div>
      </div>
    </div>
  )
}

export default HarborScene
