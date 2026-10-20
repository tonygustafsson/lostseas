import { beforeEach, describe, expect, it, vi } from "vitest"

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

    await savePlayerWithStatistics(player, "Started the game over.", {
      resetHistory: true,
    })

    expect(mocks.update).toHaveBeenCalledTimes(2)
    expect(mocks.update.mock.calls[0][0]).toEqual({
      [`players/${player.id}`]: player,
      [`logs/${player.id}`]: {
        "new-entry": {
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
        gold: 300,
      }),
    })
  })

  it("keeps history when saving a player normally", async () => {
    const player = createTestPlayer()

    await savePlayerWithStatistics(player, "New entry")

    expect(mocks.update.mock.calls[0][0]).toEqual({
      [`players/${player.id}`]: player,
      [`logs/${player.id}/new-entry`]: expect.objectContaining({
        message: "New entry",
      }),
    })
  })

  it("does not clear history separately if saving the new player fails", async () => {
    mocks.update.mockRejectedValue(new Error("Database down"))

    await expect(
      savePlayerWithStatistics(createTestPlayer(), "Reset", {
        resetHistory: true,
      })
    ).rejects.toThrow("Database down")
    expect(mocks.update).toHaveBeenCalledTimes(1)
  })
})
