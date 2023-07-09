export const getMedicineEffectiveness = (
  noOfCrewMemers: number,
  crewHealth: number,
  medicine: number
) => {
  const effectiveness = (medicine / noOfCrewMemers) * 10

  if (crewHealth + effectiveness > 100) {
    return 100
  }

  return Math.floor(crewHealth + effectiveness)
}

export const getGoldEffectiveness = (
  noOfCrewMemers: number,
  crewMood: number,
  gold: number
) => {
  const effectiveness = gold / noOfCrewMemers

  if (crewMood + effectiveness > 100) {
    return 100
  }

  return Math.floor(crewMood + effectiveness)
}

export const getMannedCannons = (
  crewMembers: CrewMembers["count"],
  cannons: Inventory["cannons"]
) => Math.floor(crewMembers / cannons)

export const decreaseCrewHealth = (
  currentHealth: CrewMembers["health"],
  amount: number
) => {
  if (currentHealth - amount < 0) {
    return 0
  }

  return currentHealth - amount
}

export const increaseCrewMood = (
  currentMood: CrewMembers["mood"],
  amount: number
) => {
  if (currentMood + amount > 100) {
    return 100
  }

  return currentMood + amount
}
