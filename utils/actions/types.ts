/**
 * Result of a pure game action. Either an error for the player (with an
 * optional HTTP status, 400 by default),
 * or the new player state with an optional log book entry and extra response data.
 */
export type ActionResult<T extends object = object> =
  | { error: string; status?: 400 | 404 | 409 }
  | { player: Player; log?: GameLog; data: T }

/** Returns a random whole number from min to max, both included. */
export type RandomInt = (min: number, max: number) => number
