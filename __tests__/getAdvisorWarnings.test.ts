import { describe, expect, it } from "vitest"

import { getAdvisorWarnings } from "@/utils/getAdvisorWarnings"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const basePlayer = (): Player =>
  ({
    id: "test",
    createdDate: 0,
    character: {
      name: "Test",
      age: 30,
      gender: "Male",
      nationality: "England",
      title: "Pirate",
      town: "Port Royale",
      location: "Harbor",
      gold: 0,
      day: 1,
      battles: {},
    },
    ships: {
      ship1: {
        id: "ship1",
        name: "The Test",
        type: "Brig",
        health: 100,
        createdDay: 1,
      },
    },
    crewMembers: { count: 5, mood: 50, health: 100 },
    inventory: { food: 100, water: 100, cannons: 2 },
  }) as unknown as Player

const tips = (player: Player) => getAdvisorWarnings(player).map((w) => w.tip)
const blocking = (player: Player) =>
  getAdvisorWarnings(player)
    .filter((w) => w.blocksTravel)
    .map((w) => w.tip)
const advisory = (player: Player) =>
  getAdvisorWarnings(player)
    .filter((w) => !w.blocksTravel)
    .map((w) => w.tip)

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("getAdvisorWarnings", () => {
  it("returns empty array for undefined player", () => {
    expect(getAdvisorWarnings(undefined)).toEqual([])
  })

  it("returns no warnings for a healthy player", () => {
    expect(getAdvisorWarnings(basePlayer())).toHaveLength(0)
  })

  // -------------------------------------------------------------------------
  // Gold & bank
  // -------------------------------------------------------------------------

  describe("TOO_MUCH_GOLD", () => {
    it("triggers when gold > 1000", () => {
      const p = basePlayer()
      p.character.gold = 1001
      expect(tips(p)).toContain("TOO_MUCH_GOLD")
    })

    it("does not trigger at exactly 1000", () => {
      const p = basePlayer()
      p.character.gold = 1000
      expect(tips(p)).not.toContain("TOO_MUCH_GOLD")
    })

    it("is NOT a travel blocker", () => {
      const p = basePlayer()
      p.character.gold = 5000
      expect(blocking(p)).not.toContain("TOO_MUCH_GOLD")
    })
  })

  describe("LOAN_BLOCKS_DEPOSIT", () => {
    it("triggers when player has a loan and gold in hand", () => {
      const p = basePlayer()
      p.character.loan = 500
      p.character.gold = 200
      expect(tips(p)).toContain("LOAN_BLOCKS_DEPOSIT")
    })

    it("does not trigger when gold is 0 (nothing to deposit)", () => {
      const p = basePlayer()
      p.character.loan = 500
      p.character.gold = 0
      expect(tips(p)).not.toContain("LOAN_BLOCKS_DEPOSIT")
    })

    it("does not trigger when there is no loan", () => {
      const p = basePlayer()
      p.character.gold = 200
      expect(tips(p)).not.toContain("LOAN_BLOCKS_DEPOSIT")
    })

    it("is NOT a travel blocker", () => {
      const p = basePlayer()
      p.character.loan = 500
      p.character.gold = 200
      expect(blocking(p)).not.toContain("LOAN_BLOCKS_DEPOSIT")
    })
  })

  // -------------------------------------------------------------------------
  // Ships
  // -------------------------------------------------------------------------

  describe("NO_SHIPS", () => {
    it("triggers when player owns no ships", () => {
      const p = basePlayer()
      p.ships = {}
      expect(tips(p)).toContain("NO_SHIPS")
    })

    it("is a travel blocker", () => {
      const p = basePlayer()
      p.ships = {}
      expect(blocking(p)).toContain("NO_SHIPS")
    })
  })

  describe("DAMAGED_SHIPS", () => {
    it("triggers when any ship has health <= 0", () => {
      const p = basePlayer()
      p.ships.ship1.health = 0
      expect(tips(p)).toContain("DAMAGED_SHIPS")
    })

    it("does not trigger when all ships are healthy", () => {
      expect(tips(basePlayer())).not.toContain("DAMAGED_SHIPS")
    })

    it("is a travel blocker", () => {
      const p = basePlayer()
      p.ships.ship1.health = 0
      expect(blocking(p)).toContain("DAMAGED_SHIPS")
    })
  })

  describe("SHIPS_NEED_REPAIRS", () => {
    it("triggers when a ship has health between 1 and 99", () => {
      const p = basePlayer()
      p.ships.ship1.health = 50
      expect(tips(p)).toContain("SHIPS_NEED_REPAIRS")
    })

    it("does not trigger when all ships are at 100 health", () => {
      expect(tips(basePlayer())).not.toContain("SHIPS_NEED_REPAIRS")
    })

    it("does not trigger when a ship is at 0 health (DAMAGED_SHIPS takes over)", () => {
      const p = basePlayer()
      p.ships.ship1.health = 0
      expect(tips(p)).not.toContain("SHIPS_NEED_REPAIRS")
    })

    it("is NOT a travel blocker", () => {
      const p = basePlayer()
      p.ships.ship1.health = 50
      expect(blocking(p)).not.toContain("SHIPS_NEED_REPAIRS")
    })
  })

  // -------------------------------------------------------------------------
  // Crew count
  // -------------------------------------------------------------------------

  describe("NO_CREW", () => {
    it("triggers when crew count is 0", () => {
      const p = basePlayer()
      p.crewMembers.count = 0
      expect(tips(p)).toContain("NO_CREW")
    })

    it("is NOT a travel blocker (a Merchantman needs 1, so NOT_ENOUGH_CREW handles that)", () => {
      const p = basePlayer()
      p.crewMembers.count = 0
      expect(advisory(p)).toContain("NO_CREW")
    })
  })

  describe("NOT_ENOUGH_CREW", () => {
    it("triggers when crew is below ship minimum", () => {
      const p = basePlayer()
      // Brig needs min 2; put 1 crew
      p.crewMembers.count = 1
      expect(tips(p)).toContain("NOT_ENOUGH_CREW")
    })

    it("does not trigger when crew meets minimum", () => {
      const p = basePlayer()
      p.crewMembers.count = 5 // Brig min = 2
      expect(tips(p)).not.toContain("NOT_ENOUGH_CREW")
    })

    it("is a travel blocker", () => {
      const p = basePlayer()
      p.crewMembers.count = 1
      expect(blocking(p)).toContain("NOT_ENOUGH_CREW")
    })
  })

  describe("TOO_MANY_CREW", () => {
    it("triggers when crew exceeds ship maximum", () => {
      const p = basePlayer()
      // Brig max = 20
      p.crewMembers.count = 21
      expect(tips(p)).toContain("TOO_MANY_CREW")
    })

    it("does not trigger when crew is within maximum", () => {
      expect(tips(basePlayer())).not.toContain("TOO_MANY_CREW")
    })

    it("is a travel blocker", () => {
      const p = basePlayer()
      p.crewMembers.count = 21
      expect(blocking(p)).toContain("TOO_MANY_CREW")
    })
  })

  // -------------------------------------------------------------------------
  // Crew mood
  // -------------------------------------------------------------------------

  describe("ANGRY_CREW", () => {
    it("triggers when mood <= 0", () => {
      const p = basePlayer()
      p.crewMembers.mood = 0
      expect(tips(p)).toContain("ANGRY_CREW")
    })

    it("is a travel blocker", () => {
      const p = basePlayer()
      p.crewMembers.mood = 0
      expect(blocking(p)).toContain("ANGRY_CREW")
    })
  })

  describe("LOW_CREW_MOOD", () => {
    it("triggers when mood is between 1 and 24", () => {
      const p = basePlayer()
      p.crewMembers.mood = 10
      expect(tips(p)).toContain("LOW_CREW_MOOD")
    })

    it("does not trigger at exactly 25", () => {
      const p = basePlayer()
      p.crewMembers.mood = 25
      expect(tips(p)).not.toContain("LOW_CREW_MOOD")
    })

    it("does not trigger at 0 (ANGRY_CREW takes over)", () => {
      const p = basePlayer()
      p.crewMembers.mood = 0
      expect(tips(p)).not.toContain("LOW_CREW_MOOD")
    })

    it("is NOT a travel blocker", () => {
      const p = basePlayer()
      p.crewMembers.mood = 10
      expect(blocking(p)).not.toContain("LOW_CREW_MOOD")
    })
  })

  // -------------------------------------------------------------------------
  // Crew health
  // -------------------------------------------------------------------------

  describe("CREW_IS_ILL", () => {
    it("triggers when health <= 0", () => {
      const p = basePlayer()
      p.crewMembers.health = 0
      expect(tips(p)).toContain("CREW_IS_ILL")
    })

    it("is a travel blocker", () => {
      const p = basePlayer()
      p.crewMembers.health = 0
      expect(blocking(p)).toContain("CREW_IS_ILL")
    })
  })

  describe("LOW_CREW_HEALTH", () => {
    it("triggers when health is between 1 and 24", () => {
      const p = basePlayer()
      p.crewMembers.health = 15
      expect(tips(p)).toContain("LOW_CREW_HEALTH")
    })

    it("does not trigger at exactly 25", () => {
      const p = basePlayer()
      p.crewMembers.health = 25
      expect(tips(p)).not.toContain("LOW_CREW_HEALTH")
    })

    it("does not trigger at 0 (CREW_IS_ILL takes over)", () => {
      const p = basePlayer()
      p.crewMembers.health = 0
      expect(tips(p)).not.toContain("LOW_CREW_HEALTH")
    })

    it("is NOT a travel blocker", () => {
      const p = basePlayer()
      p.crewMembers.health = 15
      expect(blocking(p)).not.toContain("LOW_CREW_HEALTH")
    })
  })

  // -------------------------------------------------------------------------
  // Supplies
  // -------------------------------------------------------------------------

  describe("NEED_MORE_FOOD", () => {
    it("triggers when food is insufficient for a 5-day journey", () => {
      const p = basePlayer()
      // 5 crew * 0.1 * 5 days = 2.5 -> rounded to 3; set food below that
      p.crewMembers.count = 5
      p.inventory = { food: 2, water: 100 }
      expect(tips(p)).toContain("NEED_MORE_FOOD")
    })

    it("does not trigger when food is sufficient", () => {
      const p = basePlayer()
      p.crewMembers.count = 5
      p.inventory = { food: 100, water: 100 }
      expect(tips(p)).not.toContain("NEED_MORE_FOOD")
    })

    it("is NOT a travel blocker", () => {
      const p = basePlayer()
      p.inventory = { food: 0, water: 100 }
      expect(blocking(p)).not.toContain("NEED_MORE_FOOD")
    })
  })

  describe("NEED_MORE_WATER", () => {
    it("triggers when water is insufficient for a 5-day journey", () => {
      const p = basePlayer()
      p.crewMembers.count = 5
      p.inventory = { food: 100, water: 1 }
      expect(tips(p)).toContain("NEED_MORE_WATER")
    })

    it("does not trigger when water is sufficient", () => {
      const p = basePlayer()
      p.crewMembers.count = 5
      p.inventory = { food: 100, water: 100 }
      expect(tips(p)).not.toContain("NEED_MORE_WATER")
    })

    it("is NOT a travel blocker", () => {
      const p = basePlayer()
      p.inventory = { food: 100, water: 0 }
      expect(blocking(p)).not.toContain("NEED_MORE_WATER")
    })
  })

  // -------------------------------------------------------------------------
  // Combat readiness
  // -------------------------------------------------------------------------

  describe("NO_CANNONS", () => {
    it("triggers when crew >= 4 and no cannons owned", () => {
      const p = basePlayer()
      p.crewMembers.count = 4
      p.inventory = { food: 100, water: 100, cannons: 0 }
      expect(tips(p)).toContain("NO_CANNONS")
    })

    it("does not trigger when player has cannons", () => {
      const p = basePlayer()
      p.crewMembers.count = 4
      p.inventory = { food: 100, water: 100, cannons: 2 }
      expect(tips(p)).not.toContain("NO_CANNONS")
    })

    it("does not trigger when crew < 4", () => {
      const p = basePlayer()
      p.crewMembers.count = 3
      p.inventory = { food: 100, water: 100 }
      expect(tips(p)).not.toContain("NO_CANNONS")
    })

    it("is NOT a travel blocker", () => {
      const p = basePlayer()
      p.crewMembers.count = 4
      p.inventory = { food: 100, water: 100 }
      expect(blocking(p)).not.toContain("NO_CANNONS")
    })
  })

  // -------------------------------------------------------------------------
  // Promotion
  // -------------------------------------------------------------------------

  describe("PROMOTION_AVAILABLE", () => {
    it("triggers when a promotion is available at the current town", () => {
      const p = basePlayer()
      // Port Royale is England; warWith France; 15 wins vs France = score 15 -> Ensign
      p.character.title = "Pirate"
      p.character.nationality = "England"
      p.character.town = "Port Royale"
      p.character.battles = { France: { won: 15, lost: 0 } } as any
      expect(tips(p)).toContain("PROMOTION_AVAILABLE")
      expect(advisory(p)).toContain("PROMOTION_AVAILABLE")
    })

    it("does not trigger when player already holds the earned title", () => {
      const p = basePlayer()
      p.character.title = "Ensign"
      p.character.nationality = "England"
      p.character.town = "Port Royale"
      p.character.battles = { France: { won: 15, lost: 0 } } as any
      expect(tips(p)).not.toContain("PROMOTION_AVAILABLE")
    })
  })

  // -------------------------------------------------------------------------
  // blocksTravel shape
  // -------------------------------------------------------------------------

  describe("blocksTravel flags", () => {
    it("all travel-blocking warnings are flagged correctly", () => {
      const p = basePlayer()
      p.ships = {}
      p.crewMembers.mood = 0
      p.crewMembers.health = 0

      const blocked = blocking(p)
      expect(blocked).toContain("NO_SHIPS")
      expect(blocked).toContain("ANGRY_CREW")
      expect(blocked).toContain("CREW_IS_ILL")
    })

    it("advisory-only warnings are not flagged as blockers", () => {
      const p = basePlayer()
      p.character.gold = 5000
      p.crewMembers.mood = 10
      p.crewMembers.health = 10
      p.ships.ship1.health = 50

      const adv = advisory(p)
      expect(adv).toContain("TOO_MUCH_GOLD")
      expect(adv).toContain("LOW_CREW_MOOD")
      expect(adv).toContain("LOW_CREW_HEALTH")
      expect(adv).toContain("SHIPS_NEED_REPAIRS")
    })
  })
})
