import { beforeEach, describe, expect, it, vi } from "vitest"

import { POST as startJourney } from "@/app/api/sea/startJourney/route"
import { player as fixture } from "@/stories/fixtures"

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
}))

const request = () =>
  new Request("http://localhost/api/sea/startJourney", {
    method: "POST",
    body: JSON.stringify({ town: "Havana" }),
  })

beforeEach(() => {
  vi.clearAllMocks()
  mocks.player = structuredClone(fixture)
  mocks.player.locationStates = {
    tavern: { visited: true, noOfSailors: 5, isHostile: false },
  }
})

describe("starting a journey", () => {
  it.each<{
    reason: string
    block: (player: Player) => void
  }>([
    { reason: "no ships", block: (player) => (player.ships = {}) },
    {
      reason: "damaged ships",
      block: (player) => (player.ships.endeavour.health = 0),
    },
    {
      reason: "too few crew",
      block: (player) => (player.crewMembers.count = 1),
    },
    {
      reason: "too many crew",
      block: (player) => (player.crewMembers.count = 1000),
    },
    { reason: "angry crew", block: (player) => (player.crewMembers.mood = 0) },
    { reason: "ill crew", block: (player) => (player.crewMembers.health = 0) },
    { reason: "no food", block: (player) => (player.inventory!.food = 0) },
    { reason: "no water", block: (player) => (player.inventory!.water = 0) },
  ])("keeps the player in place when blocked by $reason", async ({ block }) => {
    block(mocks.player!)
    const before = structuredClone(mocks.player)

    const response = await startJourney(request())

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ success: false })
    expect(mocks.savePlayer).not.toHaveBeenCalled()
    expect(mocks.player).toEqual(before)
  })

  it("starts sailing normally when only advisory warnings remain", async () => {
    const response = await startJourney(request())

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ success: true })
    expect(mocks.savePlayer).toHaveBeenCalledOnce()
    const saved = mocks.savePlayer.mock.calls[0][0] as Player
    expect(saved.character).toMatchObject({
      location: "Sea",
      journey: { origin: "Port Royale", destination: "Havana", day: 1 },
      day: fixture.character.day,
    })
    expect(saved.character.town).toBeUndefined()
    expect(saved.locationStates).toBeUndefined()
  })
})
