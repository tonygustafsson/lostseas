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
  image?: string
}

/** What a player has said to an NPC during the current visit */
type ConversationState = {
  talks: number
  saidIds?: string[]
  pendingQuestionId?: string
  questOffer?: Quest
  /** Placeholder values picked for the pending question, so answers and replies agree */
  pendingValues?: Record<string, string>
}
