import { setCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { loginValidationSchema } from "@/utils/validation"

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await loginValidationSchema.parseAsync(req.body)
  } catch (error) {
    res.status(400).json({ error })
    return
  }

  // TODO: Check if user exists

  const { playerId }: { playerId: Player["id"] } = req.body

  setCookie(PLAYER_ID_COOKIE_NAME, playerId, { req, res })

  res.status(200).json({ success: true })
}

export default login
