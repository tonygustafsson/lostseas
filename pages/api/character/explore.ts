import { getCookie } from "cookies-next"
import { ref, remove } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import db, { getCharacter, saveCharacter } from "@/firebase/db"

const explore = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const town = null
  const location: SeaLocation = "Sea"

  const character = await getCharacter(playerId)

  if (character.location !== "Harbor" && character.location !== "Sea") {
    res.status(400).json({
      error: `You cannot explore from ${character.location}.`,
    })
    return
  }

  const characterResult: Nullable<Character> = {
    ...character,
    town,
    location,
    week: character.week + 1,
  }

  await saveCharacter(playerId, characterResult).catch((error) => {
    res.status(500).json({ error })
    return
  })

  // Reset location states
  await remove(ref(db, `${playerId}/locationStates`)).catch((error) => {
    res.status(500).json({ error })
    return
  })

  res.status(200).json({ success: true })
}

export default explore
