export const NATIONS = ["England", "France", "Spain", "Holland"] as Nation[]

export const LOCATIONS = {
  shop: "Shop",
  tavern: "Tavern",
  bank: "Bank",
  market: "Market",
  shipyard: "Shipyard",
  docks: "Docks",
  harbor: "Harbor",
  sea: "Sea",
} as Record<string, TownLocation | SeaLocation>

export type TownLocations = Record<
  Town,
  {
    nation: Nation
    map: {
      x: number
      y: number
      textAlign?: "bottom" | "right"
      distanceTo: Record<Town, number>
    }
  }
>

export const TOWNS: TownLocations = {
  "Charles Towne": {
    nation: "England",
    map: {
      x: 388,
      y: 47,
      textAlign: "bottom",
      distanceTo: {
        "Charles Towne": 0,
        Biloxi: 5,
        Havana: 2,
        Belize: 5,
        "Villa Hermosa": 6,
        "Port Royale": 5,
        Leogane: 4,
        Tortuga: 4,
        "San Juan": 5,
        "St. Martin": 5,
        "St. Eustatius": 5,
        Martinique: 6,
        Barbados: 7,
        Bonaire: 6,
        Curacao: 5,
        Panama: 6,
      },
    },
  },
  Barbados: {
    nation: "England",
    map: {
      x: 779,
      y: 387,
      distanceTo: {
        Barbados: 0,
        Martinique: 1,
        "St. Eustatius": 1,
        "St. Martin": 2,
        "San Juan": 2,
        Tortuga: 3,
        Leogane: 3,
        "Port Royale": 4,
        Havana: 5,
        Bonaire: 2,
        Curacao: 3,
        Panama: 5,
        Belize: 7,
        "Villa Hermosa": 9,
        Biloxi: 8,
        "Charles Towne": 6,
      },
    },
  },
  "Port Royale": {
    nation: "England",
    map: {
      x: 452,
      y: 306,
      distanceTo: {
        "Port Royale": 0,
        Havana: 2,
        Leogane: 1,
        Tortuga: 2,
        "San Juan": 3,
        "St. Martin": 3,
        "St. Eustatius": 3,
        Martinique: 3,
        Barbados: 4,
        Bonaire: 3,
        Curacao: 2,
        Panama: 2,
        Belize: 3,
        "Villa Hermosa": 5,
        Biloxi: 5,
        "Charles Towne": 5,
      },
    },
  },
  Belize: {
    nation: "England",
    map: {
      x: 207,
      y: 303,
      textAlign: "right",
      distanceTo: {
        Belize: 0,
        "Villa Hermosa": 4,
        Havana: 2,
        Biloxi: 4,
        "Charles Towne": 5,
        Panama: 3,
        Curacao: 5,
        Bonaire: 5,
        Barbados: 7,
        Martinique: 6,
        "St. Eustatius": 6,
        "St. Martin": 6,
        "San Juan": 6,
        Tortuga: 5,
        Leogane: 4,
        "Port Royale": 3,
      },
    },
  },
  Tortuga: {
    nation: "France",
    map: {
      x: 598,
      y: 262,
      distanceTo: {
        Tortuga: 0,
        Leogane: 1,
        "San Juan": 1,
        "Port Royale": 2,
        "St. Martin": 2,
        "St. Eustatius": 2,
        Martinique: 3,
        Barbados: 3,
        Bonaire: 3,
        Curacao: 3,
        Panama: 5,
        Belize: 5,
        "Villa Hermosa": 7,
        Biloxi: 5,
        "Charles Towne": 4,
        Havana: 3,
      },
    },
  },
  Leogane: {
    nation: "France",
    map: {
      x: 537,
      y: 300,
      distanceTo: {
        Leogane: 0,
        "Port Royale": 1,
        Tortuga: 1,
        "San Juan": 2,
        "St. Martin": 2,
        "St. Eustatius": 3,
        Martinique: 3,
        Barbados: 3,
        Bonaire: 3,
        Curacao: 3,
        Panama: 3,
        Belize: 4,
        "Villa Hermosa": 7,
        Biloxi: 5,
        "Charles Towne": 4,
        Havana: 4,
      },
    },
  },
  Martinique: {
    nation: "France",
    map: {
      x: 752,
      y: 353,
      textAlign: "right",
      distanceTo: {
        Martinique: 0,
        "St. Eustatius": 1,
        "St. Martin": 1,
        "San Juan": 2,
        Barbados: 1,
        Tortuga: 3,
        Leogane: 3,
        "Port Royale": 4,
        Havana: 6,
        Bonaire: 3,
        Curacao: 3,
        Panama: 5,
        Belize: 6,
        "Villa Hermosa": 9,
        Biloxi: 8,
        "Charles Towne": 6,
      },
    },
  },
  Biloxi: {
    nation: "France",
    map: {
      x: 259,
      y: 68,
      distanceTo: {
        Biloxi: 0,
        "Charles Towne": 5,
        Havana: 2,
        Belize: 3,
        "Villa Hermosa": 3,
        Panama: 5,
        Curacao: 6,
        Bonaire: 7,
        Barbados: 8,
        Martinique: 8,
        "St. Eustatius": 8,
        "St. Martin": 8,
        "San Juan": 8,
        Tortuga: 5,
        Leogane: 5,
        "Port Royale": 4,
      },
    },
  },
  Panama: {
    nation: "Spain",
    map: {
      x: 382,
      y: 459,
      distanceTo: {
        Panama: 0,
        Curacao: 2,
        Bonaire: 3,
        Belize: 4,
        "Villa Hermosa": 6,
        Biloxi: 5,
        "Charles Towne": 6,
        Havana: 4,
        Tortuga: 4,
        Leogane: 3,
        "Port Royale": 2,
        "San Juan": 4,
        "St. Martin": 5,
        "St. Eustatius": 5,
        Martinique: 5,
        Barbados: 5,
      },
    },
  },
  Havana: {
    nation: "Spain",
    map: {
      x: 351,
      y: 204,
      distanceTo: {
        Havana: 0,
        Biloxi: 2,
        "Charles Towne": 2,
        Belize: 2,
        "Villa Hermosa": 4,
        Panama: 4,
        Curacao: 4,
        Bonaire: 5,
        Barbados: 7,
        Martinique: 6,
        "St. Eustatius": 6,
        "St. Martin": 5,
        "San Juan": 4,
        Tortuga: 3,
        Leogane: 3,
        "Port Royale": 3,
      },
    },
  },
  "Villa Hermosa": {
    nation: "Spain",
    map: {
      x: 133,
      y: 303,
      distanceTo: {
        "Villa Hermosa": 0,
        Belize: 4,
        "Charles Towne": 5,
        Biloxi: 3,
        Havana: 4,
        Panama: 5,
        Curacao: 6,
        Bonaire: 7,
        Barbados: 8,
        Martinique: 7,
        "St. Eustatius": 7,
        "St. Martin": 7,
        "San Juan": 7,
        Tortuga: 7,
        Leogane: 6,
        "Port Royale": 4,
      },
    },
  },
  "San Juan": {
    nation: "Spain",
    map: {
      x: 661,
      y: 283,
      distanceTo: {
        "San Juan": 0,
        "St. Martin": 1,
        "St. Eustatius": 1,
        Martinique: 1,
        Barbados: 2,
        Tortuga: 1,
        Leogane: 2,
        "Port Royale": 3,
        Biloxi: 6,
        "Charles Towne": 4,
        Havana: 4,
        Belize: 5,
        "Villa Hermosa": 8,
        Panama: 4,
        Curacao: 2,
        Bonaire: 2,
      },
    },
  },
  Bonaire: {
    nation: "Holland",
    map: {
      x: 610,
      y: 429,
      distanceTo: {
        Bonaire: 0,
        Curacao: 1,
        Panama: 3,
        Barbados: 2,
        Martinique: 2,
        "St. Eustatius": 2,
        "St. Martin": 2,
        "San Juan": 2,
        Tortuga: 2,
        Leogane: 2,
        "Port Royale": 3,
        Belize: 5,
        "Villa Hermosa": 7,
        Biloxi: 7,
        "Charles Towne": 6,
        Havana: 5,
      },
    },
  },
  Curacao: {
    nation: "Holland",
    map: {
      x: 558,
      y: 405,
      distanceTo: {
        Curacao: 0,
        Bonaire: 1,
        Panama: 2,
        Barbados: 3,
        Martinique: 3,
        "St. Eustatius": 3,
        "St. Martin": 3,
        "San Juan": 2,
        Tortuga: 2,
        Leogane: 2,
        "Port Royale": 2,
        Belize: 4,
        "Villa Hermosa": 6,
        Biloxi: 6,
        "Charles Towne": 5,
        Havana: 4,
      },
    },
  },
  "St. Martin": {
    nation: "Holland",
    map: {
      x: 720,
      y: 301,
      textAlign: "right",
      distanceTo: {
        "St. Martin": 0,
        "St. Eustatius": 1,
        Martinique: 1,
        Barbados: 2,
        "San Juan": 1,
        Tortuga: 2,
        Leogane: 2,
        "Port Royale": 3,
        Biloxi: 6,
        "Charles Towne": 5,
        Havana: 5,
        Belize: 6,
        "Villa Hermosa": 8,
        Panama: 5,
        Curacao: 3,
        Bonaire: 2,
      },
    },
  },
  "St. Eustatius": {
    nation: "Holland",
    map: {
      x: 741,
      y: 327,
      textAlign: "right",
      distanceTo: {
        "St. Eustatius": 0,
        "St. Martin": 1,
        Martinique: 1,
        "San Juan": 1,
        Barbados: 1,
        Tortuga: 2,
        Leogane: 3,
        "Port Royale": 4,
        Biloxi: 7,
        "Charles Towne": 5,
        Havana: 5,
        Belize: 6,
        "Villa Hermosa": 8,
        Panama: 5,
        Curacao: 3,
        Bonaire: 2,
      },
    },
  },
}
