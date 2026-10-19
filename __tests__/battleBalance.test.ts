import { afterAll, beforeAll, describe, expect, it, vi } from "vitest"

import { resolveBattleRound, startBattle } from "@/utils/seaBattle"
import { createMeetingShip } from "@/utils/shipMeeting"

import { createTestPlayer } from "./helpers/createTestPlayer"
import { createSeededRandom } from "./helpers/seededRandom"

const LEVELS = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 30, 50, 100]
const BATTLES_PER_LEVEL = 4000

const playBattle = (level: number) => {
  const player = createTestPlayer({
    crewMembers: { count: level * 2 },
    inventory: { cannons: level },
  })
  const opponent = createMeetingShip(level, "Port Royale")

  let battle = startBattle()

  while (true) {
    const round = resolveBattleRound(battle, "fire", player, opponent.cannons)

    if (round.outcome !== "ongoing") return round.outcome === "victory"

    battle = round.battle
    player.ships = round.ships
    player.crewMembers = { ...player.crewMembers, health: round.crewHealth }
  }
}

describe("sea battle balance", () => {
  const winRates = new Map<number, number>()

  beforeAll(() => {
    vi.spyOn(Math, "random").mockImplementation(createSeededRandom(1).next)

    LEVELS.forEach((level) => {
      let victories = 0

      for (let i = 0; i < BATTLES_PER_LEVEL; i++) {
        if (playBattle(level)) victories++
      }

      winRates.set(level, victories / BATTLES_PER_LEVEL)
    })
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  it("wins about 75% of battles on average when always firing", () => {
    const rates = [...winRates.values()]
    const average = rates.reduce((a, b) => a + b) / rates.length

    expect(average).toBeGreaterThan(0.72)
    expect(average).toBeLessThan(0.78)
  })

  it.each(LEVELS)(
    "keeps %i manned cannons between 68% and 88% wins",
    (level) => {
      expect(winRates.get(level)).toBeGreaterThan(0.68)
      expect(winRates.get(level)).toBeLessThan(0.88)
    }
  )
})
