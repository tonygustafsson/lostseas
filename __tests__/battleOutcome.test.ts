import { afterEach, describe, expect, it, vi } from "vitest"

import { getDefeatUpdate, getVictoryUpdate } from "@/utils/battleOutcome"

import { createTestPlayer } from "./helpers/createTestPlayer"
import { createSeededRandom } from "./helpers/seededRandom"

const losses = { shipHealthLoss: 7, crewHealthLoss: 3 }

const shipMeeting = (nation: ShipMeetingState["nation"]): ShipMeetingState => ({
  nation,
  shipType: "Brig",
  cannons: 4,
  crewMembers: 12,
})

const seeds = Array.from({ length: 300 }, (_, seed) => seed)

/** Runs the outcome once per seed, with all the game's randomness replayable */
const playSeeds = <T>(run: () => T) =>
  seeds.map((seed) => {
    vi.spyOn(Math, "random").mockImplementation(createSeededRandom(seed).next)

    return run()
  })

afterEach(() => {
  vi.restoreAllMocks()
})

describe("getVictoryUpdate", () => {
  const player = createTestPlayer({
    character: { gold: 500 },
    crewMembers: { count: 20, health: 80, mood: 70 },
  })

  const victories = (nation: ShipMeetingState["nation"]) =>
    playSeeds(() => getVictoryUpdate(player, shipMeeting(nation), losses))

  it("loots between 10 and 100 gold per enemy crew member", () => {
    for (const { report } of victories("Spain")) {
      expect(report.lootedGold).toBeGreaterThanOrEqual(12 * 10)
      expect(report.lootedGold).toBeLessThanOrEqual(12 * 100)
    }
  })

  it("adds the looted gold and a victory over that nation", () => {
    for (const { dbUpdate, report } of victories("Spain")) {
      expect(dbUpdate.character?.gold).toBe(500 + report.lootedGold)
      expect(dbUpdate.character?.battles).toEqual({ Spain: { won: 1 } })
    }
  })

  it("counts on top of the victories already won", () => {
    const veteran = createTestPlayer({
      character: { battles: { Spain: { won: 4, lost: 2 } } },
    })

    vi.spyOn(Math, "random").mockReturnValue(0.5)
    const { dbUpdate } = getVictoryUpdate(veteran, shipMeeting("Spain"), losses)

    expect(dbUpdate.character?.battles).toEqual({ Spain: { won: 5 } })
  })

  it("raises crew mood and adds the recruits to the crew", () => {
    for (const { dbUpdate, report } of victories("Spain")) {
      expect(report.crewMoodIncrease).toBe(20)
      expect(dbUpdate.crewMembers?.mood).toBe(90)
      expect(dbUpdate.crewMembers?.count).toBe(20 + report.crewMemberRecruits)
    }
  })

  it("passes on the battle losses in the report only", () => {
    const { report, dbUpdate } = victories("Spain")[0]

    expect(report.shipHealthLoss).toBe(7)
    expect(report.crewHealthLoss).toBe(3)
    expect(dbUpdate.crewMembers?.health).toBe(80)
  })

  it("ends the meeting and offers the loot only when there is any", () => {
    for (const { dbUpdate, report } of victories("Spain")) {
      const sea = dbUpdate.locationStates?.sea
      const hasLoot = Object.values(report.lootedMerchandise).some(
        (amount) => (amount ?? 0) > 0
      )

      expect(sea?.shipMeeting).toBeNull()
      expect(sea?.battle).toBeNull()
      expect(sea?.attackSuccessReport).toBe(report)
      expect(sea?.lootOffer).toEqual(hasLoot ? report.lootedMerchandise : null)
    }
  })

  it("sometimes finds a treasure, and keeps it in the update", () => {
    const found = victories("Spain").filter(
      ({ report }) => report.foundTreasure
    )

    expect(found.length).toBeGreaterThan(0)
    expect(found.length).toBeLessThan(seeds.length / 4)

    for (const { dbUpdate, report } of found) {
      const treasure = report.foundTreasure as Treasure

      expect(dbUpdate.treasures).toEqual({ [treasure.id]: treasure })
    }
  })

  it("only captures a wanted pirate from a pirate ship", () => {
    const pirate = victories("Pirate").filter(
      ({ report }) => report.capturedPirate
    )

    expect(pirate.length).toBeGreaterThan(0)
    expect(
      victories("Spain").filter(({ report }) => report.capturedPirate)
    ).toHaveLength(0)

    for (const { dbUpdate, report, log } of pirate) {
      const captured = report.capturedPirate as WantedPirate

      expect(dbUpdate.wantedPirates).toEqual({ [captured.id]: captured })
      expect(log.message).toContain(captured.name)
    }
  })

  it("logs a victory", () => {
    const { log } = victories("Spain")[0]

    expect(log.type).toBe("victory")
    expect(log.message).toMatch(/^Won a battle against .*; looted \d+ gold\.$/)
  })
})

describe("getDefeatUpdate", () => {
  const twoShips = createTestPlayer({
    character: { gold: 800 },
    ships: {
      "ship-2": {
        id: "ship-2",
        name: "Second Brig",
        type: "Brig",
        health: 100,
        createdDay: 2,
      },
    },
    inventory: { food: 10, water: 20, rum: 6, cannons: 5, repairKits: 2 },
  })

  const defeats = (player: Player) =>
    playSeeds(() => getDefeatUpdate(player, shipMeeting("France"), losses))

  it("takes all the gold and counts a defeat against that nation", () => {
    for (const { dbUpdate } of defeats(twoShips)) {
      expect(dbUpdate.character?.gold).toBe(0)
      expect(dbUpdate.character?.battles).toEqual({ France: { lost: 1 } })
    }
  })

  it("steals whole stacks of goods but never cannons or repair kits", () => {
    for (const { dbUpdate, report } of defeats(twoShips)) {
      const stolen = Object.keys(report.lostMerchandise) as (keyof Inventory)[]

      expect(stolen.length).toBeGreaterThanOrEqual(1)
      expect(stolen.length).toBeLessThanOrEqual(3)
      expect(stolen).not.toContain("cannons")
      expect(stolen).not.toContain("repairKits")

      for (const item of stolen) {
        expect(report.lostMerchandise[item]).toBe(twoShips.inventory?.[item])
        expect(dbUpdate.inventory?.[item]).toBe(0)
      }

      expect(dbUpdate.inventory?.cannons).toBe(5)
      expect(dbUpdate.inventory?.repairKits).toBe(2)
    }
  })

  it("sometimes sinks one of several ships", () => {
    const outcomes = defeats(twoShips)
    const sunk = outcomes.filter(({ report }) => report.sunkShip)

    expect(sunk.length).toBeGreaterThan(0)
    expect(sunk.length).toBeLessThan(outcomes.length)

    for (const { dbUpdate, report } of sunk) {
      const removed = Object.entries(dbUpdate.ships ?? {}).filter(
        ([, ship]) => ship === null
      )

      expect(removed).toHaveLength(1)
      expect(twoShips.ships[removed[0][0]].name).toBe(report.sunkShip)
    }
  })

  it("never sinks the only ship", () => {
    const onlyShip = createTestPlayer()

    for (const { dbUpdate, report } of defeats(onlyShip)) {
      expect(report.sunkShip).toBe(false)
      expect(Object.values(dbUpdate.ships ?? {})).not.toContain(null)
    }
  })

  it("ends the meeting and reports the battle losses", () => {
    const { dbUpdate, report, log } = defeats(twoShips)[0]
    const sea = dbUpdate.locationStates?.sea

    expect(sea?.shipMeeting).toBeNull()
    expect(sea?.battle).toBeNull()
    expect(sea?.attackFailureReport).toBe(report)
    expect(report.shipHealthLoss).toBe(7)
    expect(report.crewHealthLoss).toBe(3)
    expect(log.type).toBe("defeat")
  })
})
