import getShipName from "./names/getShipName"

export const createNewShip = (
  type: Ship["type"],
  playerDay: Character["day"]
) => {
  const name = getShipName()
  const id = crypto.randomUUID()

  const ship: Ship = {
    id,
    name,
    type,
    health: 100,
    createdDay: playerDay,
  }

  return ship
}

export const reduceShipsHealth = (
  ships: Record<string, Ship>,
  amount: number
) =>
  Object.entries(ships || {}).reduce(
    (acc, [shipId, ship]) => {
      acc[shipId] = {
        ...ship,
        health: ship.health - amount > 0 ? ship.health - amount : 0,
      }
      return acc
    },
    {} as Record<string, Ship>
  )
