import {
  APOTHECARY_PRICE_PER_POINT,
  APOTHECARY_REMEDIES,
  type Remedy,
} from "@/constants/apothecary"

/** Health points a remedy heals, capped at 100%. */
export const getRemedyHealing = (health: number, remedy: Remedy) => {
  // Broken saved data heals nothing rather than charging NaN gold
  if (!Number.isFinite(health)) {
    return 0
  }

  const currentHealth = Math.min(Math.max(health, 0), 100)

  return Math.min(
    APOTHECARY_REMEDIES[remedy].healthIncrease,
    100 - currentHealth
  )
}

/** Gold for a remedy for the whole crew. Healing past 100% is wasted, not refunded. */
export const getRemedyPrice = (crewCount: number, remedy: Remedy) =>
  Math.ceil(
    APOTHECARY_PRICE_PER_POINT *
      crewCount *
      APOTHECARY_REMEDIES[remedy].healthIncrease
  )

/**
 * Everything a remedy would do for the crew, shared by the server action and the UI
 * so they always agree. Broken saved data (missing or NaN values) gives no crew or
 * no healing rather than NaN.
 */
export const getRemedyResult = (
  { count, health }: Pick<CrewMembers, "count" | "health">,
  remedy: Remedy
) => {
  const hasCrew = Number.isFinite(count) && count > 0
  const currentHealth = Number.isFinite(health)
    ? Math.min(Math.max(health, 0), 100)
    : 0
  const healed = getRemedyHealing(health, remedy)

  return {
    hasCrew,
    currentHealth,
    healed,
    newHealth: currentHealth + healed,
    price: hasCrew ? getRemedyPrice(count, remedy) : 0,
  }
}
