const towns = {
  England: ["Charles Towne", "Belize", "Port Royale", "Barbados"],
  France: ["Martinique", "Biloxi", "Tortuga", "Leogane"],
  Spain: ["Panama", "San Juan", "Havana", "Villa Hermosa"],
  Holland: ["Curacao", "St. Eustatius", "Bonaire", "St. Martin"],
}

export const getTownsNationality = (
  town: Town | undefined
): Nation | undefined => {
  if (!town) return undefined

  if (towns.England.includes(town)) return "England"
  if (towns.France.includes(town)) return "France"
  if (towns.Spain.includes(town)) return "Spain"
  if (towns.Holland.includes(town)) return "Holland"
}

export const getRandomTown = (nation: Nation) => {
  const nationTowns = towns[nation]
  return nationTowns[Math.floor(Math.random() * nationTowns.length)] as Town
}
