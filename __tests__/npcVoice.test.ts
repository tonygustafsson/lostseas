import { existsSync } from "node:fs"
import { join } from "node:path"

import { describe, expect, it } from "vitest"

import { NPC_VOICE_CLIPS, NPCS } from "@/constants/npcs"
import { getNpcVoice, getNpcVoiceClip } from "@/utils/npc/voice"

const npc = NPCS.find((n) => n.name === "Griet Vogel")!

describe("npc voice", () => {
  it("picks the voice by personality type, gender and nation", () => {
    expect(getNpcVoice(npc)).toBe("gruff-female-holland")
  })

  it("has a recorded clip for every NPC voice", () => {
    NPCS.forEach((n) => {
      for (let i = 0; i < NPC_VOICE_CLIPS; i++) {
        const clip = getNpcVoiceClip(n, () => i / NPC_VOICE_CLIPS)

        expect(existsSync(join("public", clip)), clip).toBe(true)
      }
    })
  })

  it("picks a random clip", () => {
    expect(getNpcVoiceClip(npc, () => 0)).toBe(
      "/soundfx/npc/gruff-female-holland1.opus"
    )
    expect(getNpcVoiceClip(npc, () => 0.99)).toBe(
      "/soundfx/npc/gruff-female-holland4.opus"
    )
  })
})
