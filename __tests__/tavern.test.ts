import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { POST } from "@/app/api/tavern/treat-crew/route"
import { TAVERN_ITEMS } from "@/constants/tavern"
import { useTavern } from "@/hooks/queries/useTavern"

const mocks = vi.hoisted(() => ({
  getPlayer: vi.fn(),
  savePlayer: vi.fn(),
  useMutation: vi.fn(),
  queryClient: {
    cancelQueries: vi.fn(),
    getQueryData: vi.fn(),
    setQueryData: vi.fn(),
  },
}))

vi.mock("next/headers", () => ({
  cookies: async () => ({ get: () => ({ value: "test-player" }) }),
}))

vi.mock("@/firebase/db", () => ({
  getPlayer: mocks.getPlayer,
  savePlayer: mocks.savePlayer,
}))

vi.mock("@tanstack/react-query", () => ({
  useMutation: mocks.useMutation,
  useQueryClient: () => mocks.queryClient,
}))

vi.mock("@/app/stores/sound", () => ({
  default: () => ({ playSoundEffect: vi.fn() }),
}))

vi.mock("@/app/stores/toasts", () => ({
  useToasts: () => vi.fn(),
}))

vi.mock("@/hooks/queries/usePlayer", () => ({ PLAYER_QUERY_KEY: "player" }))

type TavernItem = keyof typeof TAVERN_ITEMS

const TavernMutationTest = () => {
  useTavern()
  return null
}

const createPlayer = (mood = 50, health = 80): Player => ({
  id: "test-player",
  createdDate: 0,
  character: {
    name: "Test",
    age: 30,
    gender: "Male",
    nationality: "England",
    title: "Pirate",
    town: "Port Royale",
    location: "Tavern",
    gold: 10000,
    day: 1,
  },
  ships: {},
  crewMembers: { count: 4, mood, health },
})

const treatCrew = async (
  path: "api" | "optimistic update",
  player: Player,
  item: TavernItem
): Promise<Player> => {
  if (path === "api") {
    mocks.getPlayer.mockResolvedValue(player)
    const response = await POST(
      new Request("http://localhost/api/tavern/treat-crew", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item }),
      })
    )
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.newMood).toBe(data.updatedPlayer.crewMembers.mood)
    expect(data.newHealth).toBe(data.updatedPlayer.crewMembers.health)
    expect(data.totalPrice).toBe(
      TAVERN_ITEMS[item].price * player.crewMembers.count
    )
    expect(mocks.savePlayer).toHaveBeenCalledWith(
      data.updatedPlayer,
      expect.any(String)
    )

    return data.updatedPlayer
  }

  mocks.queryClient.getQueryData.mockReturnValue(player)
  renderToStaticMarkup(createElement(TavernMutationTest))
  const mutation = mocks.useMutation.mock.calls[0][0] as {
    onMutate: (data: { item: TavernItem }) => Promise<{ previous?: Player }>
  }
  const context = await mutation.onMutate({ item })

  expect(context.previous).toBe(player)
  expect(mocks.queryClient.cancelQueries).toHaveBeenCalledWith({
    queryKey: ["player"],
  })
  expect(mocks.queryClient.setQueryData).toHaveBeenCalledWith(
    ["player"],
    expect.any(Object)
  )

  return mocks.queryClient.setQueryData.mock.calls[0][1] as Player
}

beforeEach(() => {
  vi.clearAllMocks()
  mocks.savePlayer.mockImplementation(async (player: Player) => player)
  mocks.useMutation.mockReturnValue({
    mutate: vi.fn(),
    mutateAsync: vi.fn(),
    isPending: false,
  })
})

describe.each(["api", "optimistic update"] as const)(
  "tavern treatment: %s",
  (path) => {
    it.each([
      ["serve-supper", 53, 100, 100],
      ["smoke-tobacco", 55, 80, 120],
      ["pour-the-wine", 57, 80, 200],
      ["pass-the-rum", 60, 80, 280],
    ] as const)(
      "%s increases mood above 40 and charges for every crew member",
      async (item, expectedMood, expectedHealth, expectedPrice) => {
        const player = createPlayer()
        const updated = await treatCrew(path, player, item)

        expect(updated.crewMembers).toEqual({
          count: 4,
          mood: expectedMood,
          health: expectedHealth,
        })
        expect(updated.character.gold).toBe(10000 - expectedPrice)
        expect(player.crewMembers).toEqual({ count: 4, mood: 50, health: 80 })
        expect(player.character.gold).toBe(10000)
      }
    )

    it.each([
      [0, 5],
      [35, 40],
      [36, 41],
      [40, 45],
      [94, 99],
      [95, 100],
      [96, 100],
      [100, 100],
    ])("tobacco changes mood from %i to %i", async (mood, expectedMood) => {
      const updated = await treatCrew(path, createPlayer(mood), "smoke-tobacco")

      expect(updated.crewMembers.mood).toBe(expectedMood)
      expect(updated.crewMembers.health).toBe(80)
    })

    it.each([
      ["serve-supper", 100],
      ["smoke-tobacco", 100],
      ["pour-the-wine", 100],
      ["pass-the-rum", 100],
    ] as const)("%s caps mood at 100", async (item, expectedMood) => {
      const updated = await treatCrew(path, createPlayer(98), item)

      expect(updated.crewMembers.mood).toBe(expectedMood)
    })
  }
)
