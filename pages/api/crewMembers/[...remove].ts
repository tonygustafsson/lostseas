import { ref, remove } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

const removeCrewMember = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = req.url?.split("/")?.[4]
  const crewMemberId = req.url?.split("/")?.[5]

  await remove(ref(db, `${playerId}/crewMembers/${crewMemberId}`)).catch(
    (error) => {
      res.status(500).json({ error })
    }
  )

  res.status(200).json({ success: true })
}

export default removeCrewMember
