export const getLandingTips = (player?: Player) => {
  const tips: LandingTip[] = []

  if (!player) {
    return []
  }

  const arbitraryJourneyLength = 5

  const tooMuchGold = player.character.gold > 1000
  const playerHasCrew = player.crewMembers.count > 0
  const crewIsAngry = player.crewMembers.mood <= 0
  const crewIsIll = player.crewMembers.health <= 0
  const shipsAreDamaged = Object.values(player.ships || {}).some(
    (ship) => ship.health <= 0
  )
  const neededFood = Math.round(
    arbitraryJourneyLength * (player.crewMembers.count * 0.1)
  )
  const neededWater = Math.round(
    arbitraryJourneyLength * (player.crewMembers.count * 0.2)
  )
  const needMoreFood = (player.inventory?.food || 0) >= neededFood
  const needMoreWater = (player.inventory?.water || 0) >= neededWater

  if (tooMuchGold) {
    tips.push("TOO_MUCH_GOLD")
  }

  if (shipsAreDamaged) {
    tips.push("DAMAGED_SHIPS")
  }

  if (!playerHasCrew) {
    tips.push("NO_CREW")
  }

  if (crewIsAngry) {
    tips.push("ANGRY_CREW")
  }

  if (crewIsIll) {
    tips.push("CREW_IS_ILL")
  }

  if (!needMoreFood) {
    tips.push("NEED_MORE_FOOD")
  }

  if (!needMoreWater) {
    tips.push("NEED_MORE_WATER")
  }

  return tips
}
