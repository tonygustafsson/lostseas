import crypto from "crypto"
import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"
import getEnglishFemaleName from "@/utils/getEnglishFemaleName"
import getEnglishMaleName from "@/utils/getEnglishMaleName"
import getEnglishSurname from "@/utils/getEnglishSurname"

const createCrewMember = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)

  const userId = req.body.userId

  const crewMemberId = crypto.randomUUID()
  const createdDate = new Date().getTime()
  const gender = Math.random() > 0.25 ? "Male" : "Female"
  const name = `${
    gender === "Male" ? getEnglishMaleName() : getEnglishFemaleName()
  } ${getEnglishSurname()}`
  const age = Math.floor(Math.random() * (70 - 14 + 1) + 14)

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
