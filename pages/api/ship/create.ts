import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"
import createNewShips from "@/utils/createNewShips"

const createShip = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)
  const userId = req.body.userId
  const ship = createNewShips(1, req.body.type)

  const existingShips = await get(child(dbRef, `${userId}/ships`))
  const result = existingShips.val()
    ? { ...existingShips.val(), ...ship }
    : ship

  await set(ref(db, `${userId}/ships`), result).catch((error) => {
    res.status(500).json({ error })
  })

  res.status(200).json({ success: true })
}

export default createShip
