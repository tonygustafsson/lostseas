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

/** Returns why a ship cannot be removed right now, or undefined if it can. */
export const getRemoveShipBlocker = (
  player: Pick<Player, "ships" | "character">
) => {
  if (player.character.location === "Sea") {
    return "You cannot remove a ship while at sea."
  }

  if (Object.keys(player.ships || {}).length <= 1) {
    return "You cannot remove your last ship."
  }
}

/** Looks up an owned ship without matching inherited keys like "constructor". */
export const getOwnedShip = (player: Pick<Player, "ships">, id: unknown) =>
  typeof id === "string" && Object.hasOwn(player.ships ?? {}, id)
    ? player.ships[id]
    : undefined
