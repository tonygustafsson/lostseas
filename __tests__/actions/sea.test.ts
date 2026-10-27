import { afterEach, describe, expect, it, vi } from "vitest"

import { TOWNS } from "@/constants/locations"
import {
  attackShip,
  battleMove,
  continueJourney,
  ignoreShip,
  startJourney,
  takeLoot,
  takeLootAndSail,
} from "@/utils/actions/sea"
import { getVictoryUpdate } from "@/utils/battleOutcome"
import { patchDeep } from "@/utils/patchDeep"
import { BATTLE_MAX_ROUNDS } from "@/utils/seaBattle"

import { createTestPlayer, deepFreeze } from "../helpers/createTestPlayer"
import { createSeededRandom } from "../helpers/seededRandom"

const ALL_TOWNS = Object.keys(TOWNS) as Town[]

const shipMeeting: ShipMeetingState = {
  nation: "France",
  shipType: "Galleon",
  crewMembers: 16,
  cannons: 8,
}

/** A player ready to leave Port Royale: enough crew, supplies and cannons. */
const inPort = (overrides: DeepPartial<Player> = {}) =>
  deepFreeze(
    patchDeep<Player>(
      createTestPlayer({
        character: { location: "Harbor" },
        crewMembers: { count: 10, health: 100, mood: 80 },
        inventory: { food: 50, water: 100, cannons: 5 },
      }),
      overrides
    )
  )

/** A player on day 3 of 7 sailing to Havana. */
const atSea = (sea: Partial<SeaState> = {}, journeyDay = 3) =>
  deepFreeze(
    patchDeep<Player>(
      createTestPlayer({
        character: {
          town: null,
          location: "Sea",
          day: 20,
          journey: {
            origin: "Port Royale",
            destination: "Havana",
            day: journeyDay,
            totalDays: 7,
          },
        },
        crewMembers: { count: 10, health: 90, mood: 50 },
        inventory: { food: 50, water: 100, cannons: 5 },
      }),
      { locationStates: { sea: { shipMeeting: null, ...sea } } }
    )
  )

const inBattle = (battle: BattleState = startBattle()) =>
  atSea({ shipMeeting, battle })

const startBattle = (): BattleState => ({
  enemyStrength: 100,
  playerStrength: 100,
})

/** Always returns the same value instead of Math.random. */
const always = (value: number) => () => value

const NO_SHIP = always(0.99)
const MEET_SHIP = always(0)

type Result =
  | { error: string; status?: number }
  | { blocked: true }
  | { player: Player; log?: GameLog; data: object }

const expectSuccess = <T extends Result>(result: T) => {
  if ("error" in result) {
    throw new Error(`Expected success but got error: ${result.error}`)
  }

  if ("blocked" in result) {
    throw new Error("Expected success but the journey was blocked")
  }

  return result as Extract<T, { player: Player }>
}

const expectError = (result: Result, error: string, status = 400) => {
  expect(result).toEqual({ error, status })
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe("startJourney", () => {
  it("sets sail with the known distance between towns", () => {
    const player = inPort()

    const result = expectSuccess(startJourney(player, { town: "Havana" }))

    const distance = TOWNS["Port Royale"].map.distanceTo.Havana

    expect(result.player.character).toMatchObject({
      location: "Sea",
      day: player.character.day,
      journey: {
        origin: "Port Royale",
        destination: "Havana",
        day: 1,
        totalDays: distance,
      },
    })
    expect(result.player.character.town).toBeUndefined()
    expect(result.log).toMatchObject({
      type: "voyage",
      message: `Started journey to Havana. Expected arrival in ${distance} days.`,
    })
  })

  it("clears town events like tavern sailors and market offers", () => {
    const player = inPort({
      locationStates: {
        tavern: { visited: true, noOfSailors: 4, isHostile: false },
      },
    })

    const result = expectSuccess(startJourney(player, { town: "Havana" }))

    expect(result.player.locationStates).toBeUndefined()
  })

  it.each([
    [0, 3],
    [0.5, 6],
    [0.99, 8],
  ])(
    "takes 3 to 8 days without a known distance (random %d gives %i)",
    (roll, days) => {
      const player = inPort({ character: { town: null } })

      const result = expectSuccess(
        startJourney(player, { town: "Havana" }, always(roll))
      )

      expect(result.player.character.journey?.totalDays).toBe(days)
      expect(result.player.character.journey?.origin).toBeUndefined()
    }
  )

  it.each(["Atlantis", "", undefined, 5, "constructor"])(
    "rejects destination %s",
    (town) => {
      expectError(
        startJourney(inPort(), { town } as never),
        "Invalid destination"
      )
    }
  )

  it("rejects a second journey", () => {
    expectError(
      startJourney(atSea(), { town: "Havana" }),
      "Character is already on a journey"
    )
  })

  it("rejects sailing from the sea without a journey", () => {
    expectError(
      startJourney(inPort({ character: { location: "Sea" } }), {
        town: "Havana",
      }),
      "You can only start a journey from land."
    )
  })

  it("rejects sailing to the current town", () => {
    expectError(
      startJourney(inPort(), { town: "Port Royale" }),
      "You are already at this destination."
    )
  })

  it.each<[string, DeepPartial<Player>]>([
    ["no ships", { ships: null }],
    ["damaged ships", { ships: { "ship-1": { health: 0 } } }],
    ["too few crew", { crewMembers: { count: 1 } }],
    ["too many crew", { crewMembers: { count: 21 } }],
    ["angry crew", { crewMembers: { mood: 0 } }],
    ["ill crew", { crewMembers: { health: 0 } }],
    // Havana is 2 days away: 10 crew need 2 food and 4 water
    ["too little food", { inventory: { food: 1 } }],
    ["too little water", { inventory: { water: 3 } }],
  ])("is blocked by %s", (_, overrides) => {
    expect(startJourney(inPort(overrides), { town: "Havana" })).toEqual({
      blocked: true,
    })
  })

  it("needs supplies for the distance to the destination", () => {
    // 3 days of food: enough for 1-day Leogane, not for 5-day Biloxi
    const player = inPort({ inventory: { food: 3 } })

    expectSuccess(startJourney(player, { town: "Leogane" }))
    expect(startJourney(player, { town: "Biloxi" })).toEqual({ blocked: true })
  })
})

describe("continueJourney", () => {
  it("sails one day, uses supplies and lowers mood", () => {
    const player = atSea()

    const result = expectSuccess(continueJourney(player, NO_SHIP))

    expect(result.player.character.day).toBe(21)
    expect(result.player.character.journey?.day).toBe(4)
    expect(result.player.inventory).toMatchObject({ food: 49, water: 98 })
    expect(result.player.crewMembers.mood).toBe(49)
    expect(result.log).toBeUndefined()
    expect(result.data).toEqual({
      day: 4,
      totalDays: 7,
      destination: "Havana",
      destinationReached: false,
      shipMeetingState: null,
    })
  })

  it("meets a ship a third of the time", () => {
    const met = [0, 0.32, 0.33, 0.9].map(
      (roll) =>
        expectSuccess(continueJourney(atSea(), always(roll))).data
          .shipMeetingState !== null
    )

    expect(met).toEqual([true, true, false, false])
  })

  it("stores the met ship and pauses there", () => {
    const result = expectSuccess(continueJourney(atSea(), MEET_SHIP))

    const meeting = result.data.shipMeetingState

    expect(meeting).not.toBeNull()
    expect(result.player.locationStates?.sea?.shipMeeting).toEqual(meeting)
  })

  it("never meets another ship right after one", () => {
    const result = expectSuccess(
      continueJourney(atSea({ justMetAShip: true }), MEET_SHIP)
    )

    expect(result.data.shipMeetingState).toBeNull()
    expect(result.player.locationStates?.sea?.justMetAShip).toBeUndefined()
  })

  it("uses whole units and stops supplies at zero", () => {
    const player = patchDeep<Player>(atSea(), {
      crewMembers: { count: 15 },
      inventory: { food: 1, water: 2 },
    })

    const result = expectSuccess(continueJourney(player, NO_SHIP))

    // 15 crew use 2 food and 3 water a day: 1 - 2 → 0, 2 - 3 → 0
    expect(result.player.inventory?.food).toBe(0)
    expect(result.player.inventory?.water).toBe(0)
  })

  it("runs a small crew out of food, at least one crate a day", () => {
    // 5 crew use 1 crate a day, so 10 crates last exactly 10 days
    let player: Player = patchDeep<Player>(atSea({}, 1), {
      character: { journey: { totalDays: 30 } },
      crewMembers: { count: 5 },
      inventory: { food: 10, water: 100 },
    })

    const foodPerDay: number[] = []

    for (let day = 0; day < 11; day++) {
      const result = expectSuccess(continueJourney(player, NO_SHIP))

      foodPerDay.push(result.player.inventory?.food ?? 0)
      player = result.player
    }

    expect(foodPerDay).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 0])
  })

  it("uses no supplies without a crew", () => {
    const player = patchDeep<Player>(atSea(), { crewMembers: { count: 0 } })

    const result = expectSuccess(continueJourney(player, NO_SHIP))

    expect(result.player.inventory).toMatchObject({ food: 50, water: 100 })
  })

  it.each([
    [1, 0],
    [0, 0],
  ])("lowers mood from %i to %i and never below 0", (mood, expected) => {
    const player = patchDeep<Player>(atSea(), { crewMembers: { mood } })

    const result = expectSuccess(continueJourney(player, NO_SHIP))

    expect(result.player.crewMembers.mood).toBe(expected)
  })

  it("arrives on the last day, advances the date and saves a log", () => {
    const result = expectSuccess(continueJourney(atSea({}, 7), MEET_SHIP))

    expect(result.player.character).toMatchObject({
      town: "Havana",
      location: "Harbor",
      day: 21,
    })
    expect(result.player.character.journey).toBeUndefined()
    expect(result.player.locationStates?.harbor?.lastHarborReason).toBe(
      "arrived"
    )
    expect(result.player.inventory).toMatchObject({ food: 49, water: 98 })
    // Arrival does not lower mood
    expect(result.player.crewMembers.mood).toBe(50)
    expect(result.log).toMatchObject({
      type: "voyage",
      message: "Arrived at destination Havana.",
    })
    expect(result.data).toMatchObject({
      destinationReached: true,
      shipMeetingState: null,
    })
  })

  it("does not advance the date after a battle report", () => {
    const report: AttackFailureReport = {
      crewHealthLoss: 10,
      shipHealthLoss: 5,
      sunkShip: false,
      lostMerchandise: {},
    }
    const player = atSea({ justMetAShip: true, attackFailureReport: report })

    const result = expectSuccess(continueJourney(player, NO_SHIP))

    expect(result.player.character.day).toBe(20)
    expect(result.player.character.journey?.day).toBe(3)
    // Resuming after a battle is not a new day, so no supplies or mood are used
    expect(result.player.inventory).toEqual(player.inventory)
    expect(result.player.crewMembers.mood).toBe(player.crewMembers.mood)
    expect(result.player.locationStates?.sea).toEqual({})
    // The response reports the day the player is actually on
    expect(result.data.day).toBe(3)
  })

  it("shows a final-day battle report before arriving", () => {
    const report: AttackFailureReport = {
      crewHealthLoss: 10,
      shipHealthLoss: 5,
      sunkShip: false,
      lostMerchandise: {},
    }
    const player = atSea({ justMetAShip: true, attackFailureReport: report }, 7)

    const resumed = expectSuccess(continueJourney(player, NO_SHIP))

    expect(resumed.player.character.location).toBe("Sea")
    expect(resumed.player.inventory).toEqual(player.inventory)
    expect(resumed.data).toMatchObject({ day: 7, destinationReached: false })

    const arrived = expectSuccess(continueJourney(resumed.player, NO_SHIP))

    expect(arrived.player.character.location).toBe("Harbor")
  })

  it("rejects sailing on during a battle", () => {
    expectError(
      continueJourney(inBattle()),
      "You cannot sail on during a battle.",
      409
    )
  })

  it("rejects sailing on past a ship without attacking or ignoring it", () => {
    expectError(
      continueJourney(atSea({ shipMeeting })),
      "Attack or ignore the ship before sailing on.",
      409
    )
  })

  it("rejects continuing from land", () => {
    expectError(continueJourney(inPort()), "You cannot journey from Harbor.")
  })

  it("rejects a journey without a destination", () => {
    const player = patchDeep<Player>(atSea(), {
      character: { journey: null },
    })

    expectError(continueJourney(player), "Not a valid journey destination.")
  })

  it("rejects a journey that is already finished", () => {
    expectError(
      continueJourney(atSea({}, 8)),
      "Your journey is already finished."
    )
  })
})

describe("takeLoot", () => {
  const report: AttackSuccessReport = {
    crewMoodIncrease: 20,
    crewHealthLoss: 0,
    crewMemberRecruits: 0,
    lootedGold: 0,
    lootedMerchandise: { food: 8, rum: 3, cannons: 2 } as never,
    shipHealthLoss: 0,
  }
  const offer = { food: 8, rum: 3, cannons: 2 }

  // The test Brig carries 300 and has 150 aboard
  const afterVictory = (inventory?: Inventory) =>
    deepFreeze(
      patchDeep<Player>(
        atSea({ attackSuccessReport: report, lootOffer: offer }),
        inventory ? { inventory } : {}
      )
    )

  it("loads the chosen loot and leaves the rest", () => {
    const result = expectSuccess(
      takeLoot(afterVictory(), { loot: { food: 8, rum: 1, cannons: 2 } })
    )
    const sea = result.player.locationStates?.sea

    expect(result.player.inventory).toEqual({
      food: 58,
      water: 100,
      rum: 1,
      cannons: 7,
    })
    expect(sea?.lootOffer).toBeUndefined()
    expect(sea?.attackSuccessReport).toEqual(report)
    expect(result.log).toMatchObject({
      type: "loot",
      message:
        "Took 8 crates of food, 1 barrel of rum, 2 cannons of cannons as loot.",
    })
  })

  it("can leave everything behind", () => {
    const result = expectSuccess(takeLoot(afterVictory(), { loot: {} }))

    expect(result.player.inventory).toEqual(afterVictory().inventory)
    expect(result.log).toMatchObject({
      type: "loot",
      message: "Left the loot behind.",
    })
  })

  it("does not create a report when there is none", () => {
    const result = expectSuccess(
      takeLoot(atSea({ lootOffer: offer }), { loot: { food: 8 } })
    )

    expect(result.player.locationStates?.sea?.attackSuccessReport).toBe(
      undefined
    )
  })

  it("takes cannons into a full hold", () => {
    const full = afterVictory({ food: 200, water: 100, cannons: 5 })

    const result = expectSuccess(takeLoot(full, { loot: { cannons: 2 } }))

    expect(result.player.inventory?.cannons).toBe(7)
  })

  it.each([[{ food: 9 }], [{ silk: 1 }], [{ food: -1 }], [{ food: 1.5 }]])(
    "rejects taking %o",
    (loot) => {
      expectError(
        takeLoot(afterVictory(), { loot }),
        "You cannot take more than the loot holds."
      )
    }
  )

  it("rejects loot that does not fit", () => {
    const nearlyFull = afterVictory({ food: 150, water: 145 })

    expectError(
      takeLoot(nearlyFull, { loot: { food: 6 } }),
      "Not enough cargo space"
    )
  })

  it("rejects a malformed choice", () => {
    expectError(
      takeLoot(afterVictory(), { loot: null as never }),
      "Not a valid loot choice"
    )
  })

  it("rejects taking loot when there is none", () => {
    expectError(
      takeLoot(atSea(), { loot: {} }),
      "There is no loot to take.",
      409
    )
  })

  it("takes the loot and sails on in one go", () => {
    const result = expectSuccess(
      takeLootAndSail(afterVictory(), { loot: { food: 8 } }, NO_SHIP)
    )
    const sea = result.player.locationStates?.sea

    expect(result.player.inventory?.food).toBe(58)
    expect(result.player.inventory?.rum).toBeUndefined()
    expect(sea?.lootOffer).toBeUndefined()
    expect(sea?.attackSuccessReport).toBeUndefined()
    expect(result.data.destinationReached).toBe(false)
    expect(result.log).toEqual({
      type: "loot",
      message: "Took 8 crates of food as loot.",
    })
  })

  it("logs only the loot on the last day, arriving on the next step", () => {
    const lastDay = deepFreeze(
      atSea({ attackSuccessReport: report, lootOffer: offer }, 7)
    )

    const result = expectSuccess(
      takeLootAndSail(lastDay, { loot: { food: 8 } }, NO_SHIP)
    )

    expect(result.data.destinationReached).toBe(false)
    expect(result.log).toEqual({
      type: "loot",
      message: "Took 8 crates of food as loot.",
    })
  })

  it("neither loots nor sails when the choice is invalid", () => {
    expectError(
      takeLootAndSail(afterVictory(), { loot: { food: 9 } }, NO_SHIP),
      "You cannot take more than the loot holds."
    )
  })

  it("takes what fits when sailing on without choosing", () => {
    const nearlyFull = afterVictory({ food: 150, water: 145 })

    const result = expectSuccess(continueJourney(nearlyFull, NO_SHIP))

    // 5 free go to food. Cannons take no space and join the 5 aboard
    expect(result.player.inventory?.food).toBe(155)
    expect(result.player.inventory?.rum).toBeUndefined()
    expect(result.player.inventory?.cannons).toBe(7)
    expect(result.player.locationStates?.sea?.lootOffer).toBeUndefined()
  })
})

describe("attackShip", () => {
  it("starts a battle at full strength without resolving it", () => {
    const result = expectSuccess(attackShip(atSea({ shipMeeting })))

    expect(result.player.locationStates?.sea?.battle).toEqual({
      enemyStrength: 100,
      playerStrength: 100,
      rounds: [],
    })
    expect(result.player.locationStates?.sea?.shipMeeting).toEqual(shipMeeting)
    expect(result.log).toMatchObject({
      type: "attack",
      message: "Attacked a ship from France.",
    })
  })

  it("rejects attacking without a ship", () => {
    expectError(attackShip(atSea()), "You are not currently meeting a ship")
  })

  it("rejects restarting a battle", () => {
    expectError(attackShip(inBattle()), "The battle has already started", 409)
  })
})

describe("ignoreShip", () => {
  it("lets the ship pass and remembers it", () => {
    const result = expectSuccess(ignoreShip(atSea({ shipMeeting })))

    expect(result.player.locationStates?.sea?.shipMeeting).toBeUndefined()
    expect(result.player.locationStates?.sea?.justMetAShip).toBe(true)
  })

  it("rejects ignoring without a ship", () => {
    expectError(ignoreShip(atSea()), "You are not currently meeting a ship")
  })

  it("rejects ignoring during a battle", () => {
    expectError(
      ignoreShip(inBattle()),
      "You cannot ignore a ship during a battle",
      409
    )
  })
})

describe("battleMove", () => {
  // Math.random 0.99 rolls the highest value, 0 the lowest
  const rollHigh = () => vi.spyOn(Math, "random").mockReturnValue(0.99)
  const rollLow = () => vi.spyOn(Math, "random").mockReturnValue(0)

  it.each(["board", "", undefined, 1])("rejects action %s", (action) => {
    expectError(
      battleMove(inBattle(), { action } as never),
      "Not a valid battle action"
    )
  })

  it("rejects a move without a battle", () => {
    expectError(
      battleMove(atSea({ shipMeeting }), { action: "fire" }),
      "You are not currently in a battle",
      409
    )
  })

  it("saves each round with its damage while the battle goes on", () => {
    // Evade fails with a high roll (> 50%) and deals the highest damage
    rollHigh()

    const result = expectSuccess(battleMove(inBattle(), { action: "evade" }))

    expect(result.data.outcome).toBe("ongoing")
    expect(result.data.round).toEqual({
      action: "evade",
      hit: false,
      enemyDamage: 0,
      playerDamage: 12,
      shipDamage: 4,
      crewDamage: 3,
    })
    expect(result.player.locationStates?.sea?.battle?.playerStrength).toBe(88)
    expect(result.player.ships["ship-1"].health).toBe(96)
    expect(result.player.crewMembers.health).toBe(87)
    expect(result.log).toBeUndefined()
  })

  it("never damages the enemy when evading", () => {
    rollLow()

    const result = expectSuccess(battleMove(inBattle(), { action: "evade" }))

    expect(result.data.round).toMatchObject({ hit: true, enemyDamage: 0 })
    expect(result.player.locationStates?.sea?.battle?.enemyStrength).toBe(100)
  })

  it("wins when the enemy runs out of battle strength", () => {
    // A low roll always hits with 5 cannons against 1
    rollLow()
    const player = patchDeep<Player>(
      inBattle({ enemyStrength: 20, playerStrength: 100 }),
      { locationStates: { sea: { shipMeeting: { cannons: 1 } } } }
    )

    const result = expectSuccess(battleMove(player, { action: "fire" }))

    const sea = result.player.locationStates?.sea

    expect(result.data.outcome).toBe("victory")
    expect(sea?.battle).toBeUndefined()
    expect(sea?.shipMeeting).toBeUndefined()
    expect(sea?.justMetAShip).toBe(true)
    expect(sea?.attackSuccessReport).toBeDefined()
    expect(result.player.character.battles?.France?.won).toBe(1)
    expect(result.player.crewMembers.mood).toBe(70)
    expect(result.log).toMatchObject({
      type: "victory",
      message: expect.stringMatching(/^Won a battle against France/),
    })
  })

  it("offers the loot instead of loading it", () => {
    rollLow()
    const player = patchDeep<Player>(
      inBattle({ enemyStrength: 20, playerStrength: 100 }),
      { locationStates: { sea: { shipMeeting: { cannons: 1 } } } }
    )

    const result = expectSuccess(battleMove(player, { action: "fire" }))
    const sea = result.player.locationStates?.sea

    expect(sea?.lootOffer).toEqual(sea?.attackSuccessReport?.lootedMerchandise)
    expect(Object.keys(sea?.lootOffer ?? {}).length).toBeGreaterThan(0)
    expect(result.player.inventory).toEqual(player.inventory)
  })

  it("offers no loot when the enemy carried none", () => {
    // A high roll loots no merchandise
    rollHigh()

    const { dbUpdate } = getVictoryUpdate(atSea(), shipMeeting, {
      shipHealthLoss: 0,
      crewHealthLoss: 0,
    })

    expect(dbUpdate.locationStates?.sea?.lootOffer).toBeNull()
  })

  it("loses all carried gold and up to 3 goods, but keeps cannons and savings", () => {
    rollHigh()
    const player = patchDeep<Player>(
      inBattle({ enemyStrength: 100, playerStrength: 10 }),
      {
        character: { gold: 500, account: 2000 },
        inventory: { rum: 4 },
        treasures: {
          t1: { id: "t1", name: "Golden hen", rewarder: "Havana" },
        },
      }
    )

    const result = expectSuccess(battleMove(player, { action: "fire" }))

    expect(result.data.outcome).toBe("defeat")
    expect(result.player.character.gold).toBe(0)
    expect(result.player.character.account).toBe(2000)
    expect(result.player.inventory).toEqual({
      food: 0,
      water: 0,
      cannons: 5,
      rum: 0,
    })
    expect(result.player.treasures).toEqual(player.treasures)
    expect(result.player.character.battles?.France?.lost).toBe(1)
    // The last ship cannot be sunk
    expect(Object.keys(result.player.ships)).toEqual(["ship-1"])
    expect(result.player.locationStates?.sea?.attackFailureReport).toBeDefined()
  })

  it("takes all of 3 goods on a high roll, whatever the number of ships", () => {
    rollHigh()
    const player = patchDeep<Player>(
      inBattle({ enemyStrength: 100, playerStrength: 10 }),
      {
        ships: {
          "ship-2": {
            id: "ship-2",
            name: "Second",
            type: "Brig",
            health: 100,
            createdDay: 1,
          },
        },
        inventory: { rum: 4, sugar: 6 },
      }
    )

    const result = expectSuccess(battleMove(player, { action: "fire" }))

    expect(result.player.inventory).toEqual({
      food: 50,
      water: 0,
      cannons: 5,
      rum: 0,
      sugar: 0,
    })
    expect(result.data).toMatchObject({
      lostMerchandise: { water: 100, rum: 4, sugar: 6 },
    })
  })

  it("takes all of a single good on a low roll", () => {
    // Evading succeeds on a low roll, so the draw after the last round loses
    rollLow()
    const evade = { action: "evade", hit: true } as BattleRound
    const player = inBattle({
      enemyStrength: 100,
      playerStrength: 100,
      rounds: Array(BATTLE_MAX_ROUNDS - 1).fill(evade),
    })

    const result = expectSuccess(battleMove(player, { action: "evade" }))

    expect(result.data.outcome).toBe("defeat")
    expect(result.player.inventory).toEqual({ food: 0, water: 100, cannons: 5 })
    expect(result.data).toMatchObject({ lostMerchandise: { food: 50 } })
  })

  it("takes nothing when the hold only has cannons", () => {
    rollHigh()
    const player = patchDeep<Player>(
      inBattle({ enemyStrength: 100, playerStrength: 10 }),
      { inventory: { food: 0, water: 0 } }
    )

    const result = expectSuccess(battleMove(player, { action: "fire" }))

    expect(result.player.inventory).toEqual({ food: 0, water: 0, cannons: 5 })
    expect(result.data).toMatchObject({ lostMerchandise: {} })
  })

  it("takes goods without crashing when the player has no ships", () => {
    rollHigh()
    const player = patchDeep<Player>(
      inBattle({ enemyStrength: 100, playerStrength: 10 }),
      { ships: null }
    )

    const result = expectSuccess(battleMove(player, { action: "fire" }))

    expect(result.player.inventory).toEqual({ food: 0, water: 0, cannons: 5 })
    expect(result.data).toMatchObject({
      lostMerchandise: { food: 50, water: 100 },
    })
  })

  it("can sink one of several ships", () => {
    // Highest rolls never sink (1 in 3 chance needs a 1), lowest always do
    rollLow()
    const player = patchDeep<Player>(
      inBattle({ enemyStrength: 100, playerStrength: 10 }),
      {
        ships: {
          "ship-2": {
            id: "ship-2",
            name: "Second",
            type: "Brig",
            health: 100,
            createdDay: 1,
          },
        },
        // No cannons, so firing always misses
        inventory: { cannons: 0 },
      }
    )

    const result = expectSuccess(battleMove(player, { action: "fire" }))

    expect(result.data.outcome).toBe("defeat")
    expect(Object.keys(result.player.ships)).toHaveLength(1)
    expect(result.data).toMatchObject({ sunkShip: "Test Brig" })
  })

  it(`ends after ${BATTLE_MAX_ROUNDS} rounds and a draw is a defeat`, () => {
    // Evading with a low roll always succeeds, so nobody takes damage
    rollLow()
    let player: Player = inBattle()
    let outcome: BattleOutcome = "ongoing"

    for (let round = 1; outcome === "ongoing"; round++) {
      const result = expectSuccess(battleMove(player, { action: "evade" }))

      player = result.player
      outcome = result.data.outcome
      expect(round).toBeLessThanOrEqual(BATTLE_MAX_ROUNDS)
    }

    expect(outcome).toBe("defeat")
  })
})

describe("whole voyage", () => {
  it("sails from Port Royale to Havana, fights a ship and arrives", () => {
    const random = createSeededRandom(7)
    vi.spyOn(Math, "random").mockImplementation(random.next)

    let player: Player = expectSuccess(
      startJourney(inPort(), { town: "Havana" })
    ).player
    const totalDays = player.character.journey!.totalDays
    const startDay = player.character.day
    let battles = 0

    for (
      let step = 0;
      step < 100 && player.character.location === "Sea";
      step++
    ) {
      const sea = player.locationStates?.sea

      if (sea?.battle) {
        player = expectSuccess(battleMove(player, { action: "fire" })).player
      } else if (sea?.shipMeeting) {
        battles++
        player = expectSuccess(attackShip(player)).player
      } else {
        player = expectSuccess(continueJourney(player, MEET_SHIP)).player
      }
    }

    expect(battles).toBeGreaterThan(0)
    expect(player.character).toMatchObject({
      location: "Harbor",
      town: "Havana",
      // One day per journey step, including arrival
      day: startDay + totalDays,
    })
  })
})

describe("random voyages", () => {
  const ACTIONS = [
    "start",
    "continue",
    "attack",
    "ignore",
    "fire",
    "evade",
  ] as const

  const isValidInventory = (inventory: Inventory | undefined) =>
    Object.values(inventory ?? {}).every(
      (quantity) => Number.isSafeInteger(quantity) && quantity >= 0
    )

  it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])(
    "keeps the game consistent with seed %i",
    (seed) => {
      const random = createSeededRandom(seed)
      vi.spyOn(Math, "random").mockImplementation(random.next)

      const succeededActions = new Set<string>()
      let player: Player = inPort({
        character: { gold: random.int(0, 5000) },
      })

      for (let step = 0; step < 1000; step++) {
        // Back in port, restock and heal so the next voyage can start
        if (player.character.location !== "Sea") {
          player = patchDeep<Player>(player, {
            character: { location: "Harbor" },
            crewMembers: { count: 10, health: 100, mood: 80 },
            ships: Object.fromEntries(
              Object.keys(player.ships).map((id) => [id, { health: 100 }])
            ),
            inventory: { food: 50, water: 100, cannons: 5 },
          })

          if (!Object.keys(player.ships).length) {
            player = patchDeep<Player>(player, {
              ships: createTestPlayer().ships,
            })
          }
        }

        const before = deepFreeze(structuredClone(player))
        const action = random.pick(ACTIONS)
        const context = `seed ${seed}, step ${step}, action ${action}`

        const result =
          action === "start"
            ? startJourney(
                before,
                { town: random.pick(ALL_TOWNS) },
                random.next
              )
            : action === "continue"
              ? continueJourney(before, random.next)
              : action === "attack"
                ? attackShip(before)
                : action === "ignore"
                  ? ignoreShip(before)
                  : battleMove(before, { action })

        if ("error" in result || "blocked" in result) {
          continue
        }

        succeededActions.add(action)

        const after = result.player
        const { journey, location, town } = after.character

        // At sea with a journey, or in a town without one
        expect(location === "Sea", context).toBe(!!journey)
        expect(location === "Sea", context).toBe(!town)

        if (journey) {
          expect(journey.day, context).toBeGreaterThanOrEqual(1)
          expect(journey.day, context).toBeLessThanOrEqual(journey.totalDays)
        }

        expect(after.character.gold, context).toBeGreaterThanOrEqual(0)
        expect(after.character.day, context).toBeGreaterThanOrEqual(
          before.character.day
        )
        expect(
          after.character.day - before.character.day,
          context
        ).toBeLessThanOrEqual(1)
        expect(isValidInventory(after.inventory), context).toBe(true)
        expect(after.crewMembers.health, context).toBeGreaterThanOrEqual(0)
        expect(after.crewMembers.health, context).toBeLessThanOrEqual(100)
        expect(after.crewMembers.mood, context).toBeLessThanOrEqual(100)
        expect(
          before.crewMembers.mood - after.crewMembers.mood,
          context
        ).toBeLessThanOrEqual(1)
        Object.values(after.ships).forEach((ship) => {
          expect(ship.health, context).toBeGreaterThanOrEqual(0)
        })

        // Cannons and savings are never lost at sea
        expect(after.inventory?.cannons ?? 0, context).toBeGreaterThanOrEqual(
          before.inventory?.cannons ?? 0
        )
        expect(after.character.account, context).toBe(before.character.account)

        // Never more than one ship sunk at a time, and never the last one
        const shipsBefore = Object.keys(before.ships).length
        const shipsAfter = Object.keys(after.ships).length

        expect(shipsBefore - shipsAfter, context).toBeLessThanOrEqual(1)
        if (shipsBefore > 0) {
          expect(shipsAfter, context).toBeGreaterThan(0)
        }

        player = after
      }

      // Guards against random play that only ever hits errors
      expect(succeededActions.size).toBe(ACTIONS.length)
    }
  )
})
