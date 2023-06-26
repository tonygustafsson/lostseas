import { getCookie } from "cookies-next"
import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import { SHIP_TYPES } from "@/constants/ship"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import db from "@/firebase/db"
import createNewShip from "@/utils/createNewShip"

const shipyardBuy = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const dbRef = ref(db)
  const { item } = req.body

  if (!item || !Object.keys(SHIP_TYPES).includes(item || "")) {
    res.status(400).json({ error: "Not a valid item" })
    return
  }

  const shipItem = item as keyof typeof SHIP_TYPES
  const ship = SHIP_TYPES[shipItem]

  const totalPrice = ship.buy

  const playerRef = await get(child(dbRef, playerId))
  const player = playerRef.val()

  if (player.character.gold < totalPrice) {
    res.status(400).json({ error: "Not enough gold", item })
    return
  }

  const newShip = createNewShip(shipItem as Ship["type"], player.character.week)

  const result: Player = {
    ...player,
    character: {
      ...player.character,
      gold: player.character.gold - totalPrice,
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
