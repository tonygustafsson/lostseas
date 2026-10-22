import { godModePlayerSchema } from "@/utils/validation"

import type { ActionResult } from "./types"

/**
 * Replaces the player with the submitted one. The id and creation date always
 * stay the logged in player's, so a submitted player can never overwrite
 * another one.
 */
export const saveGodModePlayer = (
  player: Player,
  submitted: unknown
): ActionResult => {
  const parsed = godModePlayerSchema.safeParse(submitted)

  if (!parsed.success) {
    const issues = parsed.error.issues
      .slice(0, 3)
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)

    return { error: `Invalid player. ${issues.join(", ")}` }
  }

  return {
    player: {
      ...(parsed.data as Omit<Player, "id" | "createdDate">),
      id: player.id,
      createdDate: player.createdDate,
    },
    data: {},
  }
}
