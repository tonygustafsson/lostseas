import {
  isTradeGoodAvailableInTown,
  MERCHANDISE,
} from "@/constants/merchandise"
import { isPositiveSafeInteger } from "@/utils/number"
import { patchDeep } from "@/utils/patchDeep"
import { describeTrade, formatQuantity, type TradeChange } from "@/utils/shop"

import type { ActionResult } from "./types"

type TradeData = TradeChange & { totalQuantity: number; totalPrice: number }

const isShopItem = (item: unknown): item is keyof Inventory =>
  typeof item === "string" &&
  Object.hasOwn(MERCHANDISE, item) &&
  MERCHANDISE[item as keyof Inventory].availableAt === "shop"

const validateTrade = (
  player: Player,
  { item, quantity }: TradeChange,
  price: "buy" | "sell"
): { error: string } | { totalPrice: number; itemQuantity: number } => {
  if (!isPositiveSafeInteger(quantity)) {
    return { error: "Quantity must be a positive whole number" }
  }

  if (!isShopItem(item)) {
    return { error: "Not a valid item" }
  }

  if (player.character.location !== "Shop") {
    return { error: "You must be at Shop to do this." }
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
  input: TradeChange
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
    log: `Bought ${formatQuantity(item, quantity)} of ${item} for ${totalPrice} gold.`,
    data: { item, quantity, totalQuantity, totalPrice },
  }
}

export const sellItem = (
  player: Player,
  input: TradeChange
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
    log: `Sold ${formatQuantity(item, quantity)} of ${item} for ${totalPrice} gold.`,
    data: { item, quantity, totalQuantity, totalPrice },
  }
}

type TradeResult = { sold: TradeData[]; bought: TradeData[]; gold: number }

/**
 * Buys and sells several items in one go. A negative quantity sells, a
 * positive one buys. All sales happen first, so their gold can pay for the
 * purchases. If any part fails, nothing is traded.
 */
export const tradeItems = (
  player: Player,
  { changes }: { changes: TradeChange[] }
): ActionResult<TradeResult> => {
  if (!Array.isArray(changes) || changes.length === 0) {
    return { error: "Nothing to trade" }
  }

  const isValidChange = (change: TradeChange) =>
    typeof change === "object" &&
    change !== null &&
    Number.isSafeInteger(change.quantity) &&
    change.quantity !== 0

  if (!changes.every(isValidChange)) {
    return { error: "Quantity must be a whole number other than zero" }
  }

  const items = changes.map(({ item }) => item)

  if (new Set(items).size !== items.length) {
    return { error: "Each item can only be traded once" }
  }

  const sales = changes.filter(({ quantity }) => quantity < 0)
  const purchases = changes.filter(({ quantity }) => quantity > 0)

  let current = player
  const sold: TradeData[] = []
  const bought: TradeData[] = []

  for (const { item, quantity } of sales) {
    const result = sellItem(current, { item, quantity: -quantity })

    if ("error" in result) {
      return result
    }

    current = result.player
    sold.push(result.data)
  }

  for (const { item, quantity } of purchases) {
    const result = buyItem(current, { item, quantity })

    if ("error" in result) {
      return result
    }

    current = result.player
    bought.push(result.data)
  }

  const gold = current.character.gold - player.character.gold
  const log = `${describeTrade(sold, bought)} ${gold < 0 ? "Paid" : "Received"} ${Math.abs(gold)} gold.`

  return {
    player: current,
    log,
    data: { sold, bought, gold },
  }
}
