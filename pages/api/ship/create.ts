import crypto from "crypto"
import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"
import getShipName from "@/utils/getShipName"

const createShip = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)

  const shipId = crypto.randomUUID()
  const createdDate = new Date().getTime()
  const shipName = getShipName()
  const userId = req.body.userId

  const requestJson: CreateShipServerRequest = {
    id: shipId,
    name: shipName,
    type: req.body.type,
    createdDate,
  }

  const existingShips = await get(child(dbRef, `${userId}/ships`))
  const result = existingShips.val()
    ? { ...existingShips.val(), [shipId]: requestJson }
    : { [shipId]: requestJson }

  await set(ref(db, `${userId}/ships`), result)

  res.status(200).json({ success: true })
}

export default createShip
