/** What a log book entry is about. The log book picks its icon and colour from it. */
type LogType =
  | "victory"
  | "defeat"
  | "attack"
  | "loot"
  | "voyage"
  | "honour"
  | "bank"
  | "trade"
  | "ship"
  | "crew"
  | "cards"
  | "beginning"
  | "quest"

/** A log book entry written by a game action */
type GameLog = {
  type: LogType
  message: string
}
