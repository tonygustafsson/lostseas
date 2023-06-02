const englishTowns = ["Charles Towne", "Belize", "Port Royale", "Barbados"]
const frenchTowns = ["Martinique", "Biloxi", "Tortuga", "Leogane"]
const spanishTowns = ["Panama", "San Juan", "Havana", "Villa Hermosa"]
const dutchTowns = ["Curacao", "St. Eustatius", "Bonaire", "St. Martin"]

const getTownNation = (town: Town | undefined): Nation | undefined => {
  if (!town) return undefined

  if (englishTowns.includes(town)) return "England"
  if (frenchTowns.includes(town)) return "France"
  if (spanishTowns.includes(town)) return "Spain"
  if (dutchTowns.includes(town)) return "Holland"
}

export default getTownNation
