import { child, get, ref } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

/** Sort items on Server instead of in Firebase because it would require
 * a specific request for ships otherwise.
 */
const sortByDate = <T extends Ship | CrewMember>(items?: Record<string, T>) => {
  const itemsArray = Object.values(items || []) as T[]

  if (!itemsArray.length) {
    return
  }

  const result = itemsArray
    .sort((a, b) => a.createdDate - b.createdDate)
    .reduce(
      (acc, curr) => ((acc[curr.id] = curr), acc),
      {} as Record<string, T>
    )

  return result
}

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.url?.split("/")?.[4]

  if (!userId) {
    res.status(404).json({ message: "No user found" })
    return
  }

  const dbRef = ref(db)
  const data = await get(child(dbRef, userId))

  if (!data.exists()) {
    res.status(404).json({ message: "No user found" })
    return
  }

  const result = data.val() as Player

  if (!result) {
    res.status(404).json({ message: "No user found" })
    return
  }

  result.ships = sortByDate<Ship>(result.ships)
  result.crewMembers = sortByDate<CrewMember>(result.crewMembers)

  res.status(200).json(result)
}

export default getUser
