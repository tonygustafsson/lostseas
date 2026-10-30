import { TOWNS } from "@/constants/locations"
import { TREASURES } from "@/constants/treasures"

import { pickRandom } from "./random"

export const createTreasure = () => {
  const id = crypto.randomUUID()
  const treasureInfo = pickRandom(TREASURES)
  const randomTown = pickRandom(Object.keys(TOWNS) as Town[])

  const treasure: Treasure = {
    id,
    name: treasureInfo.name as TreasureName,
    rewarder: randomTown,
  }

  return treasure
}
