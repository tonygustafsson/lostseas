import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"
import { createMoveEvents } from "@/utils/createMoveEvents"

const move = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)
  const playerId = req.body.playerId as Player["id"]
  const destination = req.body.location as Character["location"]

  const existingCharacterRef = await get(child(dbRef, `${playerId}/character`))
  const character = existingCharacterRef.val()

  const currentLocation = character.location as SeaLocation | TownLocation

  if (currentLocation === destination) {
    return
  }

  if (currentLocation === "Sea") {
    // Use travel function instead
    res.status(400).json({
      error: `You cannot move from ${currentLocation} to ${destination}.`,
    })
    return
  }

  if (destination === "Docks" && currentLocation !== "Harbor") {
    res.status(400).json({
      error: `You cannot move from ${currentLocation} to ${destination}.`,
    })
    return
  }

  const result = { ...character, location: destination }

  await set(ref(db, `${playerId}/character`), result).catch((error) => {
    res.status(500).json({ error })
  })

  await createMoveEvents({ playerId, destination })

  res.status(200).json({ success: true })
}

export default move
