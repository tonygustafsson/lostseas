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

export type TownLocations = Record<
  Town,
  {
    nation: Nation
    x: number
    y: number
    textAlign?: "bottom" | "right"
    distanceTo?: Record<Town, number>
  }
>

export const TOWN_INFO: TownLocations = {
  "Charles Towne": {
    nation: "England",
    x: 388,
    y: 47,
    textAlign: "bottom",
  },
  Barbados: {
    nation: "England",
    x: 779,
    y: 387,
  },
  "Port Royale": {
    nation: "England",
    x: 452,
    y: 306,
    distanceTo: {
      "Port Royale": 0,
      Havana: 2,
      Leogane: 1,
      Tortuga: 2,
      "San Juan": 2,
      "St. Martin": 3,
      "St. Eustatius": 3,
      Martinique: 3,
      Barbados: 4,
      Bonaire: 3,
      Curacao: 3,
      Panama: 3,
      Belize: 3,
      "Villa Hermosa": 4,
      Biloxi: 4,
      "Charles Towne": 4,
    },
  },
  Belize: {
    nation: "England",
    x: 207,
    y: 303,
    textAlign: "right",
  },
  Tortuga: {
    nation: "France",
    x: 598,
    y: 262,
  },
  Leogane: {
    nation: "France",
    x: 537,
    y: 300,
  },
  Martinique: {
    nation: "France",
    x: 752,
    y: 353,
    textAlign: "right",
  },
  Biloxi: {
    nation: "France",
    x: 259,
    y: 68,
  },
  Panama: {
    nation: "Spain",
    x: 382,
    y: 459,
  },
  Havana: {
    nation: "Spain",
    x: 351,
    y: 204,
  },
  "Villa Hermosa": {
    nation: "Spain",
    x: 133,
    y: 303,
  },
  "San Juan": {
    nation: "Spain",
    x: 661,
    y: 283,
  },
  Bonaire: {
    nation: "Holland",
    x: 610,
    y: 429,
  },
  Curacao: {
    nation: "Holland",
    x: 558,
    y: 405,
  },
  "St. Martin": {
    nation: "Holland",
    x: 720,
    y: 301,
    textAlign: "right",
  },
  "St. Eustatius": {
    nation: "Holland",
    x: 741,
    y: 327,
    textAlign: "right",
  },
}
