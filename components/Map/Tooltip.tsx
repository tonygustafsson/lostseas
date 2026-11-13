import React from "react"
import { createPortal } from "react-dom"

import { TOWNS } from "@/constants/locations"
import { getDistanceKm, getJourneyLength } from "@/utils/journey"

import Flag from "../icons/Flag"

type Props = {
  currentTown?: Town
  destination?: Town
  /** How many days the player's food and water lasts */
  suppliesDays?: number
  show: boolean
  top?: number
  left?: number
  className?: string
}

const Tooltip = ({
  currentTown,
  destination,
  suppliesDays = Infinity,
  show,
  top = 0,
  left = 0,
  className,
}: Props) => {
  if (!show || !currentTown || !destination) return null

  const destinationInfo = TOWNS[destination]
  const isOtherTown = currentTown !== destination
  const distance = isOtherTown ? getJourneyLength(currentTown, destination) : 0
  const km = getDistanceKm(currentTown, destination)

  return createPortal(
    <div
      className={`bg-popover text-popover-foreground fixed z-50 flex flex-col items-start rounded px-4 py-1 opacity-90 ${className}`}
      style={{
        top,
        left,
      }}
    >
      <div className="flex items-center gap-2">
        <Flag nation={destinationInfo.nation} className="h-6 w-6" />
        <p className="font-bold">{destination}</p>
      </div>

      <p className="text-sm">Nation: {destinationInfo.nation}</p>

      {isOtherTown && (
        <p className="text-sm">
          Distance: {distance} {distance === 1 ? "day" : "days"} (
          {km.toLocaleString("en-GB")} km)
        </p>
      )}

      {distance > suppliesDays && (
        <p className="text-gold text-sm">
          Out of reach: supplies last {suppliesDays} days
        </p>
      )}
    </div>,
    document.body
  )
}

export default Tooltip
