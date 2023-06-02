export const TOWNS = [
  "Charles Towne",
  "Belize",
  "Port Royale",
  "Barbados",
  "Martinique",
  "Biloxi",
  "Tortuga",
  "Leogane",
  "Curacao",
  "St. Eustatius",
  "Bonaire",
  "St. Martin",
  "Panama",
  "San Juan",
  "Havana",
  "Villa Hermosa",
] as Town[]

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
