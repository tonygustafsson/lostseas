import { patchDeep } from "@/utils/patchDeep"

/**
 * A valid player standing in the Port Royale shop.
 * Pass deep overrides for the parts a test cares about. Use null to remove a key.
 */
export const createTestPlayer = (overrides: DeepPartial<Player> = {}) => {
  const player: Player = {
    id: "test-player",
    createdDate: 0,
    character: {
      name: "Test",
      characterId: "mateo-salazar",
      nationality: "England",
      title: "Pirate",
      town: "Port Royale",
      location: "Shop",
      gold: 1000,
      day: 10,
    },
    ships: {
      "ship-1": {
        id: "ship-1",
        name: "Test Brig",
        type: "Brig",
        health: 100,
        createdDay: 1,
      },
    },
    crewMembers: { count: 20, health: 100, mood: 80 },
    inventory: { food: 10, water: 20 },
    locationStates: {},
  }

  return patchDeep<Player>(player, overrides)
}

/** Freezes the player so any mutation by the code under test throws. */
export const deepFreeze = <T>(value: T): T => {
  if (value && typeof value === "object") {
    Object.values(value).forEach(deepFreeze)
    Object.freeze(value)
  }

  return value
}
