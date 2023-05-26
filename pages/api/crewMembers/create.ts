import crypto from "crypto"
import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

const createCrewMember = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)

  const crewMemberId = crypto.randomUUID()
  const createdDate = new Date().getTime()
  const userId = req.body.userId
  const name = "Sigfrid"
  const gender = "male"
  const age = 32

  const requestJson: CreateCrewMemberServerRequest = {
    id: crewMemberId,
    name,
    gender,
    age,
    createdDate,
  }

  const existingCrewMembers = await get(child(dbRef, `${userId}/crewMembers`))
  const result = existingCrewMembers.val()
    ? { ...existingCrewMembers.val(), [crewMemberId]: requestJson }
    : { [crewMemberId]: requestJson }

  await set(ref(db, `${userId}/crewMembers`), result)

  res.status(200).json(userId)
}

export default createCrewMember
