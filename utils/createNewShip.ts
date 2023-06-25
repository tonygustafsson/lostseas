import crypto from "crypto"

import getShipName from "./names/getShipName"

const createNewShip = (type: Ship["type"], playerWeek: Character["week"]) => {
  const name = getShipName()
  const id = crypto.randomUUID()

  const ship: Ship = {
    id,
    name,
    type,
    health: 100,
    createdWeek: playerWeek,
  }

  return ship
}

export default createNewShip
