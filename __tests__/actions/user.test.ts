import { describe, expect, it } from "vitest"

import { NATIONS, TOWNS } from "@/constants/locations"
import { createNewPlayer } from "@/utils/actions/user"
import { getRandomTown } from "@/utils/location"
import { validateShipCrewRequirements } from "@/utils/validateCrew"

const ship: Ship = {
  id: "ship-1",
  name: "Starter",
  type: "Brig",
  health: 100,
  createdDay: 0,
}

const createPlayer = (nationality: Nation = "England") =>
  createNewPlayer(
    { name: "Anne", nationality, gender: "Female", age: 25 },
    { id: "player-1", createdDate: 123, startingTown: "Port Royale", ship }
  )

describe("createNewPlayer", () => {
  it("starts as a Pirate in the harbor with gold, supplies and one brig", () => {
    expect(createPlayer()).toEqual({
      id: "player-1",
      createdDate: 123,
      character: {
        name: "Anne",
        nationality: "England",
        title: "Pirate",
        gender: "Female",
        age: 25,
        town: "Port Royale",
        location: "Harbor",
        gold: 300,
        day: 1,
      },
      inventory: { food: 20, water: 40, cannons: 2 },
      ships: { "ship-1": ship },
      crewMembers: { count: 4, health: 100, mood: 100 },
    })
  })

  it("has a crew that fits the starting ship", () => {
    const player = createPlayer()

    const { minCrew, maxCrew } = validateShipCrewRequirements(player.ships)

    expect(player.crewMembers.count).toBeGreaterThanOrEqual(minCrew)
    expect(player.crewMembers.count).toBeLessThanOrEqual(maxCrew)
  })
})

describe("starting town", () => {
  it.each(Object.keys(NATIONS) as Nation[])(
    "is always a town of the player's nation (%s)",
    (nation) => {
      for (let i = 0; i < 50; i++) {
        const town = getRandomTown(nation)

        expect(TOWNS[town]?.nation).toBe(nation)
      }
    }
  )
})
