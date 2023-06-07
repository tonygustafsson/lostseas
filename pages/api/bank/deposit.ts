import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

const bankDeposit = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)
  const { userId, amount } = req.body

  const existingCharacterRef = await get(child(dbRef, `${userId}/character`))
  const existingCharacter = existingCharacterRef.val()

  if (existingCharacter.doubloons < amount) {
    res.status(400).json({ error: "Not enough doubloons" })
    return
  }

  const characterResult = {
    ...existingCharacter,
    doubloons: existingCharacter.doubloons - amount,
    account: existingCharacter.account
      ? existingCharacter.account + amount
      : amount,
  }

  await set(ref(db, `${userId}/character`), characterResult).catch((error) => {
    res.status(500).json({ error, amount })
  })

  res.status(200).json({
    success: true,
    amount,
    doubloons: characterResult.doubloons,
  })
}

export default bankDeposit
