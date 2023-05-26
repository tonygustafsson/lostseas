type CrewMember = {
  id: string
  name: string
  age: number
  gender: "Male" | "Female"
  createdDate: number
}

type CreateCrewMemberClientRequest = { userId: User["id"] }
type CreateCrewMemberServerRequest = CrewMember
