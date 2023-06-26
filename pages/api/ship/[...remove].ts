import { getCookie } from "cookies-next"
import { ref, remove } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import db from "@/firebase/db"

const removeShip = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const shipId = req.url?.split("/")?.[4]

  await remove(ref(db, `${playerId}/ships/${shipId}`)).catch((error) => {
    res.status(500).json({ error })
  })

  res.status(200).json({ success: true })
}

export default removeShip
