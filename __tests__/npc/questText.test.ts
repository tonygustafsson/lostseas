import { describe, expect, it, vi } from "vitest"

import { getQuestObjective, goodsName } from "@/utils/npc/questText"

vi.mock("@/constants/npcs", async (importOriginal) => {
  const original = await importOriginal<typeof import("@/constants/npcs")>()

  const npc = (
    id: string,
    name: string,
    town: Town,
    placement: NpcPlacement
  ): Npc => ({
    id,
    name,
    town,
    placement,
    gender: "Female",
    age: 30,
    personality: "gossip",
    description: "",
  })

  const npcs = [
    npc("catalina", "Catalina Ruiz", "Havana", "market"),
    npc("tom", "Tom Pickering", "Port Royale", "tavern"),
    npc("margot", "Margot Lefèvre", "Tortuga", "tavern"),
    npc("isabel", "Isabel Navarro", "Villa Hermosa", "market"),
  ]

  return {
    ...original,
    NPCS: npcs,
    getNpcById: (id: string) => npcs.find((item) => item.id === id),
  }
})

const base = {
  id: "quest-1",
  giverId: "isabel",
  acceptedDay: 1,
  pitch: "",
  reward: { gold: 100 },
}

describe("goodsName", () => {
  it("names goods with their unit", () => {
    expect(goodsName("rum")).toBe("barrels of rum")
  })
})

describe("getQuestObjective", () => {
  it("describes a delivery", () => {
    expect(
      getQuestObjective({
        ...base,
        type: "delivery",
        parcel: "a sealed letter",
        targetNpcId: "catalina",
      })
    ).toBe("Deliver a sealed letter to Catalina Ruiz, the market in Havana")
  })

  it("describes a procurement", () => {
    expect(
      getQuestObjective({
        ...base,
        giverId: "tom",
        type: "procurement",
        item: "rum",
        quantity: 40,
      })
    ).toBe(
      "Bring 40 barrels of rum to Tom Pickering, the tavern in Port Royale"
    )
  })

  it("describes a message chain step", () => {
    expect(
      getQuestObjective({
        ...base,
        type: "messageChain",
        stepNpcIds: ["margot", "catalina", "isabel"],
        step: 0,
      })
    ).toBe("Speak to Margot Lefèvre, the tavern in Tortuga (step 1 of 3)")
  })

  it("sends the player back to the giver on the last chain step", () => {
    expect(
      getQuestObjective({
        ...base,
        type: "messageChain",
        stepNpcIds: ["margot", "catalina", "isabel"],
        step: 2,
      })
    ).toBe("Return to Isabel Navarro, the market in Villa Hermosa")
  })

  it("describes a missing person search", () => {
    expect(
      getQuestObjective({
        ...base,
        type: "findPerson",
        personName: "Diego Navarro",
        nation: "Spain",
        hiddenTown: "Havana",
      })
    ).toBe("Find Diego Navarro somewhere in Spain's towns")
  })

  it("sends the player back to the giver once the person is found", () => {
    expect(
      getQuestObjective({
        ...base,
        type: "findPerson",
        personName: "Diego Navarro",
        nation: "Spain",
        hiddenTown: "Havana",
        found: true,
      })
    ).toBe("Return to Isabel Navarro, the market in Villa Hermosa")
  })
})
