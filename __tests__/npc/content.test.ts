import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

import { describe, expect, it, vi } from "vitest"

import { NPC_LINES, PERSONALITIES } from "@/constants/dialogue"
import { TOWNS } from "@/constants/locations"
import { getNpcAt, getNpcById, NPCS } from "@/constants/npcs"
import { DIALOGUE_PLACEHOLDERS } from "@/utils/npc/placeholders"

vi.mock("server-only", () => ({}))

const PLACEMENTS: NpcPlacement[] = ["tavern", "market", "governor"]
const GOVERNOR_PERSONALITIES: PersonalityId[] = [
  "pompous",
  "wearyVeteran",
  "schemer",
]

const towns = Object.keys(TOWNS) as Town[]

describe("NPC roster", () => {
  it("every town has exactly one NPC per placement", () => {
    towns.forEach((town) => {
      PLACEMENTS.forEach((placement) => {
        const matches = NPCS.filter(
          (npc) => npc.town === town && npc.placement === placement
        )

        expect(matches, `${town} ${placement}`).toHaveLength(1)
        expect(getNpcAt(town, placement)).toBe(matches[0])
      })
    })

    expect(NPCS).toHaveLength(towns.length * PLACEMENTS.length)
  })

  it("NPC ids are unique and follow town-placement-name", () => {
    const ids = NPCS.map((npc) => npc.id)

    expect(new Set(ids).size).toBe(ids.length)

    NPCS.forEach((npc) => {
      expect(npc.id).toMatch(/^[a-z-]+-(tavern|market|governor)-[a-z-]+$/)
      expect(npc.id).toContain(`-${npc.placement}-`)
      expect(getNpcById(npc.id)).toBe(npc)
    })
  })

  it("governors use governor personalities and commoners do not", () => {
    NPCS.forEach((npc) => {
      const isGovernorPersonality = GOVERNOR_PERSONALITIES.includes(
        npc.personality
      )

      expect(isGovernorPersonality, npc.id).toBe(npc.placement === "governor")
    })
  })

  it("tavern and market in the same town have different personalities", () => {
    towns.forEach((town) => {
      expect(getNpcAt(town, "tavern").personality, town).not.toBe(
        getNpcAt(town, "market").personality
      )
    })
  })

  it("every NPC has a description", () => {
    NPCS.forEach((npc) => {
      expect(npc.description.length, npc.id).toBeGreaterThan(50)
    })
  })
})

const allEntries = [
  ...Object.values(PERSONALITIES).flat(),
  ...Object.values(NPC_LINES).flat(),
]

const allStrings = allEntries.flatMap((entry) => [
  entry.text,
  ...(entry.answers ?? []).flatMap((answer) => [
    answer.text,
    ...answer.replies,
  ]),
])

describe("NPC dialogue content", () => {
  it("every NPC has 5 to 10 own lines", () => {
    NPCS.forEach((npc) => {
      const lines = NPC_LINES[npc.id] ?? []

      expect(lines.length, npc.id).toBeGreaterThanOrEqual(5)
      expect(lines.length, npc.id).toBeLessThanOrEqual(10)

      lines.forEach((line, index) => {
        expect(line.id).toBe(`${npc.id}-${index + 1}`)
      })
    })

    const knownIds = new Set(NPCS.map((npc) => npc.id))

    Object.keys(NPC_LINES).forEach((id) => {
      expect(knownIds.has(id), id).toBe(true)
    })
  })

  it("dialogue entry ids are unique", () => {
    const ids = allEntries.map((entry) => entry.id)

    expect(ids.filter((id, index) => ids.indexOf(id) !== index)).toEqual([])
  })

  it("questions have 2 to 4 answers with at least 5 replies each", () => {
    allEntries.forEach((entry) => {
      if (!entry.answers) {
        return
      }

      expect(entry.answers.length, entry.id).toBeGreaterThanOrEqual(2)
      expect(entry.answers.length, entry.id).toBeLessThanOrEqual(4)

      entry.answers.forEach((answer) => {
        expect(
          answer.replies.length,
          `${entry.id} ${answer.text}`
        ).toBeGreaterThanOrEqual(5)
      })
    })
  })

  it("only known placeholders are used", () => {
    const known: readonly string[] = DIALOGUE_PLACEHOLDERS

    allStrings.forEach((text) => {
      for (const [, key] of text.matchAll(/\{(\w+)\}/g)) {
        expect(known, `${key} in "${text}"`).toContain(key)
      }
    })
  })

  it("every personality has at least 50 entries and about half are questions", () => {
    Object.entries(PERSONALITIES).forEach(([id, entries]) => {
      const questions = entries.filter((entry) => entry.answers).length
      const share = questions / entries.length

      expect(entries.length, id).toBeGreaterThanOrEqual(50)
      expect(share, id).toBeGreaterThanOrEqual(0.4)
      expect(share, id).toBeLessThanOrEqual(0.6)
    })

    expect(Object.keys(PERSONALITIES)).toHaveLength(9)
  })

  it("dialogue has no em dashes", () => {
    allStrings.forEach((text) => {
      expect(text).not.toContain("—")
    })
  })

  it("dialogue has no en dashes", () => {
    allStrings.forEach((text) => {
      expect(text).not.toContain("–")
    })
  })

  it("nations are never used as people nouns after 'the'", () => {
    allStrings.forEach((text) => {
      expect(text).not.toMatch(/the \{(enemy|nation|playerNation)\}/i)
    })
  })

  it("every dialogue file is server only", () => {
    const root = join(process.cwd(), "constants", "dialogue")
    const files = [root, join(root, "npcLines")].flatMap((dir) =>
      readdirSync(dir)
        .filter((name) => name.endsWith(".ts"))
        .map((name) => join(dir, name))
    )

    expect(files.length).toBeGreaterThanOrEqual(15)

    files.forEach((file) => {
      expect(
        readFileSync(file, "utf8").startsWith('import "server-only"'),
        file
      ).toBe(true)
    })
  })
})
