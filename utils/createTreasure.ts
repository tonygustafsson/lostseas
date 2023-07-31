import { TOWNS } from "@/constants/locations"
import { TREASURES } from "@/constants/treasures"

import { getRandomInt } from "./random"

export const createTreasure = () => {
  const randomTreasureIndex = getRandomInt(0, TREASURES.length - 1)
  const treasure = { ...TREASURES[randomTreasureIndex] } as Treasure

  const randomTownIndex = getRandomInt(0, Object.keys(TOWNS).length - 1)
  const randomTown = Object.keys(TOWNS)[randomTownIndex] as Town
  treasure.rewarder = randomTown

  return treasure
}
