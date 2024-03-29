export const SHIP_TYPES = {
  Brig: {
    minCrewMembers: 2,
    maxCrewMembers: 20,
    buy: 1500,
    sell: 750,
    description: "This is a standard ship. Affordable and quite basic.",
  },
  Merchantman: {
    minCrewMembers: 1,
    maxCrewMembers: 10,
    buy: 1000,
    sell: 500,
    description:
      "This ship is great for loading a lot of barter goods but is weak in battle.",
  },
  Galleon: {
    minCrewMembers: 4,
    maxCrewMembers: 50,
    buy: 4000,
    sell: 2000,
    description: "This is a war ship, great in battle.",
  },
  Frigate: {
    minCrewMembers: 8,
    maxCrewMembers: 100,
    buy: 10000,
    sell: 5000,
    description:
      "This is the top of the line battle ship. Quite costly but can handle a huge crew and a lot of cannons.",
  },
}

export const SHIP_REPAIR_COST = 5 // per 1% of damage
