import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import ShowLocation from "@/components/game-ui/ShowLocation"
import { SEA_TRAVEL_SPEED } from "@/constants/sea"

const state = vi.hoisted(() => ({
  player: {
    character: {
      location: "Sea",
      day: 20,
      journey: {
        origin: "Bonaire",
        destination: "Villa Hermosa",
        day: 6,
        totalDays: 7,
      },
    },
    locationStates: { sea: {} },
  } as Player,
  continueJourney: vi.fn(),
  isPending: false,
  cleanup: undefined as (() => void) | undefined,
}))

vi.mock("react", async (importOriginal) => ({
  ...(await importOriginal<typeof import("react")>()),
  useEffect: (effect: () => (() => void) | undefined) => {
    state.cleanup = effect()
  },
}))

vi.mock("@/hooks/queries/usePlayer", () => ({
  useGetPlayer: () => ({ data: state.player }),
}))

vi.mock("@/hooks/queries/useSea", () => ({
  useSea: () => ({
    continueJourney: state.continueJourney,
    isContinueingJourney: state.isPending,
  }),
}))

vi.mock("@/components/location/Bank", () => ({ default: () => null }))
vi.mock("@/components/location/Cityhall", () => ({ default: () => null }))
vi.mock("@/components/location/Harbor", () => ({ default: () => null }))
vi.mock("@/components/location/Market", () => ({ default: () => null }))
vi.mock("@/components/location/Shipyard", () => ({ default: () => null }))
vi.mock("@/components/location/Shop", () => ({ default: () => null }))
vi.mock("@/components/location/Tavern", () => ({ default: () => null }))
vi.mock("@/components/Map/SeaMapCanvas", () => ({ default: () => null }))
vi.mock("@/components/game-ui/LocationHero/JourneyProgress", () => ({
  default: () => null,
}))
vi.mock("@/components/game-ui/ShowLocation/SeaEventDialog", () => ({
  default: () => null,
}))

describe("journey timer", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    state.continueJourney.mockClear()
    state.isPending = false
    state.player.character.location = "Sea"
    state.player.character.journey = {
      origin: "Bonaire",
      destination: "Villa Hermosa",
      day: 6,
      totalDays: 7,
    }
    state.player.locationStates = { sea: {} as SeaState }
  })

  afterEach(() => {
    state.cleanup?.()
    vi.useRealTimers()
  })

  it("resumes a saved journey without an ongoingJourney flag", () => {
    ShowLocation()

    vi.advanceTimersByTime(SEA_TRAVEL_SPEED - 1)
    expect(state.continueJourney).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(state.continueJourney).toHaveBeenCalledOnce()
  })

  it("schedules the arrival step on the final travel day", () => {
    state.player.character.journey!.day = 7
    ShowLocation()

    vi.advanceTimersByTime(SEA_TRAVEL_SPEED)
    expect(state.continueJourney).toHaveBeenCalledOnce()
  })

  it.each([
    "shipMeeting",
    "attackSuccessReport",
    "attackFailureReport",
  ] as const)("pauses for %s", (event) => {
    state.player.locationStates!.sea = { [event]: {} } as SeaState
    ShowLocation()

    vi.advanceTimersByTime(SEA_TRAVEL_SPEED)
    expect(state.continueJourney).not.toHaveBeenCalled()
  })

  it("waits for a pending journey mutation", () => {
    state.isPending = true
    ShowLocation()

    expect(vi.getTimerCount()).toBe(0)
  })

  it("does not schedule travel in port", () => {
    state.player.character.location = "Harbor"
    ShowLocation()

    expect(vi.getTimerCount()).toBe(0)
  })

  it("does not schedule travel without a journey", () => {
    state.player.character.journey = undefined
    ShowLocation()

    expect(vi.getTimerCount()).toBe(0)
  })

  it("cancels the timer when the view unmounts or its state changes", () => {
    ShowLocation()
    state.cleanup?.()

    vi.advanceTimersByTime(SEA_TRAVEL_SPEED)
    expect(state.continueJourney).not.toHaveBeenCalled()
  })
})
