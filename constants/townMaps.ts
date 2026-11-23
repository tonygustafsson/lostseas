import { type TownBuildingPosition, TOWNS } from "@/constants/locations"

import flagSpritesConfig from "./harbor/flagSprites.json"
import frontConfig from "./harbor/front.json"
import lanesConfig from "./harbor/lanes.json"
import skyConfig from "./harbor/sky.json"
import waterConfig from "./harbor/water.json"

export type TownMapBuilding = TownBuildingPosition & {
  location: TownLocation
  name: string
}

export type TownMapImage = {
  src: string
  // Where clouds drift, in the same format as water
  sky: number[][]
  // Where the water ripples, [x, y, x, y, ...] round the corners. A polygon
  // inside another is a hole.
  water: number[][]
  // Flags the shader draws, see flagUniforms.ts
  flagSprites: number[][]
  // Street levels, [x start, x end, feet, half width, person size]
  lanes: number[][]
  // Boxes people walk behind, [x start, y start, x end, y end]
  things: number[][]
  // Shapes people walk behind, [x, y, x, y, ...] round the corners
  shapes: number[][]
  width: number
  height: number
  buildings: TownMapBuilding[]
}

export type TownMap = {
  desktop: TownMapImage
  mobile: TownMapImage
}

type TownMapVariant = keyof TownMap

// Screens that show the desktop map. Matches the Tailwind md breakpoint used
// to switch the building buttons.
export const TOWN_MAP_DESKTOP_MEDIA = "(min-width: 48rem)"

const IMAGE_SIZES: Record<TownMapVariant, { width: number; height: number }> = {
  desktop: { width: 2172, height: 724 },
  mobile: { width: 941, height: 1672 },
}

// The pictures have no flags, the shader draws and waves them
export const getTownMapSrc = (town: Town, variant: TownMapVariant) =>
  `/img/towns/${town}-${variant}.png`

// The same empty list every time, so it can be a dependency
const NONE: number[][] = []

// Edited in the mask editor story, see the ambience skill
const getLanes = (town: Town, variant: TownMapVariant) =>
  (lanesConfig.towns as Record<string, Record<string, number[][]>>)[town]?.[
    variant
  ] ?? NONE

const getFlagSprites = (town: Town, variant: TownMapVariant) =>
  (flagSpritesConfig as Record<string, Record<string, number[][]>>)[town]?.[
    variant
  ] ?? NONE

const getWater = (town: Town, variant: TownMapVariant) =>
  (waterConfig as Record<string, Record<string, number[][]>>)[town]?.[
    variant
  ] ?? NONE

const getSky = (town: Town, variant: TownMapVariant) =>
  (skyConfig as Record<string, Record<string, number[][]>>)[town]?.[variant] ??
  NONE

const getFront = (town: Town, variant: TownMapVariant) =>
  (
    frontConfig.towns as Record<
      string,
      Record<string, { things?: number[][]; shapes?: number[][] }>
    >
  )[town]?.[variant]

const getTownMapImage = (
  town: Town,
  variant: TownMapVariant
): TownMapImage => ({
  src: getTownMapSrc(town, variant),
  sky: getSky(town, variant),
  water: getWater(town, variant),
  flagSprites: getFlagSprites(town, variant),
  lanes: getLanes(town, variant),
  things: getFront(town, variant)?.things ?? NONE,
  shapes: getFront(town, variant)?.shapes ?? NONE,
  ...IMAGE_SIZES[variant],
  buildings: Object.entries(TOWNS[town].buildings).map(
    ([location, building]) => ({
      location: location as TownLocation,
      name: building.name,
      ...building[variant],
    })
  ),
})

export const getTownMap = (town: Town | undefined): TownMap | undefined =>
  town
    ? {
        desktop: getTownMapImage(town, "desktop"),
        mobile: getTownMapImage(town, "mobile"),
      }
    : undefined

export const getBuilding = (
  town: Town | undefined,
  location: Character["location"]
) =>
  town && location in TOWNS[town].buildings
    ? TOWNS[town].buildings[location as TownLocation]
    : undefined
