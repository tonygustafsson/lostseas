import { describe, expect, it, vi } from "vitest"

import { NPC_LINES, PERSONALITIES } from "@/constants/dialogue"
import { getNpcAt } from "@/constants/npcs"
import { findDialogue, pickDialogue } from "@/utils/npc/pickDialogue"

vi.mock("server-only", () => ({}))

const npc = getNpcAt("kingston", "tavern")

const pool = [...PERSONALITIES[npc.personality], ...(NPC_LINES[npc.id] ?? [])]
const questions = pool.filter((entry) => entry.answers)
const statements = pool.filter((entry) => !entry.answers)

const pickFirst = () => 0
const pickLast = (_min: number, max: number) => max

describe("pickDialogue", () => {
  it("picks a question when asked for one, and a statement otherwise", () => {
    expect(pickDialogue(npc, [], true, pickFirst).answers).toBeDefined()
    expect(pickDialogue(npc, [], false, pickFirst).answers).toBeUndefined()
  })

  it("skips lines already said this visit", () => {
    const said = [questions[0].id]

    expect(pickDialogue(npc, said, true, pickFirst).id).toBe(questions[1].id)
  })

  it("picks from the lines not said yet, whichever the random pick", () => {
    const said = statements.slice(0, -1).map((entry) => entry.id)

    expect(pickDialogue(npc, said, false, pickFirst).id).toBe(
      statements.at(-1)?.id
    )
    expect(pickDialogue(npc, said, false, pickLast).id).toBe(
      statements.at(-1)?.id
    )
  })

  it("repeats lines once every line of that kind has been said", () => {
    const said = questions.map((entry) => entry.id)

    expect(pickDialogue(npc, said, true, pickFirst).id).toBe(questions[0].id)
  })

  it("keeps the kind it was asked for when repeating", () => {
    const said = statements.map((entry) => entry.id)

    expect(pickDialogue(npc, said, false, pickFirst).answers).toBeUndefined()
  })
})

describe("findDialogue", () => {
  it("finds a line the NPC can say by its id", () => {
    expect(findDialogue(npc, questions[0].id)).toEqual(questions[0])
  })

  it("finds nothing for an unknown id", () => {
    expect(findDialogue(npc, "no-such-line")).toBeUndefined()
  })
})
