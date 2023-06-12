type CrewMember = {
  id: string
  name: string
  age: number
  gender: "Male" | "Female"
  createdDate: number
}

type CreateCrewMemberClientRequest = { playerId: Player["id"] }
type CreateCrewMemberServerRequest = CrewMember
