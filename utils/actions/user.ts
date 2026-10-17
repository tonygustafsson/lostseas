import { LOCATIONS } from "@/constants/locations"

type NewPlayerInput = Pick<Character, "name" | "nationality" | "gender" | "age">

/** The starting state of every new player. */
export const createNewPlayer = (
  { name, nationality, gender, age }: NewPlayerInput,
  {
    id,
    createdDate,
    startingTown,
    ship,
  }: {
    id: Player["id"]
    createdDate: number
    startingTown: Town
    ship: Ship
  }
): Player => ({
  id,
  createdDate,
  character: {
    name,
    nationality,
    title: "Pirate",
    gender,
    age,
    town: startingTown,
    location: LOCATIONS.harbor,
    gold: 300,
    day: 1,
  },
  inventory: {
    food: 20,
    water: 40,
    cannons: 2,
  },
  ships: {
    [ship.id]: ship,
  },
  crewMembers: {
    count: 4,
    health: 100,
    mood: 100,
  },
})
