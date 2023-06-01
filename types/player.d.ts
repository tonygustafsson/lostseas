type Player = {
  id: string
  createdDate: number
  character: Character
  ships: Record<string, Ship>
  crewMembers: Record<string, CrewMember>
  inventory: Inventory
}

type CreatePlayerServerRequest = Omit<Player, "id">

type CreatePlayerClientRequest = Omit<
  Player,
  "id" | "createdDate" | "ships" | "crewMembers" | "inventory"
>

type UpdatePlayerClientRequest = Partial<CreatePlayerClientRequest>
