import { LOCATIONS, TOWNS } from "@/constants/locations"

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
  location: Character["location"]
) =>
  `/img/location/${town?.toLowerCase().replace(" ", "-")}/${location
    .toLowerCase()
    .replace(" ", "-")}.webp`

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
