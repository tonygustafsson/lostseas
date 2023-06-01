import crypto from "crypto"

import getShipName from "./getShipName"

const createNewShips = (count: number, type: Ship["type"]) => {
  const ships = {} as Record<string, Ship>

  Array.from({ length: count }).forEach(() => {
    const name = getShipName()
    const id = crypto.randomUUID()
    const createdDate = new Date().getTime()

    ships[id] = {
      id,
      name,
      type,
      createdDate,
    }
  })

  return ships
}

export default createNewShips
