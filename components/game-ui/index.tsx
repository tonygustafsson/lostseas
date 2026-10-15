"use client"

import dynamic from "next/dynamic"

const LocationScene = dynamic(() => import("./LocationScene"), { ssr: false })
const LocationActions = dynamic(() => import("./LocationActions"), {
  ssr: false,
})

const GameUI = () => (
  <>
    <LocationScene />
    <LocationActions />
  </>
)

export default GameUI
