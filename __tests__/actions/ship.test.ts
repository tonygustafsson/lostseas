import { describe, expect, it } from "vitest"

import { REPAIR_KIT_HEALTH } from "@/constants/ship"
import {
  removeShip,
  renameShip,
  repairShipWithKits,
  SHIP_NOT_FOUND,
} from "@/utils/actions/ship"
import type { ActionResult } from "@/utils/actions/types"
import { patchDeep } from "@/utils/patchDeep"

import { createTestPlayer, deepFreeze } from "../helpers/createTestPlayer"
import { createSeededRandom } from "../helpers/seededRandom"

const SHIP_ID = "6f1c2a52-3b6e-4b8e-9a51-5d0c2c1e7a11"
const OTHER_SHIP_ID = "0b5e9f3a-8c41-4c2d-b7a6-2e9d4f1c3b22"

const createFleetPlayer = (overrides: DeepPartial<Player> = {}) =>
  deepFreeze(
    patchDeep<Player>(
      createTestPlayer({
        ships: {
          "ship-1": null,
          [SHIP_ID]: {
            id: SHIP_ID,
            name: "Black Pearl",
            type: "Galleon",
            health: 45,
            createdDay: 1,
          },
          [OTHER_SHIP_ID]: {
            id: OTHER_SHIP_ID,
            name: "Swift",
            type: "Brig",
            health: 100,
            createdDay: 2,
          },
        },
        inventory: { repairKits: 10 },
      }),
      overrides
    )
  )

const expectSuccess = <T extends object>(result: ActionResult<T>) => {
  if ("error" in result) {
    throw new Error(`Expected success but got error: ${result.error}`)
  }

  return result
}

const expectError = (result: ActionResult, error: string) => {
  expect(result).toEqual({ error })
}

describe("removeShip", () => {
  it("removes only the chosen ship", () => {
    const result = expectSuccess(
      removeShip(createFleetPlayer(), { id: SHIP_ID })
    )

    expect(Object.keys(result.player.ships)).toEqual([OTHER_SHIP_ID])
    expect(result.log).toBe("Removed ship Black Pearl.")
  })

  it.each(["unknown", "", "constructor", "toString", "__proto__"])(
    "rejects ship id %s",
    (id) => {
      expect(removeShip(createFleetPlayer(), { id })).toEqual({
        error: SHIP_NOT_FOUND,
        status: 404,
      })
    }
  )
})

describe("removeShip limits", () => {
  it("rejects removing a ship at sea", () => {
    expectError(
      removeShip(createFleetPlayer({ character: { location: "Sea" } }), {
        id: SHIP_ID,
      }),
      "You cannot remove a ship while at sea."
    )
  })

  it("allows removing a ship in the harbor", () => {
    expectSuccess(
      removeShip(createFleetPlayer({ character: { location: "Harbor" } }), {
        id: SHIP_ID,
      })
    )
  })

  it("rejects removing the last ship", () => {
    const player = createFleetPlayer({ ships: { [OTHER_SHIP_ID]: null } })

    expectError(
      removeShip(player, { id: SHIP_ID }),
      "You cannot remove your last ship."
    )
  })
})

describe("renameShip", () => {
  it("renames the chosen ship and returns the old ship", () => {
    const player = createFleetPlayer()

    const result = expectSuccess(
      renameShip(player, { id: SHIP_ID, name: "Queen Anne" })
    )

    expect(result.player.ships[SHIP_ID].name).toBe("Queen Anne")
    expect(result.player.ships[OTHER_SHIP_ID].name).toBe("Swift")
    expect(result.log).toBe("Renamed ship Black Pearl to Queen Anne.")
    expect(result.data).toEqual({
      name: "Queen Anne",
      ship: player.ships[SHIP_ID],
    })
  })

  it.each(["A", "x".repeat(31), "", undefined, 42])(
    "rejects name %s with a readable message",
    (name) => {
      const result = renameShip(createFleetPlayer(), {
        id: SHIP_ID,
        name,
      } as never)

      expect("error" in result && typeof result.error).toBe("string")
      expect(result).not.toHaveProperty("player")
    }
  )

  it("rejects an id that is not a ship id", () => {
    const result = renameShip(createFleetPlayer(), {
      id: "ship-1",
      name: "Queen Anne",
    })

    expect("error" in result && typeof result.error).toBe("string")
  })

  it("rejects a ship the player does not own", () => {
    expectError(
      renameShip(createFleetPlayer(), {
        id: "11111111-1111-4111-8111-111111111111",
        name: "Queen Anne",
      }),
      SHIP_NOT_FOUND
    )
  })
})

describe("repairShipWithKits", () => {
  it("restores 10 points per kit", () => {
    const result = expectSuccess(
      repairShipWithKits(createFleetPlayer(), { id: SHIP_ID, quantity: 3 })
    )

    expect(result.player.ships[SHIP_ID].health).toBe(75)
    expect(result.player.inventory?.repairKits).toBe(7)
    expect(result.data).toEqual({ quantity: 3 })
  })

  it("caps health at 100 when the last kit is only partly used", () => {
    // 45% health needs 6 kits, the last one only restores 5 points
    const result = expectSuccess(
      repairShipWithKits(createFleetPlayer(), { id: SHIP_ID, quantity: 6 })
    )

    expect(result.player.ships[SHIP_ID].health).toBe(100)
    expect(result.player.inventory?.repairKits).toBe(4)
  })

  it("needs five kits for a ship at 50% health, as the guide says", () => {
    const player = createFleetPlayer({
      ships: { [SHIP_ID]: { health: 50 } },
    })

    expectSuccess(repairShipWithKits(player, { id: SHIP_ID, quantity: 5 }))
    expectError(
      repairShipWithKits(player, { id: SHIP_ID, quantity: 6 }),
      "This ship does not need that many repair kits"
    )
  })

  it("works anywhere, including at sea, as the guide says", () => {
    const player = createFleetPlayer({
      character: { location: "Sea", town: null },
    })

    expectSuccess(repairShipWithKits(player, { id: SHIP_ID, quantity: 1 }))
  })

  it.each([0, -1, 1.5, "2", null, undefined])(
    "rejects quantity %s",
    (quantity) => {
      expectError(
        repairShipWithKits(createFleetPlayer(), { id: SHIP_ID, quantity }),
        "Choose a ship and a positive whole number of repair kits"
      )
    }
  )

  it.each(["", 5, null, undefined])("rejects ship id %s", (id) => {
    expectError(
      repairShipWithKits(createFleetPlayer(), { id, quantity: 1 }),
      "Choose a ship and a positive whole number of repair kits"
    )
  })

  it("rejects a ship the player does not own", () => {
    expectError(
      repairShipWithKits(createFleetPlayer(), { id: "unknown", quantity: 1 }),
      SHIP_NOT_FOUND
    )
  })

  it("rejects repairing a ship at full health", () => {
    expectError(
      repairShipWithKits(createFleetPlayer(), {
        id: OTHER_SHIP_ID,
        quantity: 1,
      }),
      "This ship does not need that many repair kits"
    )
  })

  it("rejects using more kits than the player has", () => {
    const player = createFleetPlayer({ inventory: { repairKits: 2 } })

    expectError(
      repairShipWithKits(player, { id: SHIP_ID, quantity: 3 }),
      "Not enough repair kits"
    )
  })
})

describe("random fleet management", () => {
  it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])(
    "keeps the fleet consistent with seed %i",
    (seed) => {
      const random = createSeededRandom(seed)
      const NAMES: unknown[] = ["Queen Anne", "Revenge", "X", "", undefined]
      const QUANTITIES: unknown[] = [1, 2, 3, 5, 10, 0, -1, "2"]

      let player: Player = createFleetPlayer()
      const succeededActions = new Set<number>()

      for (let step = 0; step < 1000; step++) {
        // Sometimes ships take damage, new ships arrive and kits are found
        if (random.int(0, 3) === 0) {
          const newId = `${String(step).padStart(8, "0")}-0000-4000-8000-000000000000`
          const ships = Object.fromEntries(
            Object.entries(player.ships).map(([id, ship]) => [
              id,
              { ...ship, health: random.int(0, 100) },
            ])
          )

          player = {
            ...player,
            ships:
              random.int(0, 2) === 0
                ? {
                    ...ships,
                    [newId]: {
                      id: newId,
                      name: "New ship",
                      type: "Brig",
                      health: random.int(0, 100),
                      createdDay: step,
                    },
                  }
                : ships,
            inventory: {
              ...player.inventory,
              repairKits:
                (player.inventory?.repairKits ?? 0) + random.int(0, 5),
            },
          }
        }

        const before = deepFreeze(structuredClone(player))
        const shipIds = Object.keys(before.ships)
        const id =
          shipIds.length && random.int(0, 4) > 0
            ? random.pick(shipIds)
            : "unknown"
        // Removing is rarer, so the fleet does not run out of ships
        const action = random.int(0, 5) === 0 ? 0 : random.int(1, 2)
        const context = `seed ${seed}, step ${step}, action ${action}, ship ${id}`

        const result =
          action === 0
            ? removeShip(before, { id })
            : action === 1
              ? renameShip(before, {
                  id,
                  name: random.pick(NAMES) as string,
                })
              : repairShipWithKits(before, {
                  id,
                  quantity: random.pick(QUANTITIES),
                })

        if ("error" in result) {
          expect(result.error, context).toBeTruthy()
          continue
        }

        succeededActions.add(action)

        const after = result.player
        const afterIds = Object.keys(after.ships)

        expect(after.character, context).toEqual(before.character)
        expect(after.crewMembers, context).toEqual(before.crewMembers)

        Object.values(after.ships).forEach((ship) => {
          expect(ship.health, context).toBeGreaterThanOrEqual(0)
          expect(ship.health, context).toBeLessThanOrEqual(100)
        })

        if (action === 0) {
          expect(afterIds, context).toEqual(shipIds.filter((s) => s !== id))
        } else {
          expect(afterIds, context).toEqual(shipIds)
        }

        if (action === 2) {
          const { quantity } = result.data as { quantity: number }
          const healthGained = after.ships[id].health - before.ships[id].health
          const kitsUsed =
            (before.inventory?.repairKits ?? 0) -
            (after.inventory?.repairKits ?? 0)

          expect(kitsUsed, context).toBe(quantity)
          expect(healthGained, context).toBeLessThanOrEqual(
            quantity * REPAIR_KIT_HEALTH
          )
          // Only the last kit may be partly wasted
          expect(healthGained, context).toBeGreaterThan(
            (quantity - 1) * REPAIR_KIT_HEALTH
          )
        }

        player = after
      }

      // Guards against random play that only ever hits errors
      expect(succeededActions.size).toBe(3)
    }
  )
})
