import { getCookie } from "cookies-next"
import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import db from "@/firebase/db"
import { getMedicineEffectiveness } from "@/utils/crew"

const giveMedicine = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const dbRef = ref(db)
  const medicine = parseInt(req.body.medicine)

  const existingPlayerRef = await get(child(dbRef, playerId))
  const existingPlayer = existingPlayerRef.val() as Player

  if (medicine < 1) {
    res
      .status(500)
      .json({ error: "You need to give at least 1 box of medicine" })
    return
  }

  if ((existingPlayer.inventory.medicine || 0) < medicine) {
    res.status(500).json({ error: "Not enough medicine" })
    return
  }

  const newHealth = getMedicineEffectiveness(
    existingPlayer.crewMembers.count,
    existingPlayer.crewMembers.health,
    medicine
  )

  const result: Player = {
    ...existingPlayer,
    inventory: {
      ...existingPlayer.inventory,
      medicine: (existingPlayer.inventory.medicine || 0) - medicine,
    },
    crewMembers: {
      ...existingPlayer.crewMembers,
      health: newHealth,
    },
  }

  await set(ref(db, playerId), result).catch((error) => {
    res.status(500).json({ error, medicine, newHealth })
  })

  res.status(200).json({ success: true, medicine, newHealth })
}

export default giveMedicine
