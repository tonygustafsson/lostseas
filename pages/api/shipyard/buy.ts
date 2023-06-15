import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import { SHIP_TYPES } from "@/constants/ship"
import db from "@/firebase/db"
import createNewShip from "@/utils/createNewShip"

const shipyardBuy = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)
  const { playerId, item } = req.body

  if (!item || !Object.keys(SHIP_TYPES).includes(item || "")) {
    res.status(400).json({ error: "Not a valid item" })
    return
  }

  const shipItem = item as keyof typeof SHIP_TYPES
  const ship = SHIP_TYPES[shipItem]

  const totalPrice = ship.buy

  const playerRef = await get(child(dbRef, playerId))
  const player = playerRef.val()

  if (player.character.doubloons < totalPrice) {
    res.status(400).json({ error: "Not enough doubloons" })
    return
  }

  const newShip = createNewShip(shipItem as Ship["type"])

  console.log(newShip)

  const result: Player = {
    ...player,
    character: {
      ...player.character,
      doubloons: player.character.doubloons - totalPrice,
    },
    ships: {
      ...player.ships,
      [newShip.id]: newShip,
    },
  }

  await set(ref(db, playerId), result).catch((error) => {
    res.status(500).json({ error, item })
  })

  res.status(200).json({
    success: true,
    item,
    totalPrice,
  })
}

export default shipyardBuy
