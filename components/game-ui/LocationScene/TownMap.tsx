import Image from "next/image"
import { useState } from "react"

import type { TownMapBuilding, TownMapImage } from "@/constants/townMaps"
import { cn } from "@/lib/utils"

type Props = {
  image: TownMapImage
  alt: string
  className?: string
  onMove: (location: TownLocation) => void
}

const TownMap = ({ image, alt, className, onMove }: Props) => {
  const [highlighted, setHighlighted] = useState<TownMapBuilding | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const { src, width, height, buildings } = image

  const mask = highlighted
    ? `radial-gradient(circle ${highlighted.size / 2}cqw at ${highlighted.x}% ${highlighted.y}%, black 60%, transparent 100%)`
    : undefined

  const handleHighlight = (building: TownMapBuilding) => {
    setHighlighted(building)
    setIsHovering(true)
  }

  return (
    <div
      className={cn(
        "[container-type:inline-size] relative w-full overflow-hidden",
        className
      )}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Image
        src={src}
        width={width}
        height={height}
        sizes="100vw"
        draggable={false}
        alt={alt}
        className="w-full brightness-90 saturate-90 select-none"
      />

      <Image
        src={src}
        fill
        sizes="100vw"
        draggable={false}
        alt=""
        aria-hidden
        className={cn(
          "pointer-events-none opacity-0 brightness-110 saturate-110 transition-opacity duration-300 select-none",
          isHovering && "opacity-100"
        )}
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      />

      {buildings.map((building) => (
        <button
          key={`town-map-building-${building.location}`}
          type="button"
          aria-label={building.name}
          title={building.name}
          className="focus-visible:ring-ring absolute aspect-square -translate-1/2 cursor-pointer rounded-full outline-none focus-visible:ring-2"
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
      ))}
    </div>
  )
}

export default TownMap
