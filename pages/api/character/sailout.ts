import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

const sailout = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)
  const userId: Player["id"] = req.body.userId
  const location: SeaLocation = "Sea"

  const existingCharacter = await get(child(dbRef, `${userId}/character`))
  const result = { ...existingCharacter.val(), location, town: null }

  await set(ref(db, `${userId}/character`), result).catch((error) => {
    res.status(500).json({ error })
  })

  res.status(200).json({ success: true })
}

export default sailout
