import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { SHIP_REPAIR_COST } from "@/constants/ship"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"

const shipyardRepair = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const { id }: { id: Ship["id"] } = req.body

  const player = await getPlayer(playerId)

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

  const playerResult: Player = {
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

  await savePlayer(playerId, playerResult).catch((error) => {
    res.status(500).json({ error, ship, totalPrice })
  })

  res.status(200).json({
    success: true,
    ship,
    totalPrice,
  })
}

export default shipyardRepair
