import { ref, remove } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

const removeShip = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.url?.split("/")?.[4]
  const shipId = req.url?.split("/")?.[5]

  await remove(ref(db, `${userId}/ships/${shipId}`)).catch((error) => {
    res.status(500).json({ error })
  })

  res.status(200).json({ success: true })
}

export default removeShip
