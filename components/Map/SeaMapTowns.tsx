"use client"

import Image from "next/image"

import { TOWNS } from "@/constants/locations"

import { MAP_ZOOM, mapColors, TOWN_ANCHOR_SIZE } from "./constants"

const TOWN_SIZE = 12
const TOWN_HIT_PADDING = 6

const towns = Object.keys(TOWNS) as Town[]

type Props = {
  currentTown?: Town
  canSelectTowns: boolean
  onHoverTown: (
    town: Town,
    event: React.PointerEvent<HTMLButtonElement>
  ) => void
  onLeaveTown: () => void
  onFocusTown: (town: Town, event: React.FocusEvent<HTMLButtonElement>) => void
  onSelectTown: (town: Town, event: React.MouseEvent<HTMLButtonElement>) => void
}

// Kept separate so journey updates don't re-render every town marker.
const SeaMapTowns = ({
  currentTown,
  canSelectTowns,
  onHoverTown,
  onLeaveTown,
  onFocusTown,
  onSelectTown,
}: Props) =>
  towns.map((town) => {
    const { x, y, textAlign } = TOWNS[town].map
    const isCurrentTown = town === currentTown
    const canSelectTown = canSelectTowns && !isCurrentTown

    return (
      <button
        key={town}
        type="button"
        disabled={!canSelectTown}
        aria-label={isCurrentTown ? `${town}, current town` : `Sail to ${town}`}
        className="group absolute flex items-center justify-center outline-offset-2 focus-visible:outline-2 enabled:cursor-pointer disabled:pointer-events-none"
        style={{
          left: x - TOWN_HIT_PADDING,
          top: y - TOWN_HIT_PADDING,
          width: TOWN_ANCHOR_SIZE + TOWN_HIT_PADDING * 2,
          height: TOWN_ANCHOR_SIZE + TOWN_HIT_PADDING * 2,
        }}
        onPointerMove={(event) => onHoverTown(town, event)}
        onPointerLeave={onLeaveTown}
        onFocus={(event) => onFocusTown(town, event)}
        onBlur={onLeaveTown}
        onClick={(event) => onSelectTown(town, event)}
      >
        <Image
          src="/img/map/town.svg"
          alt=""
          width={TOWN_SIZE}
          height={TOWN_SIZE}
          style={{ width: TOWN_SIZE, height: TOWN_SIZE }}
          unoptimized
          draggable={false}
          className={
            canSelectTown
              ? "group-hover:scale-110 group-focus-visible:scale-110"
              : undefined
          }
        />

        <span
          className="pointer-events-none absolute font-mono whitespace-nowrap text-white"
          style={{
            left:
              TOWN_HIT_PADDING +
              (textAlign === "right"
                ? 26 / MAP_ZOOM
                : -(town.length * 2) / MAP_ZOOM),
            top: TOWN_HIT_PADDING + (textAlign === "right" ? 6 : 25) / MAP_ZOOM,
            fontSize: 10 / MAP_ZOOM,
            lineHeight: `${12 / MAP_ZOOM}px`,
            backgroundColor: isCurrentTown
              ? mapColors.darkBlue
              : mapColors.black,
            opacity: isCurrentTown ? 0.9 : 0.8,
          }}
        >
          {` ${town} `}
        </span>
      </button>
    )
  })

export default SeaMapTowns
