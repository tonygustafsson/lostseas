import { ScrollText } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { getBuilding } from "@/constants/townMaps"
import { getLocationBackground, getLocationFires } from "@/utils/location"

import BackToTown from "./BackToTown"
import BuildingIntro from "./BuildingIntro"
import {
  createBuildingBackRenderer,
  createBuildingDustRenderer,
  MAX_FIRES,
} from "./buildingSceneShader"
import { useAmbienceCanvas } from "./useAmbienceCanvas"
import { useBuildingMasks } from "./useBuildingMasks"
import { getWeatherAmbience } from "./weatherAmbience"

export type HiddenPart = "water" | "sky" | "dust" | "fire" | "intro"

type Props = {
  town: Character["town"]
  location: Character["location"]
  weather?: WeatherType
  // For the story, to look at the parts of the ambience one by one
  hide?: HiddenPart[]
}

const BuildingScene = ({ town, location, weather, hide }: Props) => {
  const [expanded, setExpanded] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const hasDescription = !!getBuilding(town, location)?.description
  const masks = useBuildingMasks(town, location)
  const isHidden = (part: HiddenPart) => (hide?.includes(part) ? 1 : 0)
  const weatherAmbience = getWeatherAmbience(weather)
  const uniforms = weatherAmbience && {
    ...weatherAmbience,
    u_hideWater: isHidden("water"),
    u_hideSky: isHidden("sky"),
    u_hideDust: isHidden("dust"),
    u_hideFire: isHidden("fire"),
  }
  // Rippling water, the weather and gulls outside, dust and flickering lights
  const ambienceRef = useAmbienceCanvas(
    imageRef,
    createBuildingBackRenderer,
    masks,
    { uniforms }
  )
  // The dust drifts over the intro card as well, dimmer there
  const cardRef = useRef<HTMLDivElement>(null)
  // Fires heat the border of the card, padded as the shader has fixed slots
  const getFireArray = () => {
    const values = new Array(MAX_FIRES * 4).fill(0)

    getLocationFires(town, location)
      .slice(0, MAX_FIRES)
      .forEach(([x, y, radius], i) => values.splice(i * 4, 3, x, y, radius))

    return { u_fires: { size: 4 as const, values } }
  }
  const getCardArray = () => {
    const card = cardRef.current?.getBoundingClientRect()
    const scene = dustRef.current?.getBoundingClientRect()

    return {
      u_card: {
        size: 4 as const,
        values:
          card && scene
            ? [card.x - scene.x, card.y - scene.y, card.width, card.height]
            : [0, 0, 0, 0],
      },
    }
  }
  const dustRef = useAmbienceCanvas(
    imageRef,
    createBuildingDustRenderer,
    masks,
    {
      uniforms,
      arrays: { desktop: getFireArray() },
      frameArrays: { desktop: getCardArray },
    }
  )

  return (
    <div className="bg-background relative flex min-h-[80vh] flex-col justify-end overflow-hidden rounded-xl border lg:min-h-120">
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

        {town && (
          <div
            ref={ambienceRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 motion-reduce:hidden"
          />
        )}
      </div>

      {town && (
        <div
          ref={dustRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30 motion-reduce:hidden"
        />
      )}

      {!isHidden("intro") && (
        <div className="z-20 flex w-full justify-center px-4 pb-4 text-center sm:px-6 sm:pb-6 lg:px-12 lg:pb-8">
          <div
            ref={cardRef}
            className="border-border w-full max-w-3xl rounded-3xl border bg-black/35 px-6 py-6 backdrop-blur-[2px] backdrop-brightness-75 backdrop-saturate-50 sm:px-8 lg:max-w-2xl lg:min-w-150 lg:px-16"
          >
            <BuildingIntro
              town={town}
              location={location}
              expanded={expanded}
            />

            <BackToTown>
              {hasDescription && (
                <Button
                  variant="secondary"
                  size="icon-lg"
                  className="aria-expanded:bg-sea aria-expanded:text-foreground size-11"
                  aria-label="Description"
                  aria-expanded={expanded}
                  onClick={() => setExpanded(!expanded)}
                >
                  <ScrollText />
                </Button>
              )}
            </BackToTown>
          </div>
        </div>
      )}
    </div>
  )
}

export default BuildingScene
