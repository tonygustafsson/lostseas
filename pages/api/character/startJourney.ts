import { getCookie } from "cookies-next"
import { randomInt } from "crypto"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getCharacter, saveCharacter } from "@/firebase/db"

const startJourney = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const town: Town = req.body.town
  const character = await getCharacter(playerId)

  if (character.location !== "Sea") {
    res.status(400).json({
      error: `You cannot travel from ${character.location} to ${town}.`,
    })
    return
  }

  const characterResult: Character = {
    ...character,
    journey: {
      destination: town,
      day: 1,
      totalDays: randomInt(3, 9),
    },
  }

  await saveCharacter(playerId, characterResult).catch((error) => {
    res.status(500).json({ error })
    return
  })

  res.status(200).json({ success: true })
}

export default startJourney
