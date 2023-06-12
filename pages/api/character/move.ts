import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

const move = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)
  const playerId = req.body.playerId as Player["id"]
  const destination = req.body.location as Character["location"]

  const existingCharacter = await get(child(dbRef, `${playerId}/character`))
  const result = { ...existingCharacter.val(), location: destination }

  await set(ref(db, `${playerId}/character`), result).catch((error) => {
    res.status(500).json({ error })
  })

  if (destination === "Market") {
    // TODO: Do this in server side props instead

    const existingEvent = await get(
      child(dbRef, `${playerId}/locationEvent/market`)
    )

    if (!existingEvent.exists()) {
      const newEvent: LocationState["market"] = {
        items: {
          food: 12,
        },
      }

      const eventResult = { ...existingEvent.val(), ...newEvent }

      await set(ref(db, `${playerId}/locationEvent/market`), eventResult).catch(
        (error) => {
          res.status(500).json({ error })
        }
      )
    }
  }

  res.status(200).json({ success: true })
}

export default move
