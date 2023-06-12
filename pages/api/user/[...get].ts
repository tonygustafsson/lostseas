import { NextApiRequest, NextApiResponse } from "next/types"

import { getPlayer } from "@/utils/db/getPlayer"

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = req.url?.split("/")?.[4]
  const player = await getPlayer(playerId)

  if (!player) {
    res.status(404).json({ message: "No user found" })
    return
  }

  res.status(200).json(player)
}

export default getUser
