import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { SHIP_TYPES } from "@/constants/ship"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { TITLE_INFO } from "@/constants/title"
import { getPlayer, savePlayer } from "@/firebase/db"
import { createNewShip } from "@/utils/ship"

const shipyardBuyShip = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const { item } = req.body

  if (!item || !Object.keys(SHIP_TYPES).includes(item || "")) {
    res.status(400).json({ error: "Not a valid item" })
    return
  }

  const shipItem = item as keyof typeof SHIP_TYPES
  const ship = SHIP_TYPES[shipItem]

  const totalPrice = ship.buy

  const player = await getPlayer(playerId)

  if (player.character.gold < totalPrice) {
    res.status(500).json({ error: "Not enough gold", item })
    return
  }

  const titleInfo = TITLE_INFO[player.character.title]

  if (Object.keys(player.ships).length + 1 > titleInfo.maxShips) {
    res.status(500).json({ error: "Max ships reached due to title", item })
    return
  }

  const newShip = createNewShip(shipItem as Ship["type"], player.character.day)

  const playerResult: Player = {
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

  await savePlayer(playerId, playerResult).catch((error) => {
    res.status(500).json({ error, item })
  })

  res.status(200).json({
    success: true,
    item,
    totalPrice,
  })
}

export default shipyardBuyShip
