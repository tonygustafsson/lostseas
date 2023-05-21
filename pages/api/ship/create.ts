import crypto from "crypto"
import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

const createShip = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)

  const shipId = crypto.randomUUID()
  const userId = req.body.userId

  const requestJson = {
    id: shipId,
    name: req.body.name,
    type: req.body.type,
  }

  const existingShips = await get(child(dbRef, `${userId}/ships`))
  const result = existingShips.val()
    ? { ...existingShips.val(), [shipId]: requestJson }
    : { [shipId]: requestJson }

  await set(ref(db, `${userId}/ships`), result)

  res.status(200).json(userId)
}

export default createShip
