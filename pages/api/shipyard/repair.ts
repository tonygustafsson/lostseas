import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import { SHIP_REPAIR_COST } from "@/constants/ship"
import db from "@/firebase/db"

const shipyardRepair = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)

  const { playerId, id }: { playerId: Player["id"]; id: Ship["id"] } = req.body

  const playerRef = await get(child(dbRef, playerId))
  const player = playerRef.val() as Player

  const ship = (player.ships || {})[id]

  if (!ship) {
    res.status(400).json({ error: "Not a valid item" })
    return
  }

  const totalPrice = (100 - ship.health) * SHIP_REPAIR_COST

  if (player.character.gold < totalPrice) {
    res.status(400).json({ error: "Not enough gold." })
    return
  }

  const result: Player = {
    ...player,
    character: {
      ...player.character,
      gold: player.character.gold - totalPrice,
    },
    ships: {
      ...player.ships,
      [id]: {
        ...ship,
        health: 100,
      },
    },
  }

  await set(ref(db, playerId), result).catch((error) => {
    res.status(500).json({ error, ship, totalPrice })
  })

  res.status(200).json({
    success: true,
    ship,
    totalPrice,
  })
}

export default shipyardRepair
