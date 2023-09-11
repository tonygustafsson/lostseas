import { setCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer } from "@/utils/db/getPlayer"
import { loginValidationSchema } from "@/utils/validation"

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await loginValidationSchema.parseAsync(req.body)
  } catch (error) {
    res.status(400).json({ error })
    return
  }

  const { playerId }: { playerId: Player["id"] } = req.body
  const player = await getPlayer(playerId)

  if (!player) {
    res.status(404).json({ message: "No user found" })
    return
  }

  setCookie(PLAYER_ID_COOKIE_NAME, playerId, {
    req,
    res,
    expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000), // A  year from now
  })

  res.status(200).json({ success: true })
}

export default login
