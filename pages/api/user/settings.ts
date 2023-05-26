import { ref, update } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

const settings = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.body.userId

  const updates = {
    user: {
      name: req.body.user_name,
    },
    character: {
      name: req.body.character_name,
      gender: req.body.character_gender,
      age: parseInt(req.body.character_age),
    },
  } as Record<Player["id"], Partial<Player>>

  await update(ref(db, userId), updates)

  res.status(200).json(userId)
}

export default settings
