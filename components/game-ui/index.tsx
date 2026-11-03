"use client"

import { useSceneLocation } from "@/hooks/useSceneLocation"

import LocationActions from "./LocationActions"
import LocationScene from "./LocationScene"

const GameUI = () => {
  const { town, location } = useSceneLocation()

  if (!location) return null

  return (
    <div className="[view-transition-name:scene]">
      <LocationScene town={town} location={location} />
      <LocationActions location={location} />
    </div>
  )
}

export default GameUI
