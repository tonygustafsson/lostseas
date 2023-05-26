import { child, get, ref } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

/** Sort items on Server instead of in Firebase because it would require
 * a specific request for ships otherwise.
 */
const sortByDate = (ships?: Record<string, Ship | CrewMember>) => {
  const shipArray = Object.values(ships || []) as Ship[] | CrewMember[]

  if (!shipArray.length) {
    return
  }

  return shipArray
    .sort(
      (a: Ship | CrewMember, b: Ship | CrewMember) =>
        a.createdDate - b.createdDate
    )
    .reduce(
      (acc, curr) => ((acc[curr.id] = curr), acc),
      {} as Record<string, Ship | CrewMember>
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

  const result = data.val() as Player

  if (!result) {
    res.status(404).json({ message: "No user found" })
    return
  }

  result.ships = sortByDate(result.ships) as Record<string, Ship>
  result.crewMembers = sortByDate(result.crewMembers) as Record<
    string,
    CrewMember
  >

  res.status(200).json(result)
}

export default getUser
