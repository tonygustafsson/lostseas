import { child, get, ref, remove, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import { SHIP_TYPES } from "@/constants/ship"
import db from "@/firebase/db"

const shipyardSell = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)

  const { playerId, id }: { playerId: Player["id"]; id: Ship["id"] } = req.body

  const playerRef = await get(child(dbRef, playerId))
  const player = playerRef.val() as Player

  const ship = (player.ships || {})[id]

  if (!ship) {
    res.status(400).json({ error: "Not a valid item" })
    return
  }

  const shipInfo = SHIP_TYPES[ship.type as keyof typeof SHIP_TYPES]
  const totalPrice = shipInfo.sell

  const result: Player = {
    ...player,
    character: {
      ...player.character,
      gold: player.character.gold + totalPrice,
    },
  }

  await set(ref(db, playerId), result).catch((error) => {
    res.status(500).json({ error, ship })
  })

  await remove(ref(db, `${playerId}/ships/${id}`)).catch((error) => {
    res.status(500).json({ error, ship })
    return
  })

  res.status(200).json({
    success: true,
    ship,
    totalPrice,
  })
}

export default shipyardSell
