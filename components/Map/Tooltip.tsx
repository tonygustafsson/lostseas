import { createPortal } from "react-dom"
import React from "react-dom/server"

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
      className={`fixed z-50 rounded opacity-90 bg-slate-800 text-white py-1 px-4 flex flex-col items-start ${className}`}
      style={{
        top,
        left,
      }}
    >
      <div className="flex items-center gap-2">
        <Flag nation={destinationInfo.nation} className="w-6 h-6" />
        <p className="font-bold">{destination}</p>
      </div>

      <p className="text-sm">Nation: {destinationInfo.nation}</p>

      {distance !== 0 && <p className="text-sm">Distance: {distance} days</p>}
    </div>,
    document.body
  )
}

export default Tooltip
