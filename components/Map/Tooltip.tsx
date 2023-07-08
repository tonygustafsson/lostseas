import React from "react-dom/server"

import { TOWN_INFO } from "@/constants/locations"

import Flag from "../icons/Flag"

type Props = {
  townName: Town
  distance?: number
}

const Tooltip = ({ townName, distance }: Props) => {
  const destinationInfo = TOWN_INFO[townName]

  return (
    <div className="tooltip z-50 bg-slate-800 text-white py-1 px-4 flex flex-col items-start">
      <div className="flex items-center gap-2">
        <Flag nation={destinationInfo.nation} className="w-5 h-5" />
        <p>Visit {townName}</p>
      </div>

      <p className="text-sm">Nation: {destinationInfo.nation}</p>

      {distance && <p className="text-sm">Distance: {distance} days</p>}
    </div>
  )
}

export default Tooltip
