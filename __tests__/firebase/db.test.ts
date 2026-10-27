import { beforeEach, describe, expect, it, vi } from "vitest"

import { getLog, LOG_PAGE_SIZE, type LogEntry } from "@/firebase/db"
import { savePlayerWithStatistics } from "@/utils/db/savePlayerWithStatistics"

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

describe("reset persistence", () => {
  it("atomically replaces the player and log, clears old statistics, then saves the new baseline", async () => {
    const player = createTestPlayer({ character: { day: 1, gold: 300 } })

    await savePlayerWithStatistics(
      player,
      { type: "beginning", message: "Started the game over." },
      { resetHistory: true }
    )

    expect(mocks.update).toHaveBeenCalledTimes(2)
    expect(mocks.update.mock.calls[0][0]).toEqual({
      [`players/${player.id}`]: player,
      [`logs/${player.id}`]: {
        "new-entry": {
          type: "beginning",
          message: "Started the game over.",
          day: 1,
          timestamp: expect.any(Number),
        },
      },
      [`statistics/${player.id}`]: null,
    })
    expect(mocks.update.mock.calls[1][0]).toEqual({
      [`statistics/${player.id}/new-entry`]: expect.objectContaining({
        day: 1,
        netWorth: 300,
      }),
    })
  })

  it("keeps history when saving a player normally", async () => {
    const player = createTestPlayer()

    await savePlayerWithStatistics(player, {
      type: "trade",
      message: "New entry",
    })

    expect(mocks.update.mock.calls[0][0]).toEqual({
      [`players/${player.id}`]: player,
      [`logs/${player.id}/new-entry`]: expect.objectContaining({
        type: "trade",
        message: "New entry",
      }),
    })
  })

  it("does not clear history separately if saving the new player fails", async () => {
    mocks.update.mockRejectedValue(new Error("Database down"))

    await expect(
      savePlayerWithStatistics(
        createTestPlayer(),
        { type: "beginning", message: "Reset" },
        { resetHistory: true }
      )
    ).rejects.toThrow("Database down")
    expect(mocks.update).toHaveBeenCalledTimes(1)
  })
})

describe("log book paging", () => {
  const storedLogs = (count: number) =>
    Object.fromEntries(
      Array.from({ length: count }, (_, index) => [
        `key-${index}`,
        { day: 1, timestamp: index, message: `Entry ${index}` },
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
