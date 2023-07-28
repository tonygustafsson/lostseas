import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { getNecessitiesInfo } from "@/utils/shop"

const shopBuyNecessities = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { days } = req.body

  if (!days) {
    res.status(500).json({ error: "Not a valid number of days" })
    return
  }

  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const player = await getPlayer(playerId)

  const { cost, foodNeeded, waterNeeded } = getNecessitiesInfo({
    crewMembers: player?.crewMembers.count || 0,
    currentFood: player?.inventory?.food || 0,
    currentWater: player?.inventory?.water || 0,
    days,
  })

  if (player.character.gold < cost) {
    res.status(500).json({ error: "Not enough gold" })
    return
  }

  const playerResult = {
    ...player,
    inventory: {
      ...player.inventory,
      food: (player.inventory?.food || 0) + foodNeeded,
      water: (player.inventory?.water || 0) + waterNeeded,
    },
    character: {
      ...player.character,
      gold: player.character.gold - cost,
    },
  } as Player

  await savePlayer(playerId, playerResult).catch((error) => {
    res.status(500).json({ error, cost, foodNeeded, waterNeeded })
    return
  })

  res.status(200).json({
    success: true,
    cost,
    foodNeeded,
    waterNeeded,
  })
}

export default shopBuyNecessities
