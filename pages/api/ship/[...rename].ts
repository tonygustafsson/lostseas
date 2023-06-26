import { getCookie } from "cookies-next"
import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import db, { dbRef } from "@/firebase/db"
import { renameShipValidationSchema } from "@/utils/validation"

const renameShip = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const shipId = req.url?.split("/")?.[4]

  if (!shipId) {
    res.status(500).json({ error: "Ship not found" })
    return
  }

  const { name } = req.body

  try {
    await renameShipValidationSchema.parseAsync({ id: shipId, name })
  } catch (error) {
    res.status(400).json({ error })
    return
  }

  const shipRef = await get(child(dbRef, `${playerId}/ships/${shipId}`))
  const ship = shipRef.val() as Ship

  if (!ship) {
    res.status(500).json({ error: "Ship not found" })
    return
  }

  const result: Ship = {
    ...ship,
    name,
  }

  console.log({ ship, result })

  await set(ref(db, `${playerId}/ships/${shipId}`), result).catch((error) => {
    res.status(500).json({ error, ship, name })
  })

  res.status(200).json({ success: true, name, ship })
}

export default renameShip
