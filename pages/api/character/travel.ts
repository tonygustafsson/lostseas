import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

const travel = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)
  const playerId: Player["id"] = req.body.playerId
  const town: Town = req.body.town
  const location: SeaLocation = "Harbor"

  const characterRef = await get(child(dbRef, `${playerId}/character`))
  const character = characterRef.val()

  if (character.location !== "Sea") {
    res.status(400).json({
      error: `You cannot travel from ${character.location} to ${town}.`,
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

  res.status(200).json({ success: true })
}

export default travel
