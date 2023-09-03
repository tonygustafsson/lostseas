import { validateShipCrewRequirements } from "./validateCrew"

export const validateJourney = (player?: Player, journeyLength = 0) => {
  const errors: JourneyValidationError[] = []

  if (!player) {
    errors.push("NO_PLAYER")
    return {
      success: false,
      errors,
      neededFood: 0,
      neededWater: 0,
      minCrew: 0,
      maxCrew: 0,
    }
  }

  const playerHasShips = Object.keys(player.ships || {}).length
  const crewIsAngry = player.crewMembers.mood <= 0
  const crewIsIll = player.crewMembers.health <= 0
  const shipsAreDamaged = Object.values(player.ships || {}).some(
    (ship) => ship.health <= 0
  )
  const neededFood = Math.round(
    journeyLength * (player.crewMembers.count * 0.1)
  )
  const neededWater = Math.round(
    journeyLength * (player.crewMembers.count * 0.2)
  )
  const playerHasFood = (player.inventory?.food || 0) >= neededFood
  const playerHasWater = (player.inventory?.water || 0) >= neededWater
  const { minCrew, maxCrew } = validateShipCrewRequirements(player.ships)

  if (!playerHasShips) {
    errors.push("NO_SHIPS")
  }

  if (shipsAreDamaged) {
    errors.push("DAMAGED_SHIPS")
  }

  if (player.crewMembers.count < minCrew) {
    errors.push("NOT_ENOUGH_CREW_MEMBERS")
  }

  if (player.crewMembers.count > maxCrew) {
    errors.push("TOO_MANY_CREW_MEMBERS")
  }

  if (crewIsAngry) {
    errors.push("ANGRY_CREW")
  }

  if (crewIsIll) {
    errors.push("CREW_IS_ILL")
  }

  if (!playerHasFood) {
    errors.push("NO_FOOD")
  }

  if (!playerHasWater) {
    errors.push("NO_WATER")
  }

  return {
    success: !errors.length,
    errors,
    neededFood,
    neededWater,
    minCrew,
    maxCrew,
  } as JourneyValidation
}
