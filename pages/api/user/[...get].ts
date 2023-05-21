import { child, get, ref } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.url?.split("/")?.[4]

  if (!userId) {
    res.status(404).json({ message: "No user found" })
    return
  }

  const dbRef = ref(db)
  const data = await get(child(dbRef, userId))

  const result = data.val()

  if (!result) {
    res.status(404).json({ message: "No user found" })
    return
  }

  res.status(200).json(result)
}

export default getUser
