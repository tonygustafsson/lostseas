import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"

const crewDismiss = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const count = parseInt(req.body.count)

  const player = await getPlayer(playerId)

  if (count < 1) {
    res
      .status(500)
      .json({ error: "You need to dismiss at least 1 crew member" })
    return
  }

  if (player.crewMembers.count < count) {
    res.status(500).json({ error: "Not enough crew members to dismiss" })
    return
  }

  const newCount = player.crewMembers.count - count

  const playerResult: Player = {
    ...player,
    crewMembers: {
      ...player.crewMembers,
      count: newCount,
    },
  }

  await savePlayer(playerId, playerResult).catch((error) => {
    res.status(500).json({ error, count, newCount })
  })

  res.status(200).json({ success: true, count, newCount })
}

export default crewDismiss
