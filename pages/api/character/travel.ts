import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getCharacter, saveCharacter } from "@/firebase/db"

const travel = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const town: Town = req.body.town
  const location: SeaLocation = "Harbor"

  const character = await getCharacter(playerId)

  if (character.location !== "Sea") {
    res.status(400).json({
      error: `You cannot travel from ${character.location} to ${town}.`,
    })
    return
  }

  const characterResult = {
    ...character,
    town,
    location,
    week: character.week + 1,
  }

  await saveCharacter(playerId, characterResult).catch((error) => {
    res.status(500).json({ error })
    return
  })

  res.status(200).json({ success: true })
}

export default travel
