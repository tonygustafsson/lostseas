import { describe, expect, it } from "vitest"

import { NATIONS, TOWNS } from "@/constants/locations"
import { createNewPlayer, resetGame } from "@/utils/actions/user"
import { getRandomTown } from "@/utils/location"
import { validateShipCrewRequirements } from "@/utils/validateCrew"

import { createTestPlayer } from "../helpers/createTestPlayer"

const ship: Ship = {
  id: "ship-1",
  name: "Starter",
  type: "Brig",
  health: 100,
  createdDay: 0,
}

const createPlayer = (nationality: Nation = "England") =>
  createNewPlayer(
    { name: "Anne", nationality, characterId: "anne-calloway" },
    { id: "player-1", createdDate: 123, startingTown: "Port Royale", ship }
  )

describe("createNewPlayer", () => {
  it("starts as a Pirate in the harbor with gold, supplies and one brig", () => {
    expect(createPlayer()).toEqual({
      id: "player-1",
      createdDate: 123,
      character: {
        name: "Anne",
        characterId: "anne-calloway",
        nationality: "England",
        title: "Pirate",
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

  it("sets characterId when one is given", () => {
    const player = createNewPlayer(
      {
        name: "Anne",
        nationality: "England",
        characterId: "anne-calloway",
      },
      { id: "player-1", createdDate: 123, startingTown: "Port Royale", ship }
    )

    expect(player.character.characterId).toBe("anne-calloway")
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

describe("resetGame", () => {
  const veteran = createTestPlayer({
    id: "player-1",
    createdDate: 123,
    character: {
      name: "Anne",
      characterId: "anne-calloway",
      nationality: "France",
      title: "Duke",
      gold: 90000,
      account: 5000,
      highestRewardedTitle: "Duke",
      battles: { Pirate: { won: 12 } },
      loan: 200,
      day: 400,
      town: "Tortuga",
    },
    inventory: { cannons: 40, rum: 30, sugar: 12, food: 300, water: 500 },
    crewMembers: { count: 120, health: 40, mood: 10 },
  })

  it("keeps who the player is and starts everything else over", () => {
    const result = resetGame(veteran, { startingTown: "Martinique", ship })

    if ("error" in result) throw new Error(result.error)

    expect(result.player).toEqual(
      createNewPlayer(
        { name: "Anne", nationality: "France", characterId: "anne-calloway" },
        {
          id: "player-1",
          createdDate: 123,
          startingTown: "Martinique",
          ship,
        }
      )
    )
    expect(result.log).toMatchObject({
      type: "beginning",
      message: "Started the game over.",
    })
  })

  it("keeps the portrait the player picked", () => {
    const withPortrait = createTestPlayer({
      character: { characterId: "anne-calloway" },
    })

    const result = resetGame(withPortrait, { startingTown: "Martinique", ship })

    if ("error" in result) throw new Error(result.error)

    expect(result.player.character.characterId).toBe("anne-calloway")
  })

  it("does not change the original player", () => {
    resetGame(veteran, { startingTown: "Martinique", ship })

    expect(veteran.character.gold).toBe(90000)
  })
})
