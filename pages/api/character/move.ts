import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

const move = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)
  const userId = req.body.userId
  const location = req.body.location

  const existingCharacter = await get(child(dbRef, `${userId}/character`))
  const result = { ...existingCharacter.val(), location }

  await set(ref(db, `${userId}/character`), result)

  res.status(200).json(userId)
}

export default move
