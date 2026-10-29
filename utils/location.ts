import { TOWNS } from "@/constants/locations"

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

export const toSlug = (value: string) =>
  value.toLowerCase().replaceAll(" ", "-")

export const getLocationBackground = (
  town: Character["town"],
  location: Character["location"]
) => `/img/location/${town && toSlug(town)}/${toSlug(location)}.png`

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

  const path = `${toSlug(town)}/${toSlug(location)}.png`

  return {
    sky: `/img/location-sky-masks/${path}`,
    water: `/img/location-water-masks/${path}`,
    light: `/img/location-light-masks/${path}`,
  }
}

// Looping sounds played on top of the music while in a building. One of them
// is picked at random on every visit.
const LOCATION_AMBIENCE_SOUNDS: Partial<
  Record<Character["location"], string[]>
> = {
  Harbor: ["ambience/harbor/harbor1.opus"],
  Market: ["ambience/market/market1.opus"],
  Tavern: Array.from(
    { length: 4 },
    (_, i) => `ambience/tavern/tavern${i + 1}.opus`
  ),
  Shipyard: Array.from(
    { length: 2 },
    (_, i) => `ambience/shipyard/shipyard${i + 1}.opus`
  ),
}

export const getLocationAmbienceSounds = (location?: Character["location"]) =>
  location ? LOCATION_AMBIENCE_SOUNDS[location] : undefined
