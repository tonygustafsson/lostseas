import { ref, update } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

const settings = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.body.userId

  const updates = {
    name: req.body.name,
    characterName: req.body.characterName,
    characterAge: parseInt(req.body.characterAge),
  } as Record<User["id"], Partial<User>>
  await update(ref(db, userId), updates)

  res.status(200).json(userId)
}

export default settings
