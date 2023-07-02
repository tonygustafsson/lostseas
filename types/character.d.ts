type Character = {
  age: number
  name: string
  gender: "Male" | "Female"
  nationality: Nation
  town: Town | undefined
  location: TownLocation | SeaLocation
  gold: number
  account?: number
  loan?: number
  day: number
}

type CharacterCreation = Pick<
  Character,
  "name" | "nationality" | "gender" | "age"
>
