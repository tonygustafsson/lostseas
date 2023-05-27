import { child, get, ref, update } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

const settings = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)
  const userId = req.body.userId

  const existingUser = await get(child(dbRef, `${userId}/user`))
  const userUpdate = {
    ...existingUser.val(),
    name: req.body.user_name,
  }

  await update(ref(db, `${userId}/user`), userUpdate)

  const existingCharacter = await get(child(dbRef, `${userId}/character`))
  const characterUpdate = {
    ...existingCharacter.val(),
    name: req.body.character_name,
    gender: req.body.character_gender,
    age: parseInt(req.body.character_age),
  }

  await update(ref(db, `${userId}/character`), characterUpdate).catch(
    (error) => {
      res.status(500).json({ error })
    }
  )

  res.status(200).json({ success: true })
}

export default settings
