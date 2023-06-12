import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

const createCrewMember = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)

  const playerId = req.body.playerId

  const existingCrewMembers = await get(child(dbRef, `${playerId}/crewMembers`))
  const result = existingCrewMembers.val()
    ? {
        ...existingCrewMembers.val(),
        count: existingCrewMembers.val().count + 1,
      }
    : 1

  await set(ref(db, `${playerId}/crewMembers`), result).catch((error) => {
    res.status(500).json({ error })
  })

  res.status(200).json({ success: true })
}

export default createCrewMember
