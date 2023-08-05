type Player = {
  id: string
  createdDate: number
  character: Character
  ships: Record<string, Ship>
  crewMembers: CrewMembers
  inventory?: Inventory
  treasures?: Record<string, Treasure>
  locationStates?: LocationStates
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
