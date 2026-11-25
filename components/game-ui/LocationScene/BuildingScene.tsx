import { MoveHorizontal, ScrollText } from "lucide-react"
import Image from "next/image"
import { ReactNode, useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { getBuilding } from "@/constants/townMaps"
import { cn } from "@/lib/utils"
import { getLocationBackground } from "@/utils/location"

import BackToTown from "./BackToTown"
import BuildingIntro from "./BuildingIntro"
import {
  createBuildingBackRenderer,
  createBuildingDustRenderer,
} from "./buildingSceneShader"
import { BUILDING_HEIGHT, BUILDING_WIDTH } from "./lightMask"
import { useAmbienceCanvas } from "./useAmbienceCanvas"
import { useBuildingMasks } from "./useBuildingMasks"
import { usePanScene } from "./usePanScene"
import { getWeatherAmbience } from "./weatherAmbience"

export type HiddenPart = "water" | "sky" | "dust" | "beams" | "fire" | "intro"

type Props = {
  town: Character["town"]
  location: Character["location"]
  weather?: WeatherType
  // For the story, to look at the parts of the ambience one by one
  hide?: HiddenPart[]
}

// As wide as the whole picture, at least the width of the scene, and as high
const PanLayer = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => (
  <div
    data-pan-layer
    style={{ aspectRatio: `${BUILDING_WIDTH} / ${BUILDING_HEIGHT}` }}
    className={cn("absolute top-0 left-0 h-full min-w-full", className)}
  >
    {children}
  </div>
)

const BuildingScene = ({ town, location, weather, hide }: Props) => {
  const [expanded, setExpanded] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const { rootRef, panRef, canPan, hasPanned, handlers } = usePanScene()
  const hasDescription = !!getBuilding(town, location)?.description
  const masks = useBuildingMasks(town, location)
  const isHidden = (part: HiddenPart) => (hide?.includes(part) ? 1 : 0)
  const weatherAmbience = getWeatherAmbience(weather)
  const uniforms = weatherAmbience && {
    ...weatherAmbience,
    u_hideWater: isHidden("water"),
    u_hideSky: isHidden("sky"),
    u_hideDust: isHidden("dust"),
    u_hideBeams: isHidden("beams"),
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
  // Measured on the box when the card or scene changes size, not on every
  // frame, as reading the layout that often can force the browser to redo it.
  // The canvas pans under the card, so the pan is added on every frame.
  const cardRect = useRef([0, 0, 0, 0])
  const getCardArray = () => {
    const [x, y, width, height] = cardRect.current

    return {
      u_card: {
        size: 4 as const,
        values: [x + panRef.current, y, width, height],
      },
    }
  }
  const dustRef = useAmbienceCanvas(
    imageRef,
    createBuildingDustRenderer,
    masks,
    {
      uniforms,
      frameArrays: { desktop: getCardArray },
    }
  )

  const introHidden = isHidden("intro")

  useEffect(() => {
    const card = cardRef.current
    const scene = rootRef.current

    if (!card || !scene) {
      cardRect.current = [0, 0, 0, 0]

      return
    }

    const measure = () => {
      const c = card.getBoundingClientRect()
      const s = scene.getBoundingClientRect()

      cardRect.current = [c.x - s.x, c.y - s.y, c.width, c.height]
    }
    const observer = new ResizeObserver(measure)

    observer.observe(card)
    observer.observe(scene)
    measure()

    return () => observer.disconnect()
  }, [rootRef, introHidden, town])

  return (
    <div
      ref={rootRef}
      {...handlers}
      className="bg-background relative flex min-h-[75dvh] touch-pan-y flex-col justify-end overflow-hidden rounded-xl border lg:min-h-130"
    >
      {/* The layers are as wide as the picture, wider than a phone, and pan together */}
      <PanLayer>
        <div className="motion-safe:animate-settle absolute inset-0 opacity-80">
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
      </PanLayer>

      {town && (
        <PanLayer className="pointer-events-none z-30">
          <div
            ref={dustRef}
            aria-hidden
            className="motion-safe:animate-settle absolute inset-0 motion-reduce:hidden"
          />
        </PanLayer>
      )}

      {canPan && (
        <div
          aria-hidden
          className={cn(
            "text-parchment pointer-events-none absolute inset-x-0 top-4 z-20 flex justify-center transition-opacity duration-500",
            hasPanned && "opacity-0"
          )}
        >
          <div className="flex items-center gap-2 rounded-full bg-black/35 px-4 py-1 text-sm backdrop-blur-[2px]">
            <MoveHorizontal className="size-4" />
            Swipe to look around
          </div>
        </div>
      )}

      {!introHidden && (
        <div className="z-20 flex w-full justify-center px-4 pb-4 text-center sm:px-6 sm:pb-6 lg:px-12 lg:pb-8">
          <div
            ref={cardRef}
            className="border-border w-full max-w-3xl rounded-3xl border bg-black/35 px-6 py-6 backdrop-blur-[2px] backdrop-brightness-75 backdrop-saturate-50 sm:px-8 lg:max-w-2xl lg:px-16 xl:min-w-150"
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
