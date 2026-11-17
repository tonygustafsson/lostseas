import { describe, expect, it } from "vitest"

import {
  pickPlaceholderValues,
  resolvePlaceholders,
} from "@/utils/npc/placeholders"

import { createTestPlayer } from "../helpers/createTestPlayer"
import { createSeededRandom } from "../helpers/seededRandom"

const player = createTestPlayer({
  character: { name: "Test", title: "Captain", nationality: "England" },
})

describe("resolvePlaceholders", () => {
  it("fills player and town placeholders", () => {
    const text = resolvePlaceholders(
      "{name} {title} {town} {nation} {enemy} {playerNation}",
      { player, town: "havana" }
    )

    expect(text).toBe("Test captain Havana Spain Holland England")
  })

  it("picks other towns that match the rule", () => {
    const random = createSeededRandom(1).int

    for (let i = 0; i < 50; i++) {
      const [other, nation, enemy] = resolvePlaceholders(
        "{otherTown}|{nationTown}|{enemyTown}",
        { player, town: "havana" },
        random
      ).split("|")

      expect(other).not.toBe("Havana")
      expect(["Portobelo", "Campeche", "San Juan"]).toContain(nation)
      expect([
        "Savaneta",
        "Willemstad",
        "Simpson Bay",
        "St. Eustatius",
      ]).toContain(enemy)
    }
  })

  it("fills month and year from the game day", () => {
    const day70 = createTestPlayer({ character: { day: 70 } })

    expect(
      resolvePlaceholders("{month} {year}", { player: day70, town: "havana" })
    ).toBe("March 1715")
  })

  it("uses extra values", () => {
    expect(
      resolvePlaceholders("Take {parcel}", {
        player,
        town: "havana",
        extra: { parcel: "a sealed letter" },
      })
    ).toBe("Take a sealed letter")
  })

  it("leaves unknown placeholders untouched", () => {
    expect(resolvePlaceholders("{nope}", { player, town: "havana" })).toBe(
      "{nope}"
    )
  })

  it("renders nation adjectives", () => {
    expect(
      resolvePlaceholders(
        "{nationAdjective} {enemyAdjective} {playerNationAdjective}",
        { player, town: "havana" }
      )
    ).toBe("Spanish Dutch British")

    const french = createTestPlayer({ character: { nationality: "France" } })

    expect(
      resolvePlaceholders("{playerNationAdjective}", {
        player: french,
        town: "havana",
      })
    ).toBe("French")
  })

  it("only picks barter goods as merchandise", () => {
    const random = createSeededRandom(7).int
    const banned = ["food", "water", "medicine", "cannons", "repairKits"]

    for (let i = 0; i < 200; i++) {
      const goods = resolvePlaceholders(
        "{merchandise}",
        { player, town: "havana" },
        random
      )

      expect(banned).not.toContain(goods)
    }
  })

  it("capitalises a value at the start of a sentence or quote", () => {
    const context: { player: Player; town: Town } = {
      player,
      town: "havana",
    }

    expect(resolvePlaceholders("{title} {name}, welcome.", context)).toBe(
      "Captain Test, welcome."
    )
    expect(resolvePlaceholders("Hello. {title}!", context)).toBe(
      "Hello. Captain!"
    )
    expect(resolvePlaceholders('He said "{title}!"', context)).toBe(
      'He said "Captain!"'
    )
    expect(resolvePlaceholders("a {title}", context)).toBe("a captain")
  })

  it("does not resolve inherited object keys", () => {
    expect(resolvePlaceholders("{toString}", { player, town: "havana" })).toBe(
      "{toString}"
    )
  })

  it("capitalises a title directly before a name", () => {
    expect(
      resolvePlaceholders("Ah, {title} {name}. Not a {title}.", {
        player,
        town: "havana",
      })
    ).toBe("Ah, Captain Test. Not a captain.")
  })

  it("capitalises after an opening curly quote", () => {
    expect(
      resolvePlaceholders("He said “{title}!”", {
        player,
        town: "havana",
      })
    ).toBe("He said “Captain!”")
  })

  it("gives repeated random placeholders the same value in one text", () => {
    const random = createSeededRandom(3).int

    for (let i = 0; i < 30; i++) {
      const [a, b, c, d] = resolvePlaceholders(
        "{merchandise}|{merchandise}|{otherTown}|{otherTown}",
        { player, town: "havana" },
        random
      ).split("|")

      expect(a.toLowerCase()).toBe(b)
      expect(c).toBe(d)
    }
  })

  it("picks one value per placeholder across several texts", () => {
    const random = createSeededRandom(5).int

    for (let i = 0; i < 30; i++) {
      const values = pickPlaceholderValues(
        ["Buy {merchandise} in {otherTown}", "{nope} {toString} {merchandise}"],
        { player, town: "havana" },
        random
      )

      expect(Object.keys(values).sort()).toEqual(["merchandise", "otherTown"])

      const resolved = ["x {merchandise}", "y {merchandise}"].map((text) =>
        resolvePlaceholders(text, { player, town: "havana", extra: values })
      )

      expect(resolved[0].slice(2)).toBe(values.merchandise)
      expect(resolved[1].slice(2)).toBe(values.merchandise)
    }
  })
})
