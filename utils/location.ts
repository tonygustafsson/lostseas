import { NATIONS, TOWNS } from "@/constants/locations"

export const getTownsNationality = (
  town: Town | undefined
): Nation | undefined => {
  if (!town) return undefined

  return TOWNS[town].nation
}

// England is kept as the stored key, but shown as Great Britain
export const getNationName = (nation: Nation | "Pirate") =>
  nation === "Pirate" ? nation : NATIONS[nation].name

export const getTownName = (town: Town | undefined) =>
  town ? TOWNS[town].name : ""

export const isTown = (value: unknown): value is Town =>
  typeof value === "string" && Object.hasOwn(TOWNS, value)

export const getNationTowns = (nation: Nation) =>
  (Object.keys(TOWNS) as Town[]).filter((town) => TOWNS[town].nation === nation)

export const getRandomTown = (nation: Nation) => {
  const nationTowns = getNationTowns(nation)

  return nationTowns[Math.floor(Math.random() * nationTowns.length)]
}

export const toSlug = (value: string) =>
  value.toLowerCase().replaceAll(" ", "-")

export const getLocationBackground = (
  town: Character["town"],
  location: Character["location"]
) => `/img/location/${town}/${toSlug(location)}.png`

export type LocationAmbience = {
  sky: string
  water: string
  light: string
}

// Sky, water and light masks used to animate a building interior
export const getLocationAmbience = (
  town: Character["town"],
  location: Character["location"]
): LocationAmbience | undefined => {
  if (!town) return undefined

  const path = `${town}/${toSlug(location)}.png`

  return {
    sky: `/img/location-sky-masks/${path}`,
    water: `/img/location-water-masks/${path}`,
    light: `/img/location-light-masks/${path}`,
  }
}
