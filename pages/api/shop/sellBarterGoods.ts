import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { getBarterGoodsValue } from "@/utils/shop"

const shopSellBarterGoods = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const player = await getPlayer(playerId)

  const value = getBarterGoodsValue(player.inventory)

  const playerResult = {
    ...player,
    inventory: {
      ...player.inventory,
      porcelain: 0,
      spices: 0,
      tobacco: 0,
      rum: 0,
    },
    character: {
      ...player.character,
      gold: player.character.gold + value,
    },
  } as Player

  await savePlayer(playerId, playerResult).catch((error) => {
    res.status(500).json({ error, value })
    return
  })

  res.status(200).json({
    success: true,
    value,
  })
}

export default shopSellBarterGoods
