import { child, get, ref } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

/** Sort ships on Server instead of in Firebase because it would require
 * a specific request for ships otherwise.
 */
const sortShipsByDate = (ships?: Record<string, Ship>) => {
  const shipArray = Object.values(ships || []) as Ship[]

  if (!shipArray.length) {
    return
  }

  return shipArray
    .sort((a: Ship, b: Ship) => a.createdDate - b.createdDate)
    .reduce(
      (acc, curr) => ((acc[curr.id] = curr), acc),
      {} as Record<string, Ship>
    )
}

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.url?.split("/")?.[4]

  if (!userId) {
    res.status(404).json({ message: "No user found" })
    return
  }

  const dbRef = ref(db)
  const data = await get(child(dbRef, userId))

  const result = data.val() as User

  if (!result) {
    res.status(404).json({ message: "No user found" })
    return
  }

  result.ships = sortShipsByDate(result.ships)

  res.status(200).json(result)
}

export default getUser
