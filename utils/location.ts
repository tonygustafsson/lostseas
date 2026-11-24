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

// A fire is a circle in pixels of the building picture, [x, y, radius]
export type Fire = [x: number, y: number, radius: number]

const FIRES = firesConfig as unknown as Record<string, Record<string, Fire[]>>
const NO_FIRES: Fire[] = []

// The fires of a building, the lights that flicker in its picture
export const getLocationFires = (
  town: Character["town"],
  location: Character["location"]
) => (town && FIRES[town]?.[toSlug(location)]) || NO_FIRES

// A polygon, [x, y, x, y, ...] in pixels of the building picture. Polygons
// inside polygons are holes.
export type Polygon = number[]

// The sky and the water seen through the windows and arches of a building
export type BuildingAreas = { sky: Polygon[]; water: Polygon[] }

// The sky and water polygons of a building, from the file of its town in
// constants/buildings/areas. Loaded when a building is entered, not with the
// rest of the game, because they are a lot of numbers for all 96 buildings.
// Undefined when there are none, then there is no sky or water to animate.
export const loadLocationAreas = async (
  town: Character["town"],
  location: Character["location"]
): Promise<BuildingAreas | undefined> => {
  if (!town) {
    return undefined
  }

  try {
    const areas = await import(`../constants/buildings/areas/${town}.json`)

    return areas.default[toSlug(location)]
  } catch {
    return undefined
  }
}
