import { beforeEach, describe, expect, it, vi } from "vitest"

import { POST as attackShip } from "@/app/api/sea/attackShip/route"
import { POST as battleMove } from "@/app/api/sea/battleMove/route"
import { POST as continueJourney } from "@/app/api/sea/continueJourney/route"
import { POST as ignoreShip } from "@/app/api/sea/ignoreShip/route"
import { calculateAttackSuccess } from "@/utils/shipMeeting"

const mocks = vi.hoisted(() => ({
  player: undefined as Player | undefined,
  savePlayer: vi.fn(),
}))

vi.mock("next/headers", () => ({
  cookies: async () => ({ get: () => ({ value: "test-player" }) }),
}))

vi.mock("@/firebase/db", () => ({
  getPlayer: async () => mocks.player,
  savePlayer: mocks.savePlayer,
  saveStatistics: vi.fn(),
}))

// Always roll the highest value: maximum damage, no treasure, no loot, no sinking
vi.mock("@/utils/random", () => ({
  getRandomInt: (_min: number, max: number) => Math.floor(max),
}))

vi.mock("@/utils/shipMeeting", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/utils/shipMeeting")>()),
  calculateAttackSuccess: vi.fn(),
}))

const shipMeeting: ShipMeetingState = {
  nation: "France",
  shipType: "Galleon",
  crewMembers: 16,
  cannons: 8,
}

const createPlayer = (sea: Partial<SeaState> = {}): Player => ({
  id: "test-player",
  createdDate: 0,
  character: {
    name: "Test",
    characterId: "mateo-salazar",
    nationality: "England",
    title: "Pirate",
    town: undefined,
    location: "Sea",
    gold: 1000,
    day: 20,
    journey: {
      origin: "Bonaire",
      destination: "Villa Hermosa",
      day: 3,
      totalDays: 7,
    },
  },
  ships: {
    a: { id: "a", name: "Endeavour", type: "Brig", health: 100, createdDay: 1 },
  },
  inventory: { food: 100, water: 200, cannons: 10 },
  crewMembers: { count: 20, mood: 50, health: 90 },
  locationStates: { sea: { shipMeeting, ...sea } },
})

const move = (action: unknown) =>
  battleMove(
    new Request("http://localhost/api/sea/battleMove", {
      method: "POST",
      body: JSON.stringify({ action }),
    })
  )

beforeEach(() => {
  vi.clearAllMocks()
  mocks.savePlayer.mockImplementation(async (player: Player) => {
    mocks.player = player
    return player
  })
})

const battle = (
  enemyStrength: number,
  playerStrength: number,
  rounds?: BattleRound[]
): BattleState => ({ enemyStrength, playerStrength, rounds })

describe("attackShip", () => {
  it("starts a battle without resolving it", async () => {
    mocks.player = createPlayer()

    const response = await attackShip()

    expect(response.status).toBe(200)
    expect(mocks.player.locationStates?.sea?.battle).toEqual({
      enemyStrength: 100,
      playerStrength: 100,
      rounds: [],
    })
    expect(mocks.player.locationStates?.sea?.shipMeeting).toEqual(shipMeeting)
    expect(calculateAttackSuccess).not.toHaveBeenCalled()
  })

  it("does not restart a battle in progress", async () => {
    mocks.player = createPlayer({ battle: battle(40, 100) })

    const response = await attackShip()

    expect(response.status).toBe(409)
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })
})

describe("battleMove", () => {
  it("rejects an invalid action", async () => {
    mocks.player = createPlayer({ battle: battle(100, 100) })

    const response = await move("board")

    expect(response.status).toBe(400)
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })

  it("rejects a move when there is no battle", async () => {
    mocks.player = createPlayer()

    const response = await move("fire")

    expect(response.status).toBe(409)
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })

  it("saves each round, the battle strength and the ship and crew damage", async () => {
    vi.mocked(calculateAttackSuccess).mockReturnValue(false)
    mocks.player = createPlayer({ battle: battle(100, 100) })

    const response = await move("fire")

    expect(await response.json()).toMatchObject({ outcome: "ongoing" })
    expect(mocks.player.ships.a.health).toBe(92)
    expect(mocks.player.crewMembers.health).toBe(88)
    expect(mocks.player.locationStates?.sea?.battle).toEqual({
      enemyStrength: 100,
      playerStrength: 65,
      rounds: [
        {
          action: "fire",
          hit: false,
          enemyDamage: 0,
          playerDamage: 35,
          shipDamage: 8,
          crewDamage: 2,
        },
      ],
    })
  })

  it("applies the victory and ends the battle", async () => {
    vi.mocked(calculateAttackSuccess).mockReturnValue(true)
    mocks.player = createPlayer({
      battle: battle(35, 80, [
        {
          action: "fire",
          hit: false,
          enemyDamage: 0,
          playerDamage: 20,
          shipDamage: 6,
          crewDamage: 4,
        },
      ]),
    })
    mocks.player.ships.a.health = 94
    mocks.player.crewMembers.health = 86

    const response = await move("fire")
    const sea = mocks.player.locationStates?.sea

    expect(await response.json()).toMatchObject({
      outcome: "victory",
      shipHealthLoss: 6,
      // Only the damage from the rounds, a victory adds none
      crewHealthLoss: 4,
    })
    expect(sea?.battle).toBeUndefined()
    expect(sea?.shipMeeting).toBeUndefined()
    expect(sea?.justMetAShip).toBe(true)
    expect(sea?.attackSuccessReport?.shipHealthLoss).toBe(6)
    expect(mocks.player.ships.a.health).toBe(94)
    expect(mocks.player.crewMembers.health).toBe(86)
    expect(mocks.player.character.battles?.France?.won).toBe(1)
    expect(mocks.player.character.gold).toBe(1000 + 16 * 100)
  })

  it("keeps the crew damage from a lost last move in a victory", async () => {
    vi.mocked(calculateAttackSuccess).mockReturnValue(false)
    const evade: BattleRound = {
      action: "evade",
      hit: true,
      enemyDamage: 0,
      playerDamage: 0,
      shipDamage: 0,
      crewDamage: 0,
    }
    mocks.player = createPlayer({
      battle: battle(10, 80, [evade, evade, evade, evade]),
    })

    const response = await move("fire")

    // 2 plus 1 for the 20% strength already lost
    expect(await response.json()).toMatchObject({
      outcome: "victory",
      crewHealthLoss: 3,
    })
    expect(mocks.player.crewMembers.health).toBe(87)
  })

  it("applies the defeat and ends the battle", async () => {
    vi.mocked(calculateAttackSuccess).mockReturnValue(false)
    mocks.player = createPlayer({ battle: battle(100, 20) })

    const response = await move("fire")
    const sea = mocks.player.locationStates?.sea

    expect(await response.json()).toMatchObject({ outcome: "defeat" })
    expect(sea?.battle).toBeUndefined()
    expect(sea?.attackFailureReport?.shipHealthLoss).toBe(8)
    // Only the damage from the round: 2 plus 1 per 12% of the 80% strength lost
    expect(sea?.attackFailureReport?.crewHealthLoss).toBe(8)
    expect(mocks.player.ships.a.health).toBe(92)
    expect(mocks.player.crewMembers.health).toBe(82)
    expect(mocks.player.character.gold).toBe(0)
    expect(mocks.player.character.battles?.France?.lost).toBe(1)
  })
})

describe("during a battle", () => {
  it("cannot ignore the ship", async () => {
    mocks.player = createPlayer({ battle: battle(60, 100) })

    const response = await ignoreShip()

    expect(response.status).toBe(409)
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })

  it("cannot continue the journey", async () => {
    mocks.player = createPlayer({ battle: battle(60, 100) })

    const response = await continueJourney()

    expect(response.status).toBe(409)
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })
})
