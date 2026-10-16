import { getImageProps } from "next/image"
import { CSSProperties, Ref, useRef, useState } from "react"

import {
  TOWN_MAP_DESKTOP_MEDIA,
  type TownMap as TownMapData,
  type TownMapBuilding,
} from "@/constants/townMaps"
import { cn } from "@/lib/utils"

import { useTownMapAmbience } from "./useTownMapAmbience"

type PictureProps = {
  map: TownMapData
  alt: string
  className?: string
  style?: CSSProperties
  ref?: Ref<HTMLImageElement>
}

const TownMapPicture = ({ map, alt, className, style, ref }: PictureProps) => {
  const { desktop, mobile } = map

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    src: desktop.src,
    width: desktop.width,
    height: desktop.height,
    sizes: "100vw",
    alt,
  })

  const { props: mobileProps } = getImageProps({
    src: mobile.src,
    width: mobile.width,
    height: mobile.height,
    sizes: "100vw",
    loading: "eager",
    fetchPriority: "high",
    alt,
  })

  return (
    <picture>
      <source
        media={TOWN_MAP_DESKTOP_MEDIA}
        srcSet={desktopSrcSet}
        sizes="100vw"
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
  onMove: (location: TownLocation) => void
}

const TownMap = ({ map, alt, onMove }: Props) => {
  const [highlighted, setHighlighted] = useState<TownMapBuilding | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const ambienceRef = useTownMapAmbience(map, imageRef)

  const mask = highlighted
    ? `radial-gradient(circle ${highlighted.size / 2}cqw at ${highlighted.x}% ${highlighted.y}%, black 60%, transparent 100%)`
    : undefined

  const handleHighlight = (building: TownMapBuilding) => {
    setHighlighted(building)
    setIsHovering(true)
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
