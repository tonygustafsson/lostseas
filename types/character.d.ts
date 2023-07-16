type Character = {
  age: number
  name: string
  gender: "Male" | "Female"
  nationality: Nation
  title: Title
  town: Town | undefined
  location: TownLocation | SeaLocation
  journey?: {
    destination: Town
    day: number
    totalDays: number
    ongoingJourney?: true
  }
  gold: number
  account?: number
  loan?: number
  day: number
  battles?: Record<Nation | "Pirate", { won?: number; lost?: number }>
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

type CharacterCreation = Pick<
  Character,
  "name" | "nationality" | "gender" | "age"
>
