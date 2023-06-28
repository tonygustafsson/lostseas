import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getCharacter, saveCharacter } from "@/firebase/db"
import { changeCharacterValidationSchema } from "@/utils/validation"

const updateCharacter = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await changeCharacterValidationSchema.parseAsync(req.body)
  } catch (error) {
    res.status(400).json({ error })
    return
  }

  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const { name, gender, age } = req.body

  const character = await getCharacter(playerId)

  const characterResult = {
    ...character,
    name,
    gender,
    age,
  }

  await saveCharacter(playerId, characterResult).catch((error) => {
    res.status(500).json({ error })
    return
  })

  res.status(200).json({ success: true })
}

export default updateCharacter
