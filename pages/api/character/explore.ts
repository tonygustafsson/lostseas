import { getCookie } from "cookies-next"
import { child, get, ref, remove, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import db, { dbRef } from "@/firebase/db"

const explore = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const town = null
  const location: SeaLocation = "Sea"

  const characterRef = await get(child(dbRef, `${playerId}/character`))
  const character = characterRef.val()

  if (character.location !== "Harbor" && character.location !== "Sea") {
    res.status(400).json({
      error: `You cannot explore from ${character.location}.`,
    })
    return
  }

  const result = {
    ...character,
    town,
    location,
    week: character.week + 1,
  }

  await set(ref(db, `${playerId}/character`), result).catch((error) => {
    res.status(500).json({ error })
  })

  // Reset location states
  await remove(ref(db, `${playerId}/locationStates`)).catch((error) => {
    res.status(500).json({ error })
    return
  })

  res.status(200).json({ success: true })
}

export default explore
