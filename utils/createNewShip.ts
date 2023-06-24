import crypto from "crypto"

import getShipName from "./names/getShipName"

const createNewShip = (type: Ship["type"]) => {
  const name = getShipName()
  const id = crypto.randomUUID()
  const createdDate = new Date().getTime()

  const ship: Ship = {
    id,
    name,
    type,
    createdDate,
  }

  return ship
}

export default createNewShip
