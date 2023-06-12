import { child, get, ref, update } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"
import { changeCharacterValidationSchema } from "@/utils/validation"

const updateCharacter = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await changeCharacterValidationSchema.parseAsync(req.body)
  } catch (error) {
    res.status(400).json({ error })
    return
  }

  const dbRef = ref(db)
  const { playerId, name, gender, age } = req.body

  const existingCharacter = await get(child(dbRef, `${playerId}/character`))
  const characterUpdate = {
    ...existingCharacter.val(),
    name,
    gender,
    age,
  }

  await update(ref(db, `${playerId}/character`), characterUpdate).catch(
    (error) => {
      res.status(500).json({ error })
    }
  )

  res.status(200).json({ success: true })
}

export default updateCharacter
