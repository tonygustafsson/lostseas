import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

const explore = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)
  const playerId: Player["id"] = req.body.playerId
  const town = null
  const location: SeaLocation = "Sea"

  const existingCharacterRef = await get(child(dbRef, `${playerId}/character`))
  const existingCharacter = existingCharacterRef.val()
  const result = {
    ...existingCharacter,
    town,
    location,
    week: existingCharacter.week + 1,
  }

  await set(ref(db, `${playerId}/character`), result).catch((error) => {
    res.status(500).json({ error })
  })

  res.status(200).json({ success: true })
}

export default explore
