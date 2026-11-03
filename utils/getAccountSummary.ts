import { getPlayerPasskeys } from "@/firebase/passkeys-db"

import type { RememberAccountInput } from "./rememberedAccounts"

// Sent back on sign-in so the device can remember the account
export const getAccountSummary = async (
  player: Player
): Promise<RememberAccountInput> => {
  const passkeys = await getPlayerPasskeys(player.id)

  return {
    playerId: player.id,
    name: player.character.name,
    characterId: player.character.characterId,
    credentialIds: passkeys.map(({ id }) => id),
  }
}
