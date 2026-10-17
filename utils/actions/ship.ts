import { REPAIR_KIT_HEALTH } from "@/constants/ship"
import { isPositiveSafeInteger } from "@/utils/number"
import { patchDeep } from "@/utils/patchDeep"
import { getOwnedShip, getRemoveShipBlocker } from "@/utils/ship"
import { renameShipValidationSchema } from "@/utils/validation"

import type { ActionResult } from "./types"

export const SHIP_NOT_FOUND = "Ship not found"

export const removeShip = (
  player: Player,
  { id }: { id: string }
): ActionResult => {
  const ship = getOwnedShip(player, id)

  if (!ship) {
    return { error: SHIP_NOT_FOUND, status: 404 }
  }

  const blocker = getRemoveShipBlocker(player)

  if (blocker) {
    return { error: blocker }
  }

  return {
    player: patchDeep<Player>(player, { ships: { [id]: null } }),
    log: `Removed ship ${ship.name}.`,
    data: {},
  }
}

export const renameShip = (
  player: Player,
  { id, name }: { id: string; name: string }
): ActionResult<{ name: string; ship: Ship }> => {
  const validation = renameShipValidationSchema.safeParse({ id, name })

  if (!validation.success) {
    return { error: validation.error.issues[0]?.message ?? "Invalid ship name" }
  }

  const ship = getOwnedShip(player, id)

  if (!ship) {
    return { error: SHIP_NOT_FOUND }
  }

  return {
    player: patchDeep<Player>(player, { ships: { [id]: { name } } }),
    log: `Renamed ship ${ship.name} to ${name}.`,
    data: { name, ship },
  }
}

export const repairShipWithKits = (
  player: Player,
  { id, quantity }: { id: unknown; quantity: unknown }
): ActionResult<{ quantity: number }> => {
  if (typeof id !== "string" || !id || !isPositiveSafeInteger(quantity)) {
    return {
      error: "Choose a ship and a positive whole number of repair kits",
    }
  }

  const ship = getOwnedShip(player, id)
  const repairKits = player.inventory?.repairKits ?? 0

  if (!ship) {
    return { error: SHIP_NOT_FOUND }
  }

  if (
    ship.health >= 100 ||
    quantity > Math.ceil((100 - ship.health) / REPAIR_KIT_HEALTH)
  ) {
    return { error: "This ship does not need that many repair kits" }
  }

  if (quantity > repairKits) {
    return { error: "Not enough repair kits" }
  }

  return {
    player: patchDeep<Player>(player, {
      ships: {
        [id]: {
          health: Math.min(100, ship.health + quantity * REPAIR_KIT_HEALTH),
        },
      },
      inventory: { repairKits: repairKits - quantity },
    }),
    log: `Used ${quantity} repair kits on ship ${id}.`,
    data: { quantity },
  }
}
