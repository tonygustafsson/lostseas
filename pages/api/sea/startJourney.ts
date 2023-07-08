import { getCookie } from "cookies-next"
import { randomInt } from "crypto"
import { NextApiRequest, NextApiResponse } from "next/types"

import { TOWN_INFO } from "@/constants/locations"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getCharacter, saveCharacter } from "@/firebase/db"

const seaStartJourney = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const town: Town = req.body.town
  const character = await getCharacter(playerId)

  if (character.journey) {
    res.status(500).json({ error: "Character is already on a journey" })
    return
  }

  const currentTownInfo = character.town && TOWN_INFO[character.town]

  const distance = currentTownInfo?.distanceTo?.[town]
    ? currentTownInfo.distanceTo?.[town]
    : randomInt(3, 9)

  const characterResult: Nullable<Character> = {
    ...character,
    town: null,
    location: "Sea",
    journey: {
      destination: town,
      day: 1,
      totalDays: distance,
    },
  }

  await saveCharacter(playerId, characterResult).catch((error) => {
    res.status(500).json({ error })
    return
  })

  res.status(200).json({ success: true })
}

export default seaStartJourney
