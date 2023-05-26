import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

const travel = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)
  const userId = req.body.userId
  const town = req.body.town

  const existingCharacter = await get(child(dbRef, `${userId}/character`))
  const result = { ...existingCharacter.val(), town }

  await set(ref(db, `${userId}/character`), result)

  res.status(200).json(userId)
}

export default travel
