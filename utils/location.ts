import { TOWNS } from "@/constants/locations"
import { getRandomInt } from "@/utils/random"

export const getTownsNationality = (
  town: Town | undefined
): Nation | undefined => {
  if (!town) return undefined

  return TOWNS[town].nation
}

export const getRandomTown = (nation: Nation) => {
  const nationTowns = Object.entries(TOWNS)
    .filter(([_, town]) => town.nation === nation)
    .map(([townName]) => townName)

  return nationTowns[Math.floor(Math.random() * nationTowns.length)] as Town
}

export const getLocationBackground = (
  town: Character["town"],
  location: Character["location"],
  shipMeeting?: ShipMeetingState | null
) => {
  if (location === "Sea" && shipMeeting) {
    const randomImageNumber = getRandomInt(1, 6)
    return `/img/location/ship-meeting/ship-meeting${randomImageNumber}.webp`
  }

  if (location === "Sea") {
    const randomImageNumber = getRandomInt(1, 7)
    return `/img/location/sea/sea${randomImageNumber}.webp`
  }

  const nation = getTownsNationality(town)

  return `/img/location/${nation?.toLowerCase()}/${location
    .replace(" ", "-")
    .toLowerCase()}.webp`
}
