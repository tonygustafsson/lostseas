import React from "react"
import { createPortal } from "react-dom"

import { TOWNS } from "@/constants/locations"

import Flag from "../icons/Flag"

type Props = {
  currentTown?: Town
  destination?: Town
  show: boolean
  top?: number
  left?: number
  className?: string
}

const Tooltip = ({
  currentTown,
  destination,
  show,
  top = 0,
  left = 0,
  className,
}: Props) => {
  if (!show || !currentTown || !destination) return null

  const currentTownInfo = TOWNS[currentTown]
  const destinationInfo = TOWNS[destination]
  const distance = currentTownInfo.map.distanceTo[destination] || 0

  return createPortal(
    <div
      className={`fixed z-50 flex flex-col items-start rounded bg-slate-800 px-4 py-1 text-white opacity-90 ${className}`}
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

      {distance !== 0 && <p className="text-sm">Distance: {distance} days</p>}
    </div>,
    document.body
  )
}

export default Tooltip
