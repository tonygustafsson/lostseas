import { MERCHANDISE } from "@/constants/merchandise"
import { SHIP_TYPES } from "@/constants/ship"

type Loot = Partial<Record<keyof Inventory, number>>

/** Shop goods take one slot each. Shipyard goods, like cannons, take none. */
export const isCargo = (item: keyof Inventory) =>
  MERCHANDISE[item]?.availableAt === "shop"

/** How many units of cargo the whole fleet can carry. */
export const getCargoCapacity = (ships: Player["ships"] | undefined) =>
  Object.values(ships || {}).reduce(
    (sum, ship) => sum + (SHIP_TYPES[ship.type]?.cargoCapacity ?? 0),
    0
  )

/** How many units of cargo are aboard. */
export const getCargoLoad = (inventory: Inventory | undefined) =>
  (Object.entries(inventory || {}) as [keyof Inventory, number][]).reduce(
    (sum, [item, amount]) => sum + (isCargo(item) ? amount || 0 : 0),
    0
  )

/** Load, capacity, free space and how much too much is aboard. */
export const getCargo = (player: Pick<Player, "ships" | "inventory">) => {
  const capacity = getCargoCapacity(player.ships)
  const load = getCargoLoad(player.inventory)

  return {
    capacity,
    load,
    free: Math.max(0, capacity - load),
    overload: Math.max(0, load - capacity),
  }
}

export const isOverloaded = (player: Pick<Player, "ships" | "inventory">) =>
  getCargo(player).overload > 0

/**
 * Cargo slots left for one item once every other change in the trade is
 * loaded or unloaded. Like getGoldLeftForItem, but for space.
 */
export const getCargoLeftForItem = (
  player: Pick<Player, "ships" | "inventory">,
  changes: { item: keyof Inventory; quantity: number }[],
  item: keyof Inventory
) => {
  const otherChanges = changes.filter((change) => change.item !== item)

  return (
    getCargoCapacity(player.ships) -
    getCargoAfterTrade(player.inventory, otherChanges)
  )
}

/**
 * The most of an item the player can own with the given free space. Never
 * less than what they already own. Items that are not cargo have no limit.
 */
export const getStorableTarget = (
  item: keyof Inventory,
  owned: number,
  cargoLeft: number
) => (isCargo(item) ? owned + Math.max(0, cargoLeft) : Infinity)

/** Order loot is loaded in when space is short: supplies first, then value. */
const LOOT_ORDER = (Object.keys(MERCHANDISE) as (keyof Inventory)[]).sort(
  (a, b) =>
    Number(!!MERCHANDISE[b].isNecessity) -
      Number(!!MERCHANDISE[a].isNecessity) ||
    Number(!!MERCHANDISE[b].isUtility) - Number(!!MERCHANDISE[a].isUtility) ||
    MERCHANDISE[b].sell - MERCHANDISE[a].sell
)

/**
 * How much of each looted item to take by default: everything that fits.
 * Items that are not cargo are always taken in full.
 */
export const getLootPreset = (offer: Loot, freeCargo: number): Loot => {
  let free = Math.max(0, freeCargo)
  const preset: Loot = {}

  for (const item of LOOT_ORDER) {
    const offered = offer[item] ?? 0

    if (offered <= 0) continue

    if (!isCargo(item)) {
      preset[item] = offered
      continue
    }

    preset[item] = Math.min(offered, free)
    free -= preset[item]
  }

  return preset
}

/**
 * Warns when removing a ship would leave more cargo aboard than the rest of
 * the fleet can carry. Returns nothing when it still fits.
 */
export const getShipRemovalCargoWarning = (
  player: Pick<Player, "ships" | "inventory">,
  shipId: Ship["id"]
) => {
  const ships = Object.fromEntries(
    Object.entries(player.ships || {}).filter(([id]) => id !== shipId)
  )
  const { overload } = getCargo({ ships, inventory: player.inventory })

  if (overload > 0) {
    return `This leaves you overloaded by ${overload}. You cannot leave port until you sell goods or buy another ship.`
  }
}

/** Cargo aboard once the planned trade is done. */
export const getCargoAfterTrade = (
  inventory: Inventory | undefined,
  changes: { item: keyof Inventory; quantity: number }[]
) =>
  getCargoLoad(inventory) +
  changes
    .filter(({ item }) => isCargo(item))
    .reduce((sum, { quantity }) => sum + quantity, 0)

/** Whether a trade loads any cargo, which an overloaded fleet cannot do. */
export const addsCargo = (
  changes: { item: keyof Inventory; quantity: number }[]
) => changes.some(({ item, quantity }) => isCargo(item) && quantity > 0)

/** The most of one looted item the player can take next to the rest of their choice. */
export const getLootItemMax = (
  offer: Loot,
  choice: Loot,
  item: keyof Inventory,
  freeCargo: number
) => {
  const offered = offer[item] ?? 0

  if (!isCargo(item)) return offered

  const otherCargo = getCargoLoad({ ...choice, [item]: 0 })

  return Math.max(0, Math.min(offered, freeCargo - otherCargo))
}
