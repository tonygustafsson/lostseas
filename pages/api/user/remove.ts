import { deleteCookie, getCookie } from "cookies-next"
import { ref, remove } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import db from "@/firebase/db"

const userRemove = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  await remove(ref(db, playerId)).catch((error) => {
    res.status(500).json({ error })
  })

  deleteCookie(PLAYER_ID_COOKIE_NAME, { req, res })

  res.status(200).json({ success: true })
}

export default userRemove
