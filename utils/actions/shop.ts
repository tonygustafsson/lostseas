import {
  BARTER_GOODS,
  isTradeGoodAvailableInTown,
  MERCHANDISE,
} from "@/constants/merchandise"
import { isPositiveSafeInteger } from "@/utils/number"
import { patchDeep } from "@/utils/patchDeep"
import { getNecessitiesInfo } from "@/utils/shop"

import type { ActionResult } from "./types"

type TradeInput = { item: keyof Inventory; quantity: number }

type TradeData = TradeInput & { totalQuantity: number; totalPrice: number }

const NOT_AT_SHOP = "You must be at Shop to do this."

const isShopItem = (item: unknown): item is keyof Inventory =>
  typeof item === "string" &&
  Object.hasOwn(MERCHANDISE, item) &&
  MERCHANDISE[item as keyof Inventory].availableAt === "shop"

const validateTrade = (
  player: Player,
  { item, quantity }: TradeInput,
  price: "buy" | "sell"
): { error: string } | { totalPrice: number; itemQuantity: number } => {
  if (!isPositiveSafeInteger(quantity)) {
    return { error: "Quantity must be a positive whole number" }
  }

  if (!isShopItem(item)) {
    return { error: "Not a valid item" }
  }

  if (player.character.location !== "Shop") {
    return { error: NOT_AT_SHOP }
  }

  if (!isTradeGoodAvailableInTown(item, player.character.town)) {
    return { error: "This item is not available in this port" }
  }

  const totalPrice = MERCHANDISE[item][price] * quantity

  if (!Number.isSafeInteger(totalPrice)) {
    return { error: "Invalid quantity" }
  }

  return { totalPrice, itemQuantity: player.inventory?.[item] ?? 0 }
}

export const buyItem = (
  player: Player,
  input: TradeInput
): ActionResult<TradeData> => {
  const trade = validateTrade(player, input, "buy")

  if ("error" in trade) {
    return trade
  }

  const { item, quantity } = input
  const { totalPrice, itemQuantity } = trade

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
    log: `Bought ${quantity} ${MERCHANDISE[item].unit} of ${item} for ${totalPrice} gold.`,
    data: { item, quantity, totalQuantity, totalPrice },
  }
}

export const sellItem = (
  player: Player,
  input: TradeInput
): ActionResult<TradeData> => {
  const trade = validateTrade(player, input, "sell")

  if ("error" in trade) {
    return trade
  }

  const { item, quantity } = input
  const { totalPrice, itemQuantity } = trade

  if (itemQuantity < quantity) {
    return { error: `Not enough ${item}.` }
  }

  const totalQuantity = itemQuantity - quantity

  return {
    player: patchDeep<Player>(player, {
      character: { gold: player.character.gold + totalPrice },
      inventory: { [item]: totalQuantity },
    }),
    log: `Sold ${quantity} ${MERCHANDISE[item].unit} of ${item} for ${totalPrice} gold.`,
    data: { item, quantity, totalQuantity, totalPrice },
  }
}

export const buyNecessities = (
  player: Player,
  { days }: { days: number }
): ActionResult<{ cost: number; foodNeeded: number; waterNeeded: number }> => {
  if (!isPositiveSafeInteger(days)) {
    return { error: "Days must be a positive whole number" }
  }

  if (player.character.location !== "Shop") {
    return { error: NOT_AT_SHOP }
  }

  const food = player.inventory?.food || 0
  const water = player.inventory?.water || 0

  const { cost, foodNeeded, waterNeeded } = getNecessitiesInfo({
    crewMembers: player.crewMembers.count || 0,
    currentFood: food,
    currentWater: water,
    days,
  })

  if (cost === 0) {
    return { error: `You already have enough food and water for ${days} days.` }
  }

  if (player.character.gold < cost) {
    return { error: "Not enough gold" }
  }

  return {
    player: patchDeep<Player>(player, {
      character: { gold: player.character.gold - cost },
      inventory: { food: food + foodNeeded, water: water + waterNeeded },
    }),
    log: `Bought necessities for ${cost} gold. Enough food and water for ${days} days.`,
    data: { cost, foodNeeded, waterNeeded },
  }
}

export const sellBarterGoods = (
  player: Player
): ActionResult<{ value: number }> => {
  if (player.character.location !== "Shop") {
    return { error: NOT_AT_SHOP }
  }

  // Only goods the local shop accepts are sold. The rest stay in the inventory.
  const soldGoods = Object.entries(player.inventory || {}).filter(
    ([item]) =>
      BARTER_GOODS.includes(item) &&
      isTradeGoodAvailableInTown(item as keyof Inventory, player.character.town)
  ) as [keyof Inventory, number][]

  const value = soldGoods.reduce(
    (sum, [item, quantity]) => sum + MERCHANDISE[item].sell * quantity,
    0
  )

  if (value === 0) {
    return { error: "You have no barter goods this port accepts." }
  }

  return {
    player: patchDeep<Player>(player, {
      character: { gold: player.character.gold + value },
      inventory: Object.fromEntries(soldGoods.map(([item]) => [item, 0])),
    }),
    log: `Sold barter goods for ${value} gold.`,
    data: { value },
  }
}
