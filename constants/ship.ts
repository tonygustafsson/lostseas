export const SHIP_TYPES = {
  Brig: {
    cargoCapacity: 300,
    minCrewMembers: 2,
    maxCrewMembers: 20,
    buy: 1500,
    sell: 750,
    description:
      "A sturdy all-rounder that is cheap to buy, with a fair hold and a modest crew.",
  },
  Merchantman: {
    cargoCapacity: 800,
    minCrewMembers: 1,
    maxCrewMembers: 10,
    buy: 1000,
    sell: 500,
    description:
      "This ship is great for loading a lot of barter goods but is weak in battle.",
  },
  Galleon: {
    cargoCapacity: 500,
    minCrewMembers: 4,
    maxCrewMembers: 50,
    buy: 4000,
    sell: 2000,
    description:
      "A heavily armed warship with a stout hull and a large crew, built for battle.",
  },
  Frigate: {
    cargoCapacity: 1000,
    minCrewMembers: 8,
    maxCrewMembers: 100,
    buy: 10000,
    sell: 5000,
    description:
      "The finest warship afloat. Costly, but she carries a huge crew and many guns.",
  },
}

export const SHIP_REPAIR_COST = 5 // per 1% of damage
export const REPAIR_KIT_HEALTH = 10 // percentage points per kit, per ship
