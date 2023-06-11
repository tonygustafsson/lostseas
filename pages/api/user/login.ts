import { setCookie } from "cookies-next"
import { child, get, ref } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import db from "@/firebase/db"
import { loginValidationSchema } from "@/utils/validation"

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await loginValidationSchema.parseAsync(req.body)
  } catch (error) {
    res.status(400).json({ error })
    return
  }

  const { playerId }: { playerId: Player["id"] } = req.body

  const dbRef = ref(db)
  const data = await get(child(dbRef, playerId))

  if (!data.exists()) {
    res.status(404).json({ message: "No user found" })
    return
  }

  setCookie(PLAYER_ID_COOKIE_NAME, playerId, { req, res })

  res.status(200).json({ success: true })
}

export default login
