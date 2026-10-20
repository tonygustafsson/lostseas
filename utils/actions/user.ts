import { LOCATIONS } from "@/constants/locations"
import {
  STARTING_CREW_COUNT,
  STARTING_GOLD,
  STARTING_TITLE,
} from "@/constants/player"

import type { ActionResult } from "./types"

type NewPlayerInput = Pick<Character, "name" | "nationality" | "gender" | "age">

/** The starting state of every new player. */
export const createNewPlayer = (
  { name, nationality, gender, age }: NewPlayerInput,
  {
    id,
    createdDate,
    startingTown,
    ship,
  }: {
    id: Player["id"]
    createdDate: number
    startingTown: Town
    ship: Ship
  }
): Player => ({
  id,
  createdDate,
  character: {
    name,
    nationality,
    title: STARTING_TITLE,
    gender,
    age,
    town: startingTown,
    location: LOCATIONS.harbor,
    gold: STARTING_GOLD,
    day: 1,
  },
  inventory: {
    food: 20,
    water: 40,
    cannons: 2,
  },
  ships: {
    [ship.id]: ship,
  },
  crewMembers: {
    count: STARTING_CREW_COUNT,
    health: 100,
    mood: 100,
  },
})

/**
 * Starts the game over with the same character. Name, nationality, gender and
 * age are kept, everything else goes back to how a new player starts.
 */
export const resetGame = (
  player: Player,
  { startingTown, ship }: { startingTown: Town; ship: Ship }
): ActionResult => {
  const { name, nationality, gender, age } = player.character

  return {
    player: createNewPlayer(
      { name, nationality, gender, age },
      {
        id: player.id,
        createdDate: player.createdDate,
        startingTown,
        ship,
      }
    ),
    log: "Started the game over.",
    data: {},
  }
}
