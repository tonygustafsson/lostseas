export const MEDICINE_HEALTH_PER_BOTTLE = 20

export const getMedicineEffectiveness = (
  noOfCrewMemers: number,
  crewHealth: number,
  medicine: number
) => {
  // Nobody to heal, and dividing by zero would turn into 100
  if (noOfCrewMemers < 1) {
    return crewHealth
  }

  const effectiveness = (medicine / noOfCrewMemers) * MEDICINE_HEALTH_PER_BOTTLE

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
  if (noOfCrewMemers < 1) {
    return crewMood
  }

  const effectiveness = gold / noOfCrewMemers

  if (crewMood + effectiveness > 100) {
    return 100
  }

  return Math.floor(crewMood + effectiveness)
}

export const getMannedCannons = (
  crewMembers: CrewMembers["count"],
  cannons: Inventory["cannons"]
) => {
  if (Math.floor(crewMembers / 2) > (cannons || 0)) {
    return cannons || 0
  }

  return Math.floor(crewMembers / 2)
}

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
