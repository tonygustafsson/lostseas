import { beforeEach, describe, expect, it, vi } from "vitest"

import { POST as buyFittings } from "@/app/api/shipyard/buyFittings/route"
import { POST as buyShip } from "@/app/api/shipyard/buyShip/route"
import { POST as repairShip } from "@/app/api/shipyard/repairShip/route"
import { POST as sellFittings } from "@/app/api/shipyard/sellFittings/route"
import { POST as sellShip } from "@/app/api/shipyard/sellShip/route"
import { patchDeep } from "@/utils/patchDeep"

import { createTestPlayer } from "../helpers/createTestPlayer"

// The game rules are tested in actions/shipyard.test.ts.
// These tests only check what the routes add: auth, saving and responses.

const mocks = vi.hoisted(() => ({
  playerId: "test-player" as string | undefined,
  player: undefined as Player | undefined,
  savePlayer: vi.fn(),
}))

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: () => (mocks.playerId ? { value: mocks.playerId } : undefined),
  }),
}))

vi.mock("@/firebase/db", () => ({
  getPlayer: async () => mocks.player,
  savePlayer: mocks.savePlayer,
}))

const request = (body: unknown) =>
  new Request("http://localhost/api/shipyard", {
    method: "POST",
    body: JSON.stringify(body),
  })

const routes = [
  {
    name: "buyFittings",
    call: () => buyFittings(request({ item: "cannons", quantity: 2 })),
    fields: ["item", "quantity", "totalQuantity", "totalPrice"],
  },
  {
    name: "sellFittings",
    call: () => sellFittings(request({ item: "cannons", quantity: 2 })),
    fields: ["item", "quantity", "totalQuantity", "totalPrice"],
  },
  {
    name: "buyShip",
    call: () => buyShip(request({ item: "Brig" })),
    fields: ["item", "totalPrice"],
  },
  {
    name: "sellShip",
    call: () => sellShip(request({ id: "ship-1" })),
    fields: ["ship", "totalPrice"],
  },
  {
    name: "repairShip",
    call: () => repairShip(request({ id: "ship-1" })),
    fields: ["ship", "totalPrice"],
  },
]

beforeEach(() => {
  vi.clearAllMocks()
  mocks.playerId = "test-player"
  mocks.player = createTestPlayer({
    character: { location: "Shipyard", gold: 10_000 },
    inventory: { cannons: 5 },
    ships: { "ship-1": { health: 50 } },
  })
  mocks.savePlayer.mockImplementation(async (player: Player) => player)
})

describe.each(routes)("POST /api/shipyard/$name", ({ call, fields }) => {
  it("returns 401 without a player cookie", async () => {
    mocks.playerId = undefined

    const response = await call()

    expect(response.status).toBe(401)
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })

  it("returns 401 when the player does not exist", async () => {
    mocks.player = undefined

    const response = await call()

    expect(response.status).toBe(401)
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })

  it("returns 400 with the game error and saves nothing", async () => {
    mocks.player = patchDeep<Player>(mocks.player!, {
      character: { location: "Shop" },
    })

    const response = await call()

    expect(response.status).toBe(400)
    expect(await response.json()).toMatchObject({
      error: "You must be at Shipyard to do this.",
    })
    expect(mocks.savePlayer).not.toHaveBeenCalled()
  })

  it("saves the new player with a log and returns it", async () => {
    const response = await call()
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(mocks.savePlayer).toHaveBeenCalledOnce()

    const [savedPlayer, savedLog] = mocks.savePlayer.mock.calls[0]

    expect(savedPlayer).not.toEqual(mocks.player)
    expect(typeof savedLog).toBe("string")
    expect(body.success).toBe(true)
    expect(body.updatedPlayer).toEqual(savedPlayer)
    fields.forEach((field) => expect(body).toHaveProperty(field))
  })

  it("returns 500 when saving fails", async () => {
    mocks.savePlayer.mockRejectedValue("Database down")

    const response = await call()

    expect(response.status).toBe(500)
    expect(await response.json()).toMatchObject({ error: "Database down" })
  })
})

describe("POST /api/shipyard/buyShip", () => {
  it.each([
    ["not enough gold", { character: { gold: 0 } }, "Not enough gold"],
    [
      "too many ships",
      { character: { title: "Pirate" as Title }, ships: { a: {}, b: {} } },
      "Max ships reached due to title",
    ],
  ])("returns 400 with the item for %s", async (_, overrides, error) => {
    mocks.player = patchDeep<Player>(
      mocks.player!,
      overrides as DeepPartial<Player>
    )

    const response = await buyShip(request({ item: "Brig" }))

    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({ error, item: "Brig" })
  })
})
