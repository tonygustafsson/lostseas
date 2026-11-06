import "server-only"

import { ENGLAND_NPC_LINES } from "./npcLines/england"
import { FRANCE_NPC_LINES } from "./npcLines/france"
import { HOLLAND_NPC_LINES } from "./npcLines/holland"
import { SPAIN_NPC_LINES } from "./npcLines/spain"

export const NPC_LINES: Record<string, DialogueEntry[]> = {
  ...ENGLAND_NPC_LINES,
  ...FRANCE_NPC_LINES,
  ...SPAIN_NPC_LINES,
  ...HOLLAND_NPC_LINES,
}
