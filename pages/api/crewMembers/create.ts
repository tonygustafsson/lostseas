import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"
import createNewCrewMembers from "@/utils/createNewCrewMembers"

const createCrewMember = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)

  const playerId = req.body.playerId
  const crewMember = createNewCrewMembers()

  const existingCrewMembers = await get(child(dbRef, `${playerId}/crewMembers`))
  const result = existingCrewMembers.val()
    ? { ...existingCrewMembers.val(), ...crewMember }
    : crewMember

  await set(ref(db, `${playerId}/crewMembers`), result).catch((error) => {
    res.status(500).json({ error })
  })

  res.status(200).json({ success: true })
}

export default createCrewMember
