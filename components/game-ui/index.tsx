"use client"

import dynamic from "next/dynamic"

const LocationHero = dynamic(() => import("./LocationHero"), { ssr: false })
const ShowLocation = dynamic(() => import("./ShowLocation"), { ssr: false })

const GameUI = () => (
  <>
    <LocationHero />
    <ShowLocation />
  </>
)

export default GameUI
