export const reduceShipsHealth = (
  ships: Record<string, Ship>,
  amount: number
) =>
  Object.entries(ships || {}).reduce((acc, [shipId, ship]) => {
    acc[shipId] = {
      ...ship,
      health: ship.health - amount > 0 ? ship.health - amount : 0,
    }
    return acc
  }, {} as Record<string, Ship>)
