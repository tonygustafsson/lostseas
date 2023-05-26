import crypto from "crypto"
import { ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = crypto.randomUUID()
  const createdDate = new Date().getTime()

  const requestJson: CreatePlayerServerRequest = {
    user: {
      name: req.body.user_name,
    },
    character: {
      name: req.body.character_name,
      gender: req.body.character_gender,
      age: parseInt(req.body.character_age),
    },
    createdDate,
  }

  await set(ref(db, userId), requestJson)

  res.status(200).json(userId)
}

export default register
