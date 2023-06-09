import { child, get, ref, update } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

const updateCharacter = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)
  const { userId, name, gender, age } = req.body

  const existingCharacter = await get(child(dbRef, `${userId}/character`))
  const characterUpdate = {
    ...existingCharacter.val(),
    name,
    gender,
    age,
  }

  await update(ref(db, `${userId}/character`), characterUpdate).catch(
    (error) => {
      res.status(500).json({ error })
    }
  )

  res.status(200).json({ success: true })
}

export default updateCharacter
