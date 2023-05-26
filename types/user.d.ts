type User = {
  characterAge: number
  characterName: string
  id: string
  name: string
  ships?: Record<string, Ship>
  crewMembers?: Record<string, CrewMember>
  createdDate: number
}

type CreateUserServerRequest = Omit<User, "id" | "ships">

type CreateUserClientRequest = Omit<User, "id" | "createdDate" | "ships">
