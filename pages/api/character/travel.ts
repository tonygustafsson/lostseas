import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

const travel = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)
  const userId: Player["id"] = req.body.userId
  const town: Town = req.body.town
  const location: SeaLocation = "Harbor"

  const existingCharacter = await get(child(dbRef, `${userId}/character`))
  const result = { ...existingCharacter.val(), town, location }

  await set(ref(db, `${userId}/character`), result).catch((error) => {
    res.status(500).json({ error })
  })

  res.status(200).json({ success: true })
}

export default travel
