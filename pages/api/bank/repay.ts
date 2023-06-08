import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

const bankRepay = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)
  const { userId, amount } = req.body

  if (amount < 1) {
    res.status(400).json({ error: "You cannot repay less than 1 doubloon." })
    return
  }

  const existingCharacterRef = await get(child(dbRef, `${userId}/character`))
  const existingCharacter = existingCharacterRef.val()

  if (existingCharacter.loan < amount) {
    res
      .status(400)
      .json({ error: "You cannot repay more than you owe the bank." })
    return
  }

  const characterResult = {
    ...existingCharacter,
    doubloons: existingCharacter.doubloons - amount,
    loan:
      existingCharacter.loan - amount === 0
        ? null
        : existingCharacter.loan - amount,
  }

  await set(ref(db, `${userId}/character`), characterResult).catch((error) => {
    res.status(500).json({ error, amount })
  })

  res.status(200).json({
    success: true,
    amount,
    doubloons: characterResult.doubloons,
    loan: characterResult.loan,
  })
}

export default bankRepay
