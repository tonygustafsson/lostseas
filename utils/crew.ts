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

export const getDoubloonsEffectiveness = (
  noOfCrewMemers: number,
  crewMood: number,
  doubloons: number
) => {
  const effectiveness = doubloons / noOfCrewMemers

  if (crewMood + effectiveness > 100) {
    return 100
  }

  return Math.floor(crewMood + effectiveness)
}
