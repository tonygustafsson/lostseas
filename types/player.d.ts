type Player = {
  id: string
  user: User
  character: Character
  ships?: Record<string, Ship>
  crewMembers?: Record<string, CrewMember>
  createdDate: number
}

type CreatePlayerServerRequest = Omit<Player, "id" | "ships" | "crewMembers">

type CreatePlayerClientRequest = Omit<
  Player,
  "id" | "createdDate" | "ships" | "crewMembers"
>

type UpdatePlayerClientRequest = Partial<CreatePlayerClientRequest>
