type Character = {
  age: number
  name: string
  gender: "Male" | "Female"
  nationality: Nation
  town: Town | undefined
  location: TownLocation | SeaLocation
}
