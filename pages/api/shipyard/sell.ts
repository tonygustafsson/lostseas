import { getCookie } from "cookies-next"
import { ref, remove } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import { SHIP_TYPES } from "@/constants/ship"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import db, { getPlayer, savePlayer } from "@/firebase/db"

const shipyardSell = async (req: NextApiRequest, res: NextApiResponse) => {
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

  const shipInfo = SHIP_TYPES[ship.type as keyof typeof SHIP_TYPES]
  const totalPrice = shipInfo.sell

  const playerResult: Player = {
    ...player,
    character: {
      ...player.character,
      gold: player.character.gold + totalPrice,
    },
  }

  await savePlayer(playerId, playerResult).catch((error) => {
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
