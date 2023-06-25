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
