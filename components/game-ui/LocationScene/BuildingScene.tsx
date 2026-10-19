import Image from "next/image"
import { useRef } from "react"

import { getLocationAmbience, getLocationBackground } from "@/utils/location"

import BackToTown from "./BackToTown"
import BuildingIntro from "./BuildingIntro"
import { createBuildingSceneRenderer } from "./buildingSceneShader"
import { useAmbienceCanvas } from "./useAmbienceCanvas"

type Props = {
  town: Character["town"]
  location: Character["location"]
}

const BuildingScene = ({ town, location }: Props) => {
  const imageRef = useRef<HTMLImageElement>(null)
  const ambience = getLocationAmbience(town, location)
  // Rippling water, drifting clouds, dust and flickering lights
  const ambienceRef = useAmbienceCanvas(
    imageRef,
    createBuildingSceneRenderer,
    ambience && [ambience.water, ambience.sky, ambience.light]
  )

  return (
    <div className="relative grid min-h-88 place-items-center overflow-hidden rounded-b-xl border bg-slate-950 shadow-2xl lg:max-h-125">
      <div className="absolute inset-0 opacity-80">
        <Image
          ref={imageRef}
          src={getLocationBackground(town, location)}
          fill
          priority
          loading="eager"
          draggable={false}
          alt="Background image"
          className="object-cover select-none"
        />

        {ambience && (
          <div
            ref={ambienceRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 motion-reduce:hidden"
          />
        )}
      </div>

      <div className="z-20 flex w-full items-center justify-center px-4 py-10 text-center sm:px-6 lg:px-10 lg:py-30">
        <div className="border-border w-full max-w-3xl rounded-[2rem] border bg-black/55 px-6 py-8 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-[2px] sm:px-8 lg:min-w-[600px] lg:px-14 lg:py-12">
          <BuildingIntro town={town} location={location} />

          <BackToTown />
        </div>
      </div>
    </div>
  )
}

export default BuildingScene
