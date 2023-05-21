import crypto from "crypto"
import { ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = crypto.randomUUID()

  const requestJson = {
    name: req.body.name,
    characterName: req.body.characterName,
    characterAge: parseInt(req.body.characterAge),
  }

  await set(ref(db, userId), requestJson)

  res.status(200).json(userId)
}

export default register
