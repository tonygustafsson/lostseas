import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

const bankWithdraw = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)
  const { userId, amount } = req.body

  if (amount < 1) {
    res.status(400).json({ error: "You cannot repay less than 1 doubloon." })
    return
  }

  const existingCharacterRef = await get(child(dbRef, `${userId}/character`))
  const existingCharacter = existingCharacterRef.val()

  if (existingCharacter.account < amount) {
    res.status(400).json({ error: "Not enough doubloons in bank account" })
    return
  }

  const characterResult = {
    ...existingCharacter,
    doubloons: existingCharacter.doubloons + amount,
    account:
      existingCharacter.account - amount === 0
        ? null
        : existingCharacter.account - amount,
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

export default bankWithdraw
