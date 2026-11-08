import { describe, expect, it } from "vitest"

import { NPCS } from "@/constants/npcs"
import { NPC_VOICE_VOLUMES } from "@/constants/npcVoices"
import { getNpcVoice, getNpcVoiceClip } from "@/utils/npcVoice"

const npc = NPCS.find((n) => n.name === "Griet Vogel")!

describe("npc voice", () => {
  it("picks the voice by personality type, gender and nation", () => {
    expect(getNpcVoice(npc)).toBe("gruff-female-holland")
  })

  it("has 4 recorded clips for every NPC", () => {
    NPCS.forEach((n) => {
      expect(NPC_VOICE_VOLUMES[getNpcVoice(n)], n.name).toHaveLength(4)
    })
  })

  it("picks a random clip with its own volume", () => {
    const voice = NPC_VOICE_VOLUMES["gruff-female-holland"]

    expect(getNpcVoiceClip(npc, () => 0)).toEqual({
      src: "/soundfx/npc/gruff-female-holland1.opus",
      volume: voice[0],
    })
    expect(getNpcVoiceClip(npc, () => 0.99).src).toBe(
      "/soundfx/npc/gruff-female-holland4.opus"
    )
  })
})
