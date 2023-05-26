import { ref, remove } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

const removeCrewMember = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.url?.split("/")?.[4]
  const crewMemberId = req.url?.split("/")?.[5]

  await remove(ref(db, `${userId}/crewMembers/${crewMemberId}`))

  res.status(200).json(crewMemberId)
}

export default removeCrewMember
