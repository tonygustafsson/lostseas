import { NATIONS, TOWNS } from "@/constants/locations"
import { MERCHANDISE } from "@/constants/merchandise"
import { SHIP_TYPES } from "@/constants/ship"
import { TITLE_INFO } from "@/constants/title"
import { TREASURES } from "@/constants/treasures"

export const TOWN_OPTIONS = Object.keys(TOWNS) as Town[]
export const NATION_OPTIONS = Object.keys(NATIONS) as Nation[]
export const NATION_OR_PIRATE_OPTIONS = [...NATION_OPTIONS, "Pirate"] as const
export const TITLE_OPTIONS = Object.keys(TITLE_INFO) as Title[]
export const SHIP_TYPE_OPTIONS = Object.keys(SHIP_TYPES) as ShipType[]
export const ITEM_OPTIONS = Object.keys(MERCHANDISE) as (keyof Inventory)[]
export const TREASURE_OPTIONS = TREASURES.map((treasure) => treasure.name)

export const LOCATION_OPTIONS: (TownLocation | SeaLocation)[] = [
  "Bank",
  "Tavern",
  "Market",
  "Shop",
  "Shipyard",
  "City hall",
  "Harbor",
  "Sea",
]

/** The select has no empty value, so a missing town is shown as this. */
export const NONE = "None"
