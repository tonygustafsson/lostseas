import { TOWNS } from "@/constants/locations"
import { TREASURES } from "@/constants/treasures"

import { getRandomInt } from "./random"

export const createTreasure = () => {
  const id = crypto.randomUUID()

  const randomTreasureIndex = getRandomInt(0, TREASURES.length - 1)
  const treasureInfo = { ...TREASURES[randomTreasureIndex] } as any

  const randomTownIndex = getRandomInt(0, Object.keys(TOWNS).length - 1)
  const randomTown = Object.keys(TOWNS)[randomTownIndex] as Town

  const treasure: Treasure = {
    id,
    name: treasureInfo.name,
    rewarder: randomTown,
  }

  return treasure
}
