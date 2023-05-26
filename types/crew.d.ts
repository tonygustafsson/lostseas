type CrewMember = {
  id: string
  name: string
  age: number
  gender: "male" | "female"
  createdDate: number
}

type CreateCrewMemberClientRequest = { userId: User["id"] }
type CreateCrewMemberServerRequest = CrewMember
