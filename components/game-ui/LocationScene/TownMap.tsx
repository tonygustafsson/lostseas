import { CSSProperties, Ref, useRef, useState } from "react"

import {
  TOWN_MAP_DESKTOP_MEDIA,
  type TownMap as TownMapData,
  type TownMapBuilding,
} from "@/constants/townMaps"
import { cn } from "@/lib/utils"

import type { AmbienceArrays } from "./ambienceRenderer"
import { getFlagArrays } from "./flagUniforms"
import { useFrontMask } from "./frontMask"
import { getTownMapImageProps } from "./preloadTownMap"
import { createTownMapRenderer } from "./townMapShader"
import { useAmbienceCanvas } from "./useAmbienceCanvas"
import { getWalkerArrays } from "./walkers"
import { WALKER_SHEET } from "./walkSprites"
import { getWalkArrays } from "./walkUniforms"
import { getWeatherAmbience } from "./weatherAmbience"

type PictureProps = {
  map: TownMapData
  alt: string
  className?: string
  style?: CSSProperties
  ref?: Ref<HTMLImageElement>
}

const TownMapPicture = ({ map, alt, className, style, ref }: PictureProps) => {
  const { desktop } = map
  const { desktopProps, mobileProps } = getTownMapImageProps(map, alt)

  return (
    <picture>
      <source
        media={TOWN_MAP_DESKTOP_MEDIA}
        srcSet={desktopProps.srcSet}
        sizes={desktopProps.sizes}
        width={desktop.width}
        height={desktop.height}
      />

      <img
        {...mobileProps}
        ref={ref}
        alt={alt}
        draggable={false}
        className={className}
        style={style}
      />
    </picture>
  )
}

type Props = {
  map: TownMapData
  alt: string
  weather?: WeatherType
  onMove: (location: TownLocation) => void
  // Called when the player is about to pick a building, to load it early
  onPreview?: (location: TownLocation) => void
}

const arraysByTown = new Map<
  string,
  Record<"desktop" | "mobile", AmbienceArrays>
>()

// The map object is new on every call, the town's picture is the same one. A
// stable result keeps the ambience hook from setting the arrays on every render.
const getTownArrays = ({ desktop, mobile }: TownMapData) => {
  const key = desktop.src

  if (!arraysByTown.has(key)) {
    const make = ({ lanes, width, height, flagSprites }: typeof desktop) => ({
      ...getWalkArrays(lanes, width, height),
      ...getFlagArrays(flagSprites),
    })

    arraysByTown.set(key, { desktop: make(desktop), mobile: make(mobile) })
  }

  return arraysByTown.get(key)!
}

const TownMap = ({ map, alt, weather, onMove, onPreview }: Props) => {
  const [highlighted, setHighlighted] = useState<TownMapBuilding | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  // Rippling water, drawn flags, drifting clouds and seagulls, with rain or fog on bad days
  const masks = useFrontMask(map)
  const uniforms = getWeatherAmbience(weather)
  const activity = uniforms?.u_activity ?? 1
  const ambienceRef = useAmbienceCanvas(
    imageRef,
    createTownMapRenderer,
    masks
      ? [masks.water, masks.sky, masks.gloom, masks.front, WALKER_SHEET.url]
      : undefined,
    {
      mobileMasks: [
        masks?.water ?? "",
        masks?.sky ?? "",
        masks?.gloom ?? "",
        masks?.front ?? "",
        WALKER_SHEET.url,
      ],
      uniforms,
      arrays: getTownArrays(map),
      frameArrays: {
        desktop: (time) => getWalkerArrays(time, map.desktop.lanes, activity),
        mobile: (time) => getWalkerArrays(time, map.mobile.lanes, activity),
      },
    }
  )

  const mask = highlighted
    ? `radial-gradient(circle ${highlighted.size / 2}cqw at ${highlighted.x}% ${highlighted.y}%, black 60%, transparent 100%)`
    : undefined

  const handleHighlight = (building: TownMapBuilding) => {
    setHighlighted(building)
    setIsHovering(true)
    onPreview?.(building.location)
  }

  const renderButtons = (buildings: TownMapBuilding[], className: string) =>
    buildings.map((building) => (
      <button
        key={`town-map-building-${className}-${building.location}`}
        type="button"
        aria-label={building.name}
        title={building.name}
        className={cn(
          "focus-visible:ring-ring absolute aspect-square -translate-1/2 cursor-pointer rounded-full outline-none focus-visible:ring-2",
          className
        )}
        style={{
          left: `${building.x}%`,
          top: `${building.y}%`,
          width: `${building.size}%`,
        }}
        onMouseEnter={() => handleHighlight(building)}
        onFocus={() => handleHighlight(building)}
        onBlur={() => setIsHovering(false)}
        onPointerDown={() => onPreview?.(building.location)}
        onClick={() => onMove(building.location)}
      />
    ))

  return (
    <div
      className="@container relative w-full overflow-hidden"
      onMouseLeave={() => setIsHovering(false)}
    >
      <TownMapPicture
        ref={imageRef}
        map={map}
        alt={alt}
        className="h-auto w-full brightness-90 saturate-90 select-none"
      />

      <div aria-hidden>
        <TownMapPicture
          map={map}
          alt=""
          className={cn(
            "pointer-events-none absolute inset-0 size-full opacity-0 brightness-110 saturate-110 transition-opacity duration-300 select-none",
            isHovering && "opacity-100"
          )}
          style={{ maskImage: mask, WebkitMaskImage: mask }}
        />
      </div>

      <div
        ref={ambienceRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 brightness-90 saturate-90 motion-reduce:hidden"
      />

      {renderButtons(map.mobile.buildings, "md:hidden")}
      {renderButtons(map.desktop.buildings, "hidden md:block")}
    </div>
  )
}

export default TownMap
