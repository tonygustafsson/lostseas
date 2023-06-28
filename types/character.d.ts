type Character = {
  age: number
  name: string
  gender: "Male" | "Female"
  nationality: Nation
  town: Town | undefined | null
  location: TownLocation | SeaLocation
  gold: number
  account?: number | null
  loan?: number | null
  week: number
}

type CharacterCreation = Pick<
  Character,
  "name" | "nationality" | "gender" | "age"
>
