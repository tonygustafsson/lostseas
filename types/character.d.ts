type Journey = {
  origin?: Town
  destination: Town
  day: number
  totalDays: number
}

type Character = {
  characterId: string
  name: string
  nationality: Nation
  title: Title
  town: Town | undefined
  location: TownLocation | SeaLocation
  journey?: Journey
  gold: number
  account?: number
  loan?: number
  day: number
  battles?: Record<Nation | "Pirate", { won?: number; lost?: number }>
  /** Highest title a reward has been paid for. Missing on older players, then the current title is used. */
  highestRewardedTitle?: Title
}

type Title =
  | "Pirate"
  | "Ensign"
  | "Captain"
  | "Major"
  | "Colonel"
  | "Admiral"
  | "Baron"
  | "Count"
  | "Marquis"
  | "Duke"

type CharacterCreation = Pick<Character, "name" | "nationality" | "characterId">
