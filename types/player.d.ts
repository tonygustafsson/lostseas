type Player = {
  id: string
  createdDate: number
  character: Character
  ships: Record<string, Ship>
  crewMembers: CrewMembers
  inventory?: Inventory
  treasures?: Record<string, Treasure>
  wantedPirates?: Record<string, WantedPirate>
  locationStates?: LocationStates
  quests?: Record<string, Quest>
}

type CreatePlayerClientRequest = Pick<Character, "name" | "characterId">
