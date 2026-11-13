"use client"

import Image from "next/image"

import Flag from "@/components/icons/Flag"
import { TOWNS } from "@/constants/locations"
import { cn } from "@/lib/utils"
import { getJourneyLength } from "@/utils/journey"

import {
  MAP_ZOOM,
  mapColorVariables,
  TOWN_ANCHOR_SIZE,
  TOWN_ICON_SIZE as TOWN_SIZE,
  TOWN_IMAGE_HEIGHT,
  TOWN_IMAGE_WIDTH,
} from "./constants"

const TOWN_HIT_PADDING = 6
const FLAG_SIZE = 8
const LABEL_FONT_SIZE = 11 / MAP_ZOOM
const LABEL_LINE_HEIGHT = 13 / MAP_ZOOM
const LABEL_PADDING_X = 3
const LABEL_PADDING_Y = 1
const LABEL_HEIGHT = LABEL_LINE_HEIGHT + LABEL_PADDING_Y * 2
const LABEL_GAP = 2
// Where the icon's bottom and right edges are inside the button
const ICON_EDGE = TOWN_HIT_PADDING + TOWN_SIZE

const towns = Object.keys(TOWNS) as Town[]

type Props = {
  currentTown?: Town
  suppliesDays?: number
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
  suppliesDays = Infinity,
  canSelectTowns,
  onHoverTown,
  onLeaveTown,
  onFocusTown,
  onSelectTown,
}: Props) =>
  towns.map((town) => {
    const { x, y, textAlign } = TOWNS[town].map
    // The town stands on its location, the bottom of the icon touches it
    const location = {
      x: x + TOWN_ANCHOR_SIZE / 2,
      y: y + TOWN_ANCHOR_SIZE / 2,
    }
    const isCurrentTown = town === currentTown
    const canSelectTown = canSelectTowns && !isCurrentTown
    const distance =
      currentTown && !isCurrentTown ? getJourneyLength(currentTown, town) : 0
    const isOutOfReach = distance > suppliesDays

    return (
      <button
        key={town}
        type="button"
        disabled={!canSelectTown}
        aria-label={isCurrentTown ? `${town}, current town` : `Sail to ${town}`}
        className="group absolute flex items-center justify-center outline-offset-2 focus-visible:outline-2 enabled:cursor-pointer disabled:pointer-events-none"
        style={{
          left: location.x - TOWN_SIZE / 2 - TOWN_HIT_PADDING,
          top: location.y - TOWN_SIZE - TOWN_HIT_PADDING,
          width: TOWN_SIZE + TOWN_HIT_PADDING * 2,
          height: TOWN_SIZE + TOWN_HIT_PADDING * 2,
        }}
        onPointerMove={(event) => onHoverTown(town, event)}
        onPointerLeave={onLeaveTown}
        onFocus={(event) => onFocusTown(town, event)}
        onBlur={onLeaveTown}
        onClick={(event) => onSelectTown(town, event)}
      >
        <Image
          src="/img/map/town.png"
          alt=""
          width={TOWN_IMAGE_WIDTH}
          height={TOWN_IMAGE_HEIGHT}
          style={{ width: TOWN_SIZE, height: TOWN_SIZE }}
          draggable={false}
          className={cn(
            // Not quite square, so it stands on the bottom unstretched
            "origin-bottom object-contain object-bottom",
            canSelectTown &&
              "group-hover:scale-110 group-focus-visible:scale-110",
            isOutOfReach && "brightness-75"
          )}
        />

        <span
          className={cn(
            "pointer-events-none absolute flex items-center gap-0.5 whitespace-nowrap text-white",
            // Centred under the icon, whatever the length of the name
            textAlign !== "right" && "left-1/2 -translate-x-1/2",
            // Dark text, since white is hard to read on the light grey label
            isOutOfReach && !isCurrentTown && "text-background"
          )}
          style={{
            left: textAlign === "right" ? ICON_EDGE + LABEL_GAP : undefined,
            top:
              textAlign === "right"
                ? TOWN_HIT_PADDING + (TOWN_SIZE - LABEL_HEIGHT) / 2
                : ICON_EDGE + LABEL_GAP,
            fontSize: LABEL_FONT_SIZE,
            lineHeight: `${LABEL_LINE_HEIGHT}px`,
            padding: `${LABEL_PADDING_Y}px ${LABEL_PADDING_X}px`,
            backgroundColor: `var(${
              isCurrentTown
                ? mapColorVariables.currentTownLabel
                : isOutOfReach
                  ? mapColorVariables.outOfReachTownLabel
                  : mapColorVariables.townLabel
            })`,
            opacity: isCurrentTown ? 0.9 : 0.8,
          }}
        >
          <Flag
            nation={TOWNS[town].nation}
            size={FLAG_SIZE}
            decorative
            className="shrink-0"
          />
          {town}
        </span>
      </button>
    )
  })

export default SeaMapTowns
