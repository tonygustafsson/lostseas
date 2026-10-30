import { TOWNS } from "@/constants/locations"
import {
  PIRATE_CRIMES,
  PIRATE_FIRST_NAMES,
  PIRATE_NICKNAMES,
  PIRATE_SURNAMES,
} from "@/constants/wantedPirates"

import { pickRandom } from "./random"

export const createWantedPirate = (): WantedPirate => {
  const firstName = pickRandom(PIRATE_FIRST_NAMES)
  const nickname = pickRandom(PIRATE_NICKNAMES)
  const surname = pickRandom(PIRATE_SURNAMES)

  return {
    id: crypto.randomUUID(),
    name: `${firstName} "${nickname}" ${surname}`,
    crimeId: pickRandom(PIRATE_CRIMES).id,
    rewarder: pickRandom(Object.keys(TOWNS) as Town[]),
  }
}

export const getPirateCrime = (pirate: Pick<WantedPirate, "crimeId">) =>
  PIRATE_CRIMES.find(({ id }) => id === pirate.crimeId)
