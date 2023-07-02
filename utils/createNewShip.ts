import crypto from "crypto"

import getShipName from "./names/getShipName"

const createNewShip = (type: Ship["type"], playerDay: Character["day"]) => {
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

export default createNewShip
