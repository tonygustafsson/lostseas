import { LOCATIONS, TOWNS } from "@/constants/locations"
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
    const randomImageNumber = getRandomInt(1, 16)
    return `/img/location/ship-meeting/ship-meeting${randomImageNumber}.webp`
  }

  if (location === "Sea") {
    const randomImageNumber = getRandomInt(1, 21)
    return `/img/location/sea/sea${randomImageNumber}.webp`
  }

  return `/img/location/${town?.toLowerCase().replace(" ", "-")}/${location
    .toLowerCase()
    .replace(" ", "-")}.webp`
}

export const getAllTownLocationBackgrounds = (town: Character["town"]) => {
  const images = Object.values(LOCATIONS)
    .filter((location) => location !== "Sea")
    .map(
      (location) =>
        `/img/location/${town?.toLowerCase().replace(" ", "-")}/${location
          .toLowerCase()
          .replace(" ", "-")}.webp`
    )

  return images
}

export const getAllSeaLocationBackgrounds = () => {
  const seaBackgrounds = Array.from({ length: 21 }, (_, i) => i + 1).map(
    (i) => `/img/location/sea/sea${i}.webp`
  )

  const shipMeetingBackgrounds = Array.from(
    { length: 16 },
    (_, i) => i + 1
  ).map((i) => `/img/location/ship-meeting/ship-meeting${i}.webp`)

  return [...seaBackgrounds, ...shipMeetingBackgrounds]
}
