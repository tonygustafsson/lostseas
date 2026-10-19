import {
  isTradeGoodAvailableInTown,
  MERCHANDISE,
} from "@/constants/merchandise"
import { patchDeep } from "@/utils/patchDeep"

/** One item to trade. A negative quantity sells, a positive one buys. */
export type TradeChange = { item: keyof Inventory; quantity: number }

/** How many of each item the player wants to own after trading. */
export type TradeTargets = Partial<Record<keyof Inventory, number>>

/**
 * Food and water the crew uses each day at sea: 1 crate of food per 10 crew
 * and 1 barrel of water per 5 crew, rounded to whole units. Any crew uses at
 * least 1 of each per day. No crew uses nothing.
 */
export const getDailyConsumption = (crewMembers: CrewMembers["count"]) => {
  if (crewMembers <= 0) {
    return { food: 0, water: 0 }
  }

  return {
    food: Math.max(1, Math.round(crewMembers / 10)),
    water: Math.max(1, Math.round(crewMembers / 5)),
  }
}

export const getDaysWorthOfNecessities = ({
  crewMembers,
  food = 0,
  water = 0,
}: {
  crewMembers: CrewMembers["count"]
  food?: Inventory["food"]
  water?: Inventory["water"]
}) => {
  const daily = getDailyConsumption(crewMembers)

  // Without crew, supplies last forever
  const foodDays = daily.food ? Math.floor(food / daily.food) : Infinity
  const waterDays = daily.water ? Math.floor(water / daily.water) : Infinity

  return Math.min(foodDays, waterDays)
}

const SHOP_ITEMS = (Object.keys(MERCHANDISE) as (keyof Inventory)[]).filter(
  (item) => MERCHANDISE[item].availableAt === "shop"
)

/** The items the shop in this town trades, grouped like the shop shows them. */
export const getShopItems = (town: Town | undefined) => ({
  necessities: SHOP_ITEMS.filter((item) => MERCHANDISE[item].isNecessity),
  utilities: SHOP_ITEMS.filter(
    (item) =>
      MERCHANDISE[item].isUtility && isTradeGoodAvailableInTown(item, town)
  ),
  barterGoods: SHOP_ITEMS.filter(
    (item) =>
      MERCHANDISE[item].isBarterGoods && isTradeGoodAvailableInTown(item, town)
  ),
})

/** Gold received for one change (positive) or paid for it (negative). */
export const getChangeGold = ({ item, quantity }: TradeChange) =>
  quantity < 0
    ? -quantity * MERCHANDISE[item].sell
    : -quantity * MERCHANDISE[item].buy

export const getTradeChanges = (
  inventory: Inventory | undefined,
  targets: TradeTargets
): TradeChange[] =>
  (Object.entries(targets) as [keyof Inventory, number][]).flatMap(
    ([item, target]) => {
      const quantity = target - (inventory?.[item] ?? 0)

      return quantity === 0 ? [] : [{ item, quantity }]
    }
  )

/** Net gold of a whole trade. Positive means the player receives gold. */
export const getTradeGold = (changes: TradeChange[]) =>
  changes.reduce((sum, change) => sum + getChangeGold(change), 0)

/**
 * The most of an item the player can own after buying with the given gold.
 * Never less than what they already own.
 */
export const getAffordableTarget = (
  item: keyof Inventory,
  owned: number,
  gold: number
) => owned + Math.max(0, Math.floor(gold / MERCHANDISE[item].buy))

/** How much of an item the player will own after the planned trade. */
export const getPlannedAmount = (
  inventory: Inventory | undefined,
  targets: TradeTargets,
  item: keyof Inventory
) => targets[item] ?? inventory?.[item] ?? 0

/**
 * Food and water targets that last the crew the given number of days. Tops up
 * from the planned amounts and never lowers them, so a planned purchase of
 * more than the preset needs is kept.
 */
export const getNecessitiesTargets = (
  {
    crewMembers,
    food,
    water,
  }: { crewMembers: CrewMembers["count"]; food: number; water: number },
  days: number
): TradeTargets => {
  const daily = getDailyConsumption(crewMembers)

  return {
    food: Math.max(food, daily.food * days),
    water: Math.max(water, daily.water * days),
  }
}

/** Targets that sell all the given barter goods. */
export const getSellBarterGoodsTargets = (
  barterGoods: (keyof Inventory)[]
): TradeTargets => Object.fromEntries(barterGoods.map((item) => [item, 0]))

/** Whether selling all the given barter goods would change anything in the trade. */
export const hasPlannedBarterGoods = (
  barterGoods: (keyof Inventory)[],
  inventory: Inventory | undefined,
  targets: TradeTargets
) => barterGoods.some((item) => getPlannedAmount(inventory, targets, item) > 0)

/**
 * Gold left to spend on one item once every other change in the trade is
 * paid for.
 */
export const getGoldLeftForItem = (
  gold: number,
  changes: TradeChange[],
  item: keyof Inventory
) => gold + getTradeGold(changes.filter((change) => change.item !== item))

export const getUnit = (item: keyof Inventory, amount: number) =>
  amount === 1 ? MERCHANDISE[item].singleUnit : MERCHANDISE[item].unit

/** An amount with its unit, like "5 crates" or "1 barrel". */
export const formatQuantity = (item: keyof Inventory, amount: number) =>
  `${amount} ${getUnit(item, amount)}`

/** A list of items, like "5 crates of food, 1 barrel of water". */
export const describeItems = (items: TradeChange[]) =>
  items
    .map(({ item, quantity }) => `${formatQuantity(item, quantity)} of ${item}`)
    .join(", ")

/** What was sold and bought, like "Sold 5 crates of food. Bought 1 barrel of water." */
export const describeTrade = (sold: TradeChange[], bought: TradeChange[]) =>
  [
    sold.length && `Sold ${describeItems(sold)}.`,
    bought.length && `Bought ${describeItems(bought)}.`,
  ]
    .filter(Boolean)
    .join(" ")

/** What changing one item from what is owned to the target means. */
export const getItemChange = (
  item: keyof Inventory,
  owned: number,
  target: number
) => {
  const quantity = target - owned

  return {
    action: quantity < 0 ? "Sell" : quantity > 0 ? "Buy" : null,
    amount: Math.abs(quantity),
    gold: getChangeGold({ item, quantity }),
  }
}

/** A number with its sign, like "+110", "−24" or "0". */
export const formatSigned = (value: number) =>
  `${value > 0 ? "+" : value < 0 ? "−" : ""}${Math.abs(value).toLocaleString("en-US")}`

/** A gold amount with its sign, like "+110 gold" or "−24 gold". */
export const formatGold = (gold: number) => `${formatSigned(gold)} gold`

/** The player after a trade, used to update the screen before the server answers. */
export const applyTradeChanges = (player: Player, changes: TradeChange[]) =>
  patchDeep<Player>(player, {
    character: { gold: player.character.gold + getTradeGold(changes) },
    inventory: Object.fromEntries(
      changes.map(({ item, quantity }) => [
        item,
        (player.inventory?.[item] ?? 0) + quantity,
      ])
    ),
  })

/** The toast shown after a successful trade. */
export const getTradeToast = ({
  sold,
  bought,
  gold,
}: {
  sold: TradeChange[]
  bought: TradeChange[]
  gold: number
}) => ({
  title:
    gold > 0
      ? `You received ${gold} gold`
      : gold < 0
        ? `You paid ${-gold} gold`
        : "The trade evened out",
  message: describeTrade(sold, bought),
})

/** What the player owns and will own, like "20 → 10 crates" or "20 crates". */
export const formatAmountChange = (
  item: keyof Inventory,
  owned: number,
  target: number
) =>
  owned === target
    ? formatQuantity(item, owned)
    : `${owned} → ${formatQuantity(item, target)}`
