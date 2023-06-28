import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { LOAN_LIMIT } from "@/constants/bank"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getCharacter, saveCharacter } from "@/firebase/db"

const bankLoan = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const { amount } = req.body

  if (amount < 1) {
    res.status(400).json({ error: "You cannot repay less than 1 doubloon." })
    return
  }

  const character = await getCharacter(playerId)

  if ((character.loan || 0) + amount > LOAN_LIMIT) {
    res.status(400).json({
      error: `You cannot loan more than a total of ${LOAN_LIMIT} gold.`,
    })
    return
  }

  const characterResult = {
    ...character,
    gold: character.gold + amount,
    loan: character.loan ? character.loan + amount : amount,
  }

  await saveCharacter(playerId, characterResult).catch((error) => {
    res.status(500).json({ error, amount })
    return
  })

  res.status(200).json({
    success: true,
    amount,
    gold: characterResult.gold,
    loan: characterResult.loan,
  })
}

export default bankLoan
