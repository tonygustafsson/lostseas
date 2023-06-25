export type HarborValidationError =
  | "NO_PLAYER"
  | "NO_SHIPS"
  | "NO_CREW"
  | "ANGRY_CREW"
  | "NO_FOOD"
  | "NO_WATER"

export const validateHarbor = (player?: Player) => {
  const errors: HarborValidationError[] = []

  if (!player) {
    errors.push("NO_PLAYER")
    return { success: false, errors }
  }

  const playerHasShips = Object.keys(player.ships || {}).length
  const playerHasCrew = player.crewMembers.count > 0
  const crewIsAngry = player.crewMembers.mood < 10
  const neededFood = player.crewMembers.count * 0.5
  const neededWater = player.crewMembers.count
  const playerHasFood = player.inventory.food >= neededFood
  const playerHasWater = player.inventory.water >= neededWater

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
