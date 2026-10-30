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
    <div className="relative grid min-h-88 place-items-center overflow-hidden rounded-xl border bg-neutral-950">
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

      <div className="z-20 flex w-full items-center justify-center px-4 py-12 text-center sm:px-6 lg:px-12 lg:py-32">
        <div className="border-border w-full max-w-3xl rounded-3xl border bg-black/55 px-6 py-12 backdrop-blur-xs sm:px-8 lg:min-w-150 lg:px-16 lg:py-6">
          <BuildingIntro town={town} location={location} />

          <BackToTown />
        </div>
      </div>
    </div>
  )
}

export default BuildingScene
