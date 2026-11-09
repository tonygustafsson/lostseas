import { NPC_LINES, PERSONALITIES } from "@/constants/dialogue"
import type { RandomInt } from "@/utils/actions/types"
import { getRandomInt } from "@/utils/random"

const getPool = (npc: Npc) => [
  ...PERSONALITIES[npc.personality],
  ...(NPC_LINES[npc.id] ?? []),
]

/** Finds a line the NPC can say by its id, like a stored question */
export const findDialogue = (npc: Npc, id: string) =>
  getPool(npc).find((entry) => entry.id === id)

/**
 * Picks a question or a statement the NPC has not said this visit.
 * When every line of that kind has been said, lines may repeat.
 */
export const pickDialogue = (
  npc: Npc,
  saidIds: string[],
  wantQuestion: boolean,
  randomInt: RandomInt = getRandomInt
): DialogueEntry => {
  const pool = getPool(npc)
  const ofKind = pool.filter((entry) => !!entry.answers === wantQuestion)
  const unsaid = ofKind.filter((entry) => !saidIds.includes(entry.id))
  const options = unsaid.length ? unsaid : ofKind.length ? ofKind : pool

  return options[randomInt(0, options.length - 1)]
}
