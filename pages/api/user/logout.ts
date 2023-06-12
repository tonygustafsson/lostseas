import { deleteCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  deleteCookie(PLAYER_ID_COOKIE_NAME, { req, res })

  res.status(200).json({ success: true })
}

export default logout
