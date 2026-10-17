import { MERCHANDISE } from "@/constants/merchandise"
import { SHIP_REPAIR_COST, SHIP_TYPES } from "@/constants/ship"
import { TITLE_INFO } from "@/constants/title"
import { isPositiveSafeInteger } from "@/utils/number"
import { patchDeep } from "@/utils/patchDeep"
import { createNewShip, getOwnedShip } from "@/utils/ship"

import type { ActionResult } from "./types"

type FittingsInput = { item: keyof Inventory; quantity: number }

type FittingsData = FittingsInput & {
  totalQuantity: number
  totalPrice: number
}

const NOT_AT_SHIPYARD = "You must be at Shipyard to do this."

const isShipyardItem = (item: unknown): item is keyof Inventory =>
  typeof item === "string" &&
  Object.hasOwn(MERCHANDISE, item) &&
  MERCHANDISE[item as keyof Inventory].availableAt === "shipyard"

const isShipType = (item: unknown): item is ShipType =>
  typeof item === "string" && Object.hasOwn(SHIP_TYPES, item)

const validateFittings = (
  player: Player,
  { item, quantity }: FittingsInput,
  price: "buy" | "sell"
): { error: string } | { totalPrice: number; itemQuantity: number } => {
  if (!isPositiveSafeInteger(quantity)) {
    return { error: "Quantity must be a positive whole number" }
  }

  if (!isShipyardItem(item)) {
    return { error: "Not a valid item" }
  }

  const totalPrice = MERCHANDISE[item][price] * quantity

  if (!Number.isSafeInteger(totalPrice)) {
    return { error: "Invalid quantity" }
  }

  if (player.character.location !== "Shipyard") {
    return { error: NOT_AT_SHIPYARD }
  }

  return { totalPrice, itemQuantity: player.inventory?.[item] ?? 0 }
}

/** Readable amount for logs, like "1 cannon" or "3 repair kits". */
const describeFittings = (item: keyof Inventory, quantity: number) => {
  const { singleUnit, unit } = MERCHANDISE[item]
  const name = quantity === 1 ? singleUnit : unit

  return item === "repairKits"
    ? `${quantity} repair ${name}`
    : `${quantity} ${name}`
}

export const buyFittings = (
  player: Player,
  input: FittingsInput
): ActionResult<FittingsData> => {
  const fittings = validateFittings(player, input, "buy")

  if ("error" in fittings) {
    return fittings
  }

  const { item, quantity } = input
  const { totalPrice, itemQuantity } = fittings

  if (player.character.gold < totalPrice) {
    return { error: "Not enough gold" }
  }

  const totalQuantity = itemQuantity + quantity

  if (!Number.isSafeInteger(totalQuantity)) {
    return { error: "Invalid quantity" }
  }

  return {
    player: patchDeep<Player>(player, {
      character: { gold: player.character.gold - totalPrice },
      inventory: { [item]: totalQuantity },
    }),
    log: `Bought ${describeFittings(item, quantity)} for ${totalPrice} gold.`,
    data: { item, quantity, totalQuantity, totalPrice },
  }
}

export const sellFittings = (
  player: Player,
  input: FittingsInput
): ActionResult<FittingsData> => {
  const fittings = validateFittings(player, input, "sell")

  if ("error" in fittings) {
    return fittings
  }

  const { item, quantity } = input
  const { totalPrice, itemQuantity } = fittings

  if (itemQuantity < quantity) {
    return { error: `Not enough ${item}.` }
  }

  const totalQuantity = itemQuantity - quantity

  return {
    player: patchDeep<Player>(player, {
      character: { gold: player.character.gold + totalPrice },
      inventory: { [item]: totalQuantity },
    }),
    log: `Sold ${describeFittings(item, quantity)} for ${totalPrice} gold.`,
    data: { item, quantity, totalQuantity, totalPrice },
  }
}

export const buyShip = (
  player: Player,
  { item }: { item: ShipType },
  createShip: typeof createNewShip = createNewShip
): ActionResult<{ item: ShipType; totalPrice: number }> => {
  if (!isShipType(item)) {
    return { error: "Not a valid item" }
  }

  if (player.character.location !== "Shipyard") {
    return { error: NOT_AT_SHIPYARD }
  }

  const totalPrice = SHIP_TYPES[item].buy

  if (player.character.gold < totalPrice) {
    return { error: "Not enough gold" }
  }

  const { maxShips } = TITLE_INFO[player.character.title]

  if (Object.keys(player.ships ?? {}).length >= maxShips) {
    return { error: "Max ships reached due to title" }
  }

  const newShip = createShip(item, player.character.day)

  return {
    player: patchDeep<Player>(player, {
      character: { gold: player.character.gold - totalPrice },
      ships: { [newShip.id]: newShip },
    }),
    log: `Bought ship ${item} named ${newShip.name} for ${totalPrice} gold.`,
    data: { item, totalPrice },
  }
}

export const sellShip = (
  player: Player,
  { id }: { id: Ship["id"] }
): ActionResult<{ ship: Ship; totalPrice: number }> => {
  if (player.character.location !== "Shipyard") {
    return { error: NOT_AT_SHIPYARD }
  }

  const ship = getOwnedShip(player, id)

  if (!ship) {
    return { error: "Not a valid item" }
  }

  // Ships sell for half their purchase price, regardless of health
  const totalPrice = SHIP_TYPES[ship.type].sell

  return {
    player: patchDeep<Player>(player, {
      character: { gold: player.character.gold + totalPrice },
      ships: { [id]: null },
    }),
    log: `Sold ship ${ship.name} for ${totalPrice} gold.`,
    data: { ship, totalPrice },
  }
}

export const repairShip = (
  player: Player,
  { id }: { id: Ship["id"] }
): ActionResult<{ ship: Ship; totalPrice: number }> => {
  if (player.character.location !== "Shipyard") {
    return { error: NOT_AT_SHIPYARD }
  }

  const ship = getOwnedShip(player, id)

  if (!ship) {
    return { error: "Not a valid item" }
  }

  if (ship.health >= 100) {
    return { error: `${ship.name} does not need repairs.` }
  }

  const totalPrice = (100 - ship.health) * SHIP_REPAIR_COST

  if (player.character.gold < totalPrice) {
    return { error: "Not enough gold." }
  }

  return {
    player: patchDeep<Player>(player, {
      character: { gold: player.character.gold - totalPrice },
      ships: { [id]: { health: 100 } },
    }),
    log: `Repaired ship ${ship.name} for ${totalPrice} gold.`,
    data: { ship, totalPrice },
  }
}
