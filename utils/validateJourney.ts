export type JourneyValidationError =
  | "NO_PLAYER"
  | "NO_SHIPS"
  | "NO_CREW"
  | "ANGRY_CREW"
  | "NO_FOOD"
  | "NO_WATER"

export const validateJourney = (player?: Player, journeyLength = 0) => {
  const errors: JourneyValidationError[] = []

  if (!player) {
    errors.push("NO_PLAYER")
    return { success: false, errors }
  }

  const playerHasShips = Object.keys(player.ships || {}).length
  const playerHasCrew = player.crewMembers.count > 0
  const crewIsAngry = player.crewMembers.mood <= 0
  const neededFood = Math.round(
    journeyLength * (player.crewMembers.count * 0.1)
  )
  console.log({ journeyLength, neededFood, crew: player.crewMembers.count })
  const neededWater = Math.round(
    journeyLength * (player.crewMembers.count * 0.2)
  )
  const playerHasFood = (player.inventory?.food || 0) >= neededFood
  const playerHasWater = (player.inventory?.water || 0) >= neededWater

  if (!playerHasShips) {
    errors.push("NO_SHIPS")
  }

  if (!playerHasCrew) {
    errors.push("NO_CREW")
  }

  if (crewIsAngry) {
    errors.push("ANGRY_CREW")
  }

  if (!playerHasFood) {
    errors.push("NO_FOOD")
  }

  if (!playerHasWater) {
    errors.push("NO_WATER")
  }

  return { success: !errors.length, errors, neededFood, neededWater }
}
