import { describe, expect, it } from "vitest"

import { saveGodModePlayer } from "@/utils/actions/godMode"

import { createTestPlayer } from "../helpers/createTestPlayer"

describe("saveGodModePlayer", () => {
  it("replaces the player with the submitted one", () => {
    const player = createTestPlayer()
    const submitted = createTestPlayer({
      character: { gold: 999999, title: "Duke" },
      crewMembers: { count: 50 },
      inventory: { cannons: 99 },
    })

    const result = saveGodModePlayer(player, submitted)

    expect(result).toMatchObject({
      player: {
        character: { gold: 999999, title: "Duke" },
        crewMembers: { count: 50 },
        inventory: { food: 10, water: 20, cannons: 99 },
      },
    })
  })

  it("keeps the id and creation date of the logged in player", () => {
    const player = createTestPlayer({ id: "me", createdDate: 123 })
    const submitted = { ...createTestPlayer(), id: "someone-else" }

    const result = saveGodModePlayer(player, {
      ...submitted,
      createdDate: 999,
    })

    expect(result).toMatchObject({ player: { id: "me", createdDate: 123 } })
  })

  it("removes what is left out of the submitted player", () => {
    const player = createTestPlayer({ inventory: { food: 10 } })
    const { inventory, ...submitted } = createTestPlayer()

    expect(inventory).toBeDefined()

    const result = saveGodModePlayer(player, submitted)

    expect(result).not.toHaveProperty("player.inventory")
  })

  it("rejects an unknown town", () => {
    const submitted = createTestPlayer({
      character: { town: "Atlantis" as Town },
    })

    expect(saveGodModePlayer(createTestPlayer(), submitted)).toHaveProperty(
      "error"
    )
  })

  it("rejects negative gold and out of range health", () => {
    const player = createTestPlayer()

    expect(
      saveGodModePlayer(player, createTestPlayer({ character: { gold: -1 } }))
    ).toHaveProperty("error")

    expect(
      saveGodModePlayer(
        player,
        createTestPlayer({ crewMembers: { health: 101 } })
      )
    ).toHaveProperty("error")
  })

  it("rejects something that is not a player", () => {
    expect(saveGodModePlayer(createTestPlayer(), null)).toHaveProperty("error")
    expect(saveGodModePlayer(createTestPlayer(), {})).toHaveProperty("error")
  })
})
