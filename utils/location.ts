import dustConfig from "@/constants/buildings/dust.json"
import firesConfig from "@/constants/buildings/fires.json"
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

// A fire is a circle in pixels of the building picture, [x, y, radius]
export type Fire = [x: number, y: number, radius: number]

const FIRES = firesConfig as unknown as Record<string, Record<string, Fire[]>>
const NO_FIRES: Fire[] = []

// The fires of a building. Without any, its light mask picture is used instead.
export const getLocationFires = (
  town: Character["town"],
  location: Character["location"]
) => (town && FIRES[town]?.[toSlug(location)]) || NO_FIRES

// A dust source is a polygon round a window or opening, [x, y, x, y, ...] in
// pixels of the building picture. Dust floats from it into the room.
export type DustSource = number[]

const DUST = dustConfig as Record<string, Record<string, DustSource[]>>
const NO_DUST: DustSource[] = []

// The dust sources of a building. Without any, its light mask picture decides
// where dust floats.
export const getLocationDust = (
  town: Character["town"],
  location: Character["location"]
) => (town && DUST[town]?.[toSlug(location)]) || NO_DUST
