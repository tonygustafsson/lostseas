type Player = {
  id: string
  createdDate: number
  character: Character
  ships: Record<string, Ship>
  crewMembers: Record<string, CrewMember>
  inventory: Inventory
}

type CreatePlayerServerRequest = Omit<Player, "id">

type CreatePlayerClientRequest = Pick<
  Character,
  "name",
  "gender",
  "age",
  "nationality"
>

type UpdatePlayerClientRequest = Partial<CreatePlayerClientRequest>
