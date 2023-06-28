import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { getMedicineEffectiveness } from "@/utils/crew"

const giveMedicine = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const medicine = parseInt(req.body.medicine)

  const player = await getPlayer(playerId)

  if (medicine < 1) {
    res
      .status(500)
      .json({ error: "You need to give at least 1 box of medicine" })
    return
  }

  if ((player.inventory.medicine || 0) < medicine) {
    res.status(500).json({ error: "Not enough medicine" })
    return
  }

  const newHealth = getMedicineEffectiveness(
    player.crewMembers.count,
    player.crewMembers.health,
    medicine
  )

  const playerResult: Player = {
    ...player,
    inventory: {
      ...player.inventory,
      medicine: (player.inventory.medicine || 0) - medicine,
    },
    crewMembers: {
      ...player.crewMembers,
      health: newHealth,
    },
  }

  await savePlayer(playerId, playerResult).catch((error) => {
    res.status(500).json({ error, medicine, newHealth })
  })

  res.status(200).json({ success: true, medicine, newHealth })
}

export default giveMedicine
