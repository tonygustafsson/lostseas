import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { getRandomInt } from "@/utils/random"
import {
  BATTLE_MAX_ROUNDS,
  EVADE_CHANCE,
  getBattleLosses,
  resolveBattleRound,
  startBattle,
} from "@/utils/seaBattle"
import { calculateAttackSuccess } from "@/utils/shipMeeting"

vi.mock("@/utils/random", () => ({
  getRandomInt: vi.fn(),
}))

vi.mock("@/utils/shipMeeting", () => ({
  calculateAttackSuccess: vi.fn(),
}))

const ship = (id: string, health: number): Ship => ({
  id,
  name: id,
  type: "Brig",
  health,
  createdDay: 1,
})

const createPlayer = (ships: Record<string, Ship> = { a: ship("a", 100) }) => ({
  crewMembers: { count: 20, mood: 50, health: 100 },
  inventory: { cannons: 10 },
  ships,
})

const battle = (
  enemyStrength: number,
  playerStrength: number,
  playedRounds = 0
): BattleState => ({
  enemyStrength,
  playerStrength,
  rounds: Array.from({ length: playedRounds }, () => ({
    action: "evade",
    hit: true,
    enemyDamage: 0,
    playerDamage: 0,
    shipDamage: 0,
    crewDamage: 0,
  })),
})

const mockMove = (hit: boolean) =>
  vi.mocked(calculateAttackSuccess).mockReturnValue(hit)

// The evade roll is 1–100, every other range rolls its highest value
const mockEvade = (success: boolean) =>
  vi
    .mocked(getRandomInt)
    .mockImplementation((min, max) =>
      min === 1 && max === 100 ? EVADE_CHANCE + (success ? 0 : 1) : max
    )

describe("seaBattle", () => {
  beforeEach(() => {
    // Always roll the highest value of a range
    vi.mocked(getRandomInt).mockImplementation((_min, max) => max)
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it("starts both sides at full battle strength", () => {
    expect(startBattle()).toEqual({
      enemyStrength: 100,
      playerStrength: 100,
      rounds: [],
    })
  })

  it("lowers the enemy strength when firing and winning the move", () => {
    mockMove(true)
    const player = createPlayer()

    const result = resolveBattleRound(startBattle(), "fire", player, 8)

    expect(calculateAttackSuccess).toHaveBeenCalledWith(20, 10, 8)
    expect(getRandomInt).toHaveBeenCalledWith(30, 50)
    expect(result.battle.enemyStrength).toBe(50)
    expect(result.battle.playerStrength).toBe(100)
    expect(result.ships).toBe(player.ships)
    expect(result.outcome).toBe("ongoing")
    expect(result.battle.rounds).toEqual([
      {
        action: "fire",
        hit: true,
        enemyDamage: 50,
        playerDamage: 0,
        shipDamage: 0,
        crewDamage: 0,
      },
    ])
  })

  it("lowers your strength and slightly damages every ship when firing and losing the move", () => {
    mockMove(false)

    const result = resolveBattleRound(
      startBattle(),
      "fire",
      createPlayer({ a: ship("a", 100), b: ship("b", 5) }),
      8
    )

    expect(getRandomInt).toHaveBeenCalledWith(10, 25)
    expect(getRandomInt).toHaveBeenCalledWith(3, 8)
    expect(getRandomInt).toHaveBeenCalledWith(1, 2)
    expect(result.battle.enemyStrength).toBe(100)
    expect(result.battle.playerStrength).toBe(75)
    expect(result.ships.a.health).toBe(92)
    expect(result.ships.b.health).toBe(0)
    expect(result.crewHealth).toBe(98)
  })

  it("hurts the crew more the more battle strength you have already lost", () => {
    mockMove(false)

    // 60% strength lost adds 5 (one per 12%) to the highest roll of 2
    const result = resolveBattleRound(
      battle(100, 40),
      "fire",
      createPlayer(),
      8
    )

    expect(result.battle.rounds?.[0].crewDamage).toBe(7)
    expect(result.crewHealth).toBe(93)
  })

  it("takes no damage when evading successfully and never hurts the enemy", () => {
    mockEvade(true)
    const player = createPlayer()

    const result = resolveBattleRound(startBattle(), "evade", player, 8)

    expect(result.battle.enemyStrength).toBe(100)
    expect(result.battle.playerStrength).toBe(100)
    expect(result.ships).toBe(player.ships)
    expect(result.crewHealth).toBe(100)
    expect(getRandomInt).toHaveBeenCalledTimes(1)
  })

  it("evades by pure chance, regardless of cannons", () => {
    mockEvade(true)

    const result = resolveBattleRound(
      startBattle(),
      "evade",
      { ...createPlayer(), inventory: { cannons: 0 } },
      30
    )

    expect(getRandomInt).toHaveBeenCalledWith(1, 100)
    expect(calculateAttackSuccess).not.toHaveBeenCalled()
    expect(result.battle.rounds?.[0].hit).toBe(true)
  })

  it("takes half damage when evading fails", () => {
    mockEvade(false)

    const result = resolveBattleRound(startBattle(), "evade", createPlayer(), 8)

    expect(getRandomInt).toHaveBeenCalledWith(5, 12)
    expect(getRandomInt).toHaveBeenCalledWith(1, 4)
    expect(getRandomInt).toHaveBeenCalledWith(1, 3)
    expect(result.battle.playerStrength).toBe(88)
    expect(result.ships.a.health).toBe(96)
    expect(result.crewHealth).toBe(97)
  })

  it("does not let ship health decide the battle", () => {
    mockEvade(true)

    const result = resolveBattleRound(
      battle(100, 100, 1),
      "evade",
      createPlayer({ a: ship("a", 0) }),
      8
    )

    expect(result.outcome).toBe("ongoing")
  })

  it("is a victory when the enemy strength reaches 0", () => {
    mockMove(true)

    const result = resolveBattleRound(
      battle(40, 100, 1),
      "fire",
      createPlayer(),
      8
    )

    expect(result.battle.enemyStrength).toBe(0)
    expect(result.outcome).toBe("victory")
  })

  it("is a defeat when your strength reaches 0", () => {
    mockMove(false)

    const result = resolveBattleRound(
      battle(100, 20, 1),
      "fire",
      createPlayer(),
      8
    )

    expect(result.battle.playerStrength).toBe(0)
    expect(result.outcome).toBe("defeat")
  })

  it("decides by remaining strength after the last round", () => {
    mockEvade(true)
    const player = createPlayer()
    const playedRounds = BATTLE_MAX_ROUNDS - 1

    expect(
      resolveBattleRound(battle(50, 60, playedRounds), "evade", player, 8)
        .outcome
    ).toBe("victory")
    expect(
      resolveBattleRound(battle(60, 60, playedRounds), "evade", player, 8)
        .outcome
    ).toBe("defeat")
  })

  it("continues before the last round even when the enemy is stronger", () => {
    mockEvade(true)

    const result = resolveBattleRound(
      battle(100, 10, 3),
      "evade",
      createPlayer(),
      8
    )

    expect(result.outcome).toBe("ongoing")
  })

  it("handles a stored battle without rounds", () => {
    mockMove(true)

    const result = resolveBattleRound(
      { enemyStrength: 100, playerStrength: 100 },
      "fire",
      createPlayer(),
      8
    )

    expect(result.battle.rounds).toHaveLength(1)
  })

  it("sums the ship and crew damage taken during the battle", () => {
    expect(
      getBattleLosses({
        enemyStrength: 20,
        playerStrength: 70,
        rounds: [
          {
            action: "fire",
            hit: false,
            enemyDamage: 0,
            playerDamage: 20,
            shipDamage: 6,
            crewDamage: 5,
          },
          {
            action: "evade",
            hit: false,
            enemyDamage: 0,
            playerDamage: 10,
            shipDamage: 3,
            crewDamage: 2,
          },
          {
            action: "fire",
            hit: true,
            enemyDamage: 40,
            playerDamage: 0,
            shipDamage: 0,
            crewDamage: 0,
          },
        ],
      })
    ).toEqual({ shipHealthLoss: 9, crewHealthLoss: 7 })
  })
})
