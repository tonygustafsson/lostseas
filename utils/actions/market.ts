import {
  APOTHECARY_REMEDIES,
  isRemedy,
  type Remedy,
} from "@/constants/apothecary"
import { MERCHANDISE } from "@/constants/merchandise"
import { getRemedyResult } from "@/utils/apothecary"
import { getCargo, isCargo } from "@/utils/cargo"
import { patchDeep } from "@/utils/patchDeep"

import type { ActionResult } from "./types"

/** Buys a whole market batch at the offered price. */
export const acceptMarketOffer = (
  player: Player,
  { item }: { item: keyof Inventory }
): ActionResult<{
  item: keyof Inventory
  quantity: number
  totalQuantity: number
  totalPrice: number
}> => {
  if (typeof item !== "string" || !Object.hasOwn(MERCHANDISE, item)) {
    return { error: "Not a valid item" }
  }

  if (player.character.location !== "Market") {
    return { error: "You must be at Market to do this." }
  }

  const items = player.locationStates?.market?.items ?? {}
  const offer = Object.hasOwn(items, item)
    ? items[item as keyof typeof items]
    : undefined

  if (!offer) {
    return { error: "Not a valid item" }
  }

  const { price, quantity } = offer
  const totalPrice = price * quantity

  if (player.character.gold < totalPrice) {
    return { error: "Not enough gold" }
  }

  if (isCargo(item) && quantity > getCargo(player).free) {
    return { error: "Not enough cargo space" }
  }

  const totalQuantity = (player.inventory?.[item] ?? 0) + quantity

  return {
    player: patchDeep<Player>(player, {
      character: { gold: player.character.gold - totalPrice },
      inventory: { [item]: totalQuantity },
      locationStates: { market: { items: { [item]: null } } },
    }),
    log: {
      type: "trade",
      message: `Bought ${quantity} ${MERCHANDISE[item].unit} of ${item} in the market for ${totalPrice} gold.`,
    },
    data: { item, quantity, totalQuantity, totalPrice },
  }
}

/** Heals the whole crew with an apothecary remedy. */
export const buyRemedy = (
  player: Player,
  { remedy }: { remedy: Remedy }
): ActionResult<{
  remedy: Remedy
  healed: number
  newHealth: number
  totalPrice: number
}> => {
  if (!isRemedy(remedy)) {
    return { error: "Not a valid remedy" }
  }

  if (player.character.location !== "Market") {
    return { error: "You must be at Market to do this." }
  }

  const {
    hasCrew,
    healed,
    newHealth,
    price: totalPrice,
  } = getRemedyResult(player.crewMembers, remedy)

  if (!hasCrew) {
    return { error: "You have no crew to treat." }
  }

  if (healed <= 0) {
    return { error: "Your crew's health is already at 100%." }
  }

  if (player.character.gold < totalPrice) {
    return { error: "Not enough gold" }
  }

  return {
    player: patchDeep<Player>(player, {
      character: { gold: player.character.gold - totalPrice },
      crewMembers: { health: newHealth },
    }),
    log: {
      type: "crew",
      message: `Bought ${APOTHECARY_REMEDIES[remedy].label} at the apothecary for ${totalPrice} gold. Crew health is now ${newHealth}%.`,
    },
    data: { remedy, healed, newHealth, totalPrice },
  }
}
