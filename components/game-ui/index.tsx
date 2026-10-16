"use client"

import dynamic from "next/dynamic"

import { useSceneLocation } from "@/hooks/useSceneLocation"

const LocationScene = dynamic(() => import("./LocationScene"), { ssr: false })
const LocationActions = dynamic(() => import("./LocationActions"), {
  ssr: false,
})

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
