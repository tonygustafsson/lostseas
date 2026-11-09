type NpcPlacement = "tavern" | "market" | "governor"

type PersonalityId =
  | "oldSalt"
  | "gossip"
  | "shrewdTrader"
  | "superstitious"
  | "braggart"
  | "melancholic"
  | "pompous"
  | "wearyVeteran"
  | "schemer"

type DialogueAnswer = { text: string; replies: string[] }

type DialogueEntry = { id: string; text: string; answers?: DialogueAnswer[] }

type Npc = {
  id: string
  name: string
  gender: "Male" | "Female"
  age: number
  town: Town
  placement: NpcPlacement
  personality: PersonalityId
  description: string
}

/** What a player has said to an NPC during the current visit */
type ConversationState = {
  /** Whether the NPC has had their one chance to offer a quest this visit */
  questRolled?: boolean
  /** The NPC has had enough of talking for this visit */
  tired?: boolean
  saidIds?: string[]
  pendingQuestionId?: string
  questOffer?: Quest
  /** Placeholder values picked for the pending question, so answers and replies agree */
  pendingValues?: Record<string, string>
}
