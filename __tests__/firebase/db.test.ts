import { beforeEach, describe, expect, it, vi } from "vitest"

import {
  getLeaderboard,
  getLog,
  LEADERBOARD_SIZE,
  LOG_PAGE_SIZE,
  type LogEntry,
  savePlayer,
} from "@/firebase/db"

import { createTestPlayer } from "../helpers/createTestPlayer"

const mocks = vi.hoisted(() => ({
  ref: vi.fn(),
  update: vi.fn(),
  push: vi.fn(),
}))

vi.mock("server-only", () => ({}))
vi.mock("@/firebase/firebase-admin", () => ({
  adminDb: { ref: mocks.ref },
}))

beforeEach(() => {
  vi.resetAllMocks()
  mocks.ref.mockReturnValue(mocks)
  mocks.push.mockReturnValue({ key: "new-entry" })
})

describe("saving the player", () => {
  it("replaces the log and statistics on reset, in one write", async () => {
    const player = createTestPlayer({ character: { day: 1, gold: 300 } })

    await savePlayer(
      player,
      { type: "beginning", message: "Started the game over." },
      { resetHistory: true, withStatistics: true }
    )

    expect(mocks.update).toHaveBeenCalledOnce()
    expect(mocks.update.mock.calls[0][0]).toEqual({
      [`players/${player.id}`]: player,
      [`leaderboard/${player.id}`]: expect.objectContaining({ day: 1 }),
      [`logs/${player.id}`]: {
        "new-entry": {
          type: "beginning",
          message: "Started the game over.",
          day: 1,
          timestamp: expect.any(Number),
        },
      },
      [`statistics/${player.id}`]: {
        "new-entry": expect.objectContaining({
          day: 1,
          netWorth: 300,
          battlesWon: 0,
          timestamp: expect.any(Number),
        }),
      },
    })
  })

  it("clears statistics on reset when no snapshot is asked for", async () => {
    const player = createTestPlayer()

    await savePlayer(player, undefined, { resetHistory: true })

    expect(mocks.update.mock.calls[0][0]).toMatchObject({
      [`logs/${player.id}`]: null,
      [`statistics/${player.id}`]: null,
    })
  })

  it("adds to the history when saving normally", async () => {
    const player = createTestPlayer()

    await savePlayer(
      player,
      { type: "trade", message: "New entry" },
      { withStatistics: true }
    )

    expect(mocks.update.mock.calls[0][0]).toEqual({
      [`players/${player.id}`]: player,
      [`leaderboard/${player.id}`]: expect.any(Object),
      [`logs/${player.id}/new-entry`]: expect.objectContaining({
        type: "trade",
        message: "New entry",
      }),
      [`statistics/${player.id}/new-entry`]: expect.objectContaining({
        netWorth: expect.any(Number),
      }),
    })
  })

  it("leaves statistics alone unless asked", async () => {
    const player = createTestPlayer()

    await savePlayer(player, { type: "trade", message: "New entry" })

    expect(Object.keys(mocks.update.mock.calls[0][0])).not.toContain(
      `statistics/${player.id}/new-entry`
    )
  })
})

describe("log book paging", () => {
  const storedLogs = (count: number) =>
    Object.fromEntries(
      Array.from({ length: count }, (_, index) => [
        `key-${index}`,
        {
          day: 1,
          timestamp: index,
          message: `Entry ${index}`,
          type: "trade" as const,
        },
      ])
    )

  const mockQuery = (logs: Record<string, LogEntry>) => {
    const query = {
      orderByChild: vi.fn(),
      endBefore: vi.fn(),
      limitToLast: vi.fn(),
      get: vi.fn().mockResolvedValue({
        exists: () => Object.keys(logs).length > 0,
        val: () => logs,
      }),
    }
    query.orderByChild.mockReturnValue(query)
    query.endBefore.mockReturnValue(query)
    query.limitToLast.mockReturnValue(query)
    mocks.ref.mockReturnValue(query)

    return query
  }

  it("returns the newest page oldest first, with keys as ids", async () => {
    mockQuery(storedLogs(3))

    const page = await getLog("player-1")

    expect(page.hasMore).toBe(false)
    expect(page.entries.map(({ id }) => id)).toEqual([
      "key-0",
      "key-1",
      "key-2",
    ])
  })

  it("reports more when the extra entry comes back, and leaves it out", async () => {
    const query = mockQuery(storedLogs(LOG_PAGE_SIZE + 1))

    const page = await getLog("player-1")

    expect(query.limitToLast).toHaveBeenCalledWith(LOG_PAGE_SIZE + 1)
    expect(page.hasMore).toBe(true)
    expect(page.entries).toHaveLength(LOG_PAGE_SIZE)
    expect(page.entries[0].id).toBe("key-1")
  })

  it("loads entries older than the cursor", async () => {
    const query = mockQuery(storedLogs(2))

    await getLog("player-1", { timestamp: 50, id: "key-50" })

    expect(query.endBefore).toHaveBeenCalledWith(50, "key-50")
  })

  it("returns an empty page when nothing is stored", async () => {
    mockQuery({})

    expect(await getLog("player-1")).toEqual({ entries: [], hasMore: false })
  })
})

describe("leaderboard", () => {
  it("saves only public fields with the player", async () => {
    const player = createTestPlayer({
      character: { name: "Anne", title: "Captain", day: 12 },
    })

    await savePlayer(player)

    expect(mocks.update.mock.calls[0][0][`leaderboard/${player.id}`]).toEqual({
      name: "Anne",
      characterId: player.character.characterId,
      title: "Captain",
      nationality: player.character.nationality,
      score: expect.any(Number),
      day: 12,
    })
  })

  it("returns the top captains best first, without player ids", async () => {
    const query = {
      orderByChild: vi.fn(),
      limitToLast: vi.fn(),
      get: vi.fn().mockResolvedValue({
        exists: () => true,
        val: () => ({
          "player-1": { name: "Low", score: 5 },
          "player-2": { name: "High", score: 50 },
        }),
      }),
    }
    query.orderByChild.mockReturnValue(query)
    query.limitToLast.mockReturnValue(query)
    mocks.ref.mockReturnValue(query)

    const entries = await getLeaderboard()

    expect(query.orderByChild).toHaveBeenCalledWith("score")
    expect(query.limitToLast).toHaveBeenCalledWith(LEADERBOARD_SIZE)
    expect(entries).toEqual([
      { name: "High", score: 50 },
      { name: "Low", score: 5 },
    ])
  })
})
