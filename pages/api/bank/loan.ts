import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import { LOAN_LIMIT } from "@/constants/bank"
import db from "@/firebase/db"

const bankLoan = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)
  const { userId, amount } = req.body

  if (amount < 1) {
    res.status(400).json({ error: "You cannot repay less than 1 doubloon." })
    return
  }

  const existingCharacterRef = await get(child(dbRef, `${userId}/character`))
  const existingCharacter = existingCharacterRef.val()

  if ((existingCharacter.loan || 0) + amount > LOAN_LIMIT) {
    res.status(400).json({
      error: `You cannot loan more than a total of ${LOAN_LIMIT} dbl.`,
    })
    return
  }

  const characterResult = {
    ...existingCharacter,
    doubloons: existingCharacter.doubloons + amount,
    loan: existingCharacter.loan ? existingCharacter.loan + amount : amount,
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

export default bankLoan
