import { beforeEach, describe, expect, it, vi } from "vitest"

import { POST as continueJourney } from "@/app/api/sea/continueJourney/route"
import { POST as ignoreShip } from "@/app/api/sea/ignoreShip/route"

const mocks = vi.hoisted(() => ({
  player: undefined as Player | undefined,
  savePlayer: vi.fn(),
  saveStatistics: vi.fn(),
}))

vi.mock("next/headers", () => ({
  cookies: async () => ({ get: () => ({ value: "test-player" }) }),
}))

vi.mock("@/firebase/db", () => ({
  getPlayer: async () => mocks.player,
  savePlayer: mocks.savePlayer,
  saveStatistics: mocks.saveStatistics,
}))

const successReport: AttackSuccessReport = {
  crewMoodIncrease: 20,
  crewHealthLoss: 2,
  crewMemberRecruits: 0,
  lootedGold: 100,
  lootedMerchandise: {},
  shipHealthLoss: 2,
  foundTreasure: false,
}

const failureReport: AttackFailureReport = {
  crewHealthLoss: 10,
  sunkShip: false,
  inventoryPercentageLoss: 100,
  shipHealthLoss: 10,
}

const createPlayer = (): Player => ({
  id: "test-player",
  createdDate: 0,
  character: {
    name: "Test",
    age: 30,
    gender: "Male",
    nationality: "England",
    title: "Pirate",
    town: undefined,
    location: "Sea",
    gold: 1000,
    day: 20,
    journey: {
      origin: "Bonaire",
      destination: "Villa Hermosa",
      day: 7,
      totalDays: 7,
    },
  },
  ships: {},
  inventory: { food: 100, water: 200, cannons: 10 },
  crewMembers: { count: 20, mood: 75, health: 90 },
  locationStates: { sea: { shipMeeting: null } },
})

beforeEach(() => {
  vi.clearAllMocks()
  mocks.player = createPlayer()
  mocks.savePlayer.mockImplementation(async (player: Player) => {
    mocks.player = player
    return player
  })
})

const expectResumedFinalDay = async () => {
  const previous = mocks.player!
  const response = await continueJourney()

  expect(response.status).toBe(200)
  expect(await response.json()).toMatchObject({
    success: true,
    day: 7,
    destinationReached: false,
    shipMeetingState: null,
  })
  expect(mocks.player?.character).toEqual(previous.character)
  expect(mocks.player?.inventory).toEqual(previous.inventory)
  expect(mocks.player?.crewMembers).toEqual(previous.crewMembers)
  expect(mocks.player?.locationStates?.sea).toEqual({})
  expect(mocks.saveStatistics).not.toHaveBeenCalled()

  const arrivalResponse = await continueJourney()

  expect(arrivalResponse.status).toBe(200)
  expect(await arrivalResponse.json()).toMatchObject({
    destinationReached: true,
  })
  expect(mocks.player?.character).toMatchObject({
    location: "Harbor",
    town: "Villa Hermosa",
    day: 21,
  })
  expect(mocks.player?.character.journey).toBeUndefined()
  expect(mocks.player?.inventory).toEqual({
    food: 98,
    water: 196,
    cannons: 10,
  })
  expect(mocks.player?.crewMembers).toEqual(previous.crewMembers)
  expect(mocks.saveStatistics).toHaveBeenCalledOnce()
  expect(mocks.savePlayer).toHaveBeenLastCalledWith(
    mocks.player,
    "Arrived at destination Villa Hermosa."
  )
}

describe("continue journey after a final-day encounter", () => {
  it.each([
    { attackSuccessReport: successReport },
    { attackFailureReport: failureReport },
  ])("resumes sailing before arrival for report %j", async (report) => {
    mocks.player!.locationStates!.sea = {
      shipMeeting: null,
      justMetAShip: true,
      ...report,
    }

    await expectResumedFinalDay()
  })

  it("resumes sailing after ignoring the ship", async () => {
    mocks.player!.locationStates!.sea!.shipMeeting = {
      nation: "Spain",
      shipType: "Brig",
      crewMembers: 20,
      cannons: 10,
    }

    expect((await ignoreShip()).status).toBe(200)
    await expectResumedFinalDay()
  })

  it("still arrives normally when there is no encounter to resume", async () => {
    const response = await continueJourney()

    expect((await response.json()).destinationReached).toBe(true)
    expect(mocks.player?.character.location).toBe("Harbor")
    expect(mocks.player?.character.day).toBe(21)
    expect(mocks.player?.inventory).toMatchObject({ food: 98, water: 196 })
    expect(mocks.saveStatistics).toHaveBeenCalledOnce()
  })

  it("preserves continuation rules for an earlier battle report", async () => {
    mocks.player!.character.journey!.day = 6
    mocks.player!.locationStates!.sea = {
      shipMeeting: null,
      justMetAShip: true,
      attackSuccessReport: successReport,
    }

    const response = await continueJourney()

    expect((await response.json()).destinationReached).toBe(false)
    expect(mocks.player?.character.location).toBe("Sea")
    expect(mocks.player?.character.journey?.day).toBe(6)
    expect(mocks.player?.character.day).toBe(20)
    expect(mocks.player?.inventory).toMatchObject({ food: 98, water: 196 })
    expect(mocks.player?.crewMembers.mood).toBe(74)
    expect(mocks.player?.locationStates?.sea).toEqual({})
  })
})
