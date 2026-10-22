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

type CreatePlayerClientRequest = Pick<Character, "name" | "characterId">
