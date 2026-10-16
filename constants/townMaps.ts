import { type TownBuildingPosition, TOWNS } from "@/constants/locations"
import { toSlug } from "@/utils/location"

export type TownMapBuilding = TownBuildingPosition & {
  location: TownLocation
  name: string
}

export type TownMapImage = {
  src: string
  width: number
  height: number
  buildings: TownMapBuilding[]
}

export type TownMap = {
  desktop: TownMapImage
  mobile: TownMapImage
}

type TownMapVariant = keyof TownMap

const IMAGE_SIZES: Record<TownMapVariant, { width: number; height: number }> = {
  desktop: { width: 2172, height: 724 },
  mobile: { width: 941, height: 1672 },
}

export const getTownMapSrc = (town: Town, variant: TownMapVariant) =>
  `/img/towns/${toSlug(town)}-${variant}.png`

const getTownMapImage = (
  town: Town,
  variant: TownMapVariant
): TownMapImage => ({
  src: getTownMapSrc(town, variant),
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
