import Image from "next/image"
import { useState } from "react"

import type { TownMapImage } from "@/constants/townMaps"
import { cn } from "@/lib/utils"

type Props = {
  image: TownMapImage
  alt: string
  className?: string
  onMove: (location: TownLocation) => void
}

const TownMap = ({ image, alt, className, onMove }: Props) => {
  const [hovered, setHovered] = useState<TownLocation | null>(null)
  const { src, width, height, buildings } = image

  return (
    <div
      className={cn(
        "[container-type:inline-size] relative w-full overflow-hidden",
        className
      )}
      onMouseLeave={() => setHovered(null)}
    >
      <Image
        src={src}
        width={width}
        height={height}
        draggable={false}
        alt={alt}
        className="w-full brightness-90 saturate-90 select-none"
      />

      {buildings.map(({ location: key, x, y, size }) => {
        const mask = `radial-gradient(circle ${size / 2}cqw at ${x}% ${y}%, black 60%, transparent 100%)`

        return (
          <Image
            key={`town-map-highlight-${key}`}
            src={src}
            fill
            draggable={false}
            alt=""
            aria-hidden
            className={cn(
              "pointer-events-none opacity-0 brightness-110 saturate-110 transition-opacity duration-300 select-none",
              hovered === key && "opacity-100"
            )}
            style={{ maskImage: mask, WebkitMaskImage: mask }}
          />
        )
      })}

      {buildings.map(({ location: key, name, x, y, size }) => (
        <button
          key={`town-map-building-${key}`}
          type="button"
          aria-label={name}
          title={name}
          className="focus-visible:ring-ring absolute aspect-square -translate-1/2 cursor-pointer rounded-full outline-none focus-visible:ring-2"
          style={{ left: `${x}%`, top: `${y}%`, width: `${size}%` }}
          onMouseEnter={() => setHovered(key)}
          onFocus={() => setHovered(key)}
          onBlur={() => setHovered(null)}
          onClick={() => onMove(key)}
        />
      ))}
    </div>
  )
}

export default TownMap
