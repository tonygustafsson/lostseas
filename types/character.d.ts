type Journey = {
  destination: Town
  day: number
  totalDays: number
  ongoingJourney?: true
}

type Character = {
  age: number
  name: string
  gender: "Male" | "Female"
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
}
type Prefixed<T, P extends string> = {
  [K in keyof T & string as `${P}${K}`]?: T[K]
}

type CharacterDB = Partial<
  Prefixed<Omit<Character, "journey" | "battles">, "character/"> & {
    "character/journey/destination"?: Journey["destination"]
    "character/journey/day"?: Journey["day"]
    "character/journey/totalDays"?: Journey["totalDays"]
    "character/journey/ongoingJourney"?: Journey["ongoingJourney"]
    "character/battles/England/won"?: number
    "character/battles/England/lost"?: number
    "character/battles/Spain/won"?: number
    "character/battles/Spain/lost"?: number
    "character/battles/France/won"?: number
    "character/battles/France/lost"?: number
    "character/battles/Holland/won"?: number
    "character/battles/Holland/lost"?: number
    "character/battles/Pirate/won"?: number
    "character/battles/Pirate/lost"?: number
  }
>

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
