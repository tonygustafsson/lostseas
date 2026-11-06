import "server-only"

import { BRAGGART } from "./braggart"
import { GOSSIP } from "./gossip"
import { MELANCHOLIC } from "./melancholic"
import { OLD_SALT } from "./oldSalt"
import { POMPOUS } from "./pompous"
import { SCHEMER } from "./schemer"
import { SHREWD_TRADER } from "./shrewdTrader"
import { SUPERSTITIOUS } from "./superstitious"
import { WEARY_VETERAN } from "./wearyVeteran"

export { NPC_LINES } from "./npcLines"

export const PERSONALITIES: Record<PersonalityId, DialogueEntry[]> = {
  oldSalt: OLD_SALT,
  gossip: GOSSIP,
  shrewdTrader: SHREWD_TRADER,
  superstitious: SUPERSTITIOUS,
  braggart: BRAGGART,
  melancholic: MELANCHOLIC,
  pompous: POMPOUS,
  wearyVeteran: WEARY_VETERAN,
  schemer: SCHEMER,
}
