import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { MERCHANDISE } from "@/constants/merchandise"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"

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

  let moneyBack = 0

  const barterGoods = ["porcelain", "spices", "tobacco", "rum"]

  Object.entries(player.inventory || {}).forEach(([item, quantity]) => {
    if (barterGoods.includes(item)) {
      return
    }

    moneyBack += MERCHANDISE[item as keyof typeof MERCHANDISE].sell * quantity
  })

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
      gold: player.character.gold + moneyBack,
    },
  } as Player

  await savePlayer(playerId, playerResult).catch((error) => {
    res.status(500).json({ error, moneyBack })
    return
  })

  res.status(200).json({
    success: true,
    moneyBack,
  })
}

export default shopSellBarterGoods
