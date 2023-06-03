export const TOWNS = {
  England: ["Charles Towne", "Belize", "Port Royale", "Barbados"],
  France: ["Martinique", "Biloxi", "Tortuga", "Leogane"],
  Spain: ["Panama", "San Juan", "Havana", "Villa Hermosa"],
  Holland: ["Curacao", "St. Eustatius", "Bonaire", "St. Martin"],
} as Record<Nation, Town[]>

export const NATIONS = ["England", "France", "Spain", "Holland"] as Nation[]

export const LOCATIONS = {
  bank: "Bank",
  tavern: "Tavern",
  market: "Market",
  shop: "Shop",
  shipyard: "Shipyard",
  cityhall: "City hall",
  docks: "Docks",
  harbor: "Harbor",
  sea: "Sea",
} as Record<string, TownLocation | SeaLocation>
