export const isPositiveSafeInteger = (value: unknown): value is number =>
  typeof value === "number" && Number.isSafeInteger(value) && value > 0

/** Groups thousands, like 12,500. */
export const formatNumber = (value: number) => value.toLocaleString("en-US")

/** An amount of gold for players to read, like 12,500 gold. A missing amount counts as 0. */
export const formatGold = (gold = 0) => `${formatNumber(gold)} gold`
