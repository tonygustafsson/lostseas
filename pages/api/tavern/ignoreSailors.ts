import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"

const tavernIgnoreSailors = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const player = await getPlayer(playerId)

  const numberOfSailors = player?.locationStates?.tavern?.noOfSailors || 0

  if (!numberOfSailors) {
    res.status(500).json({ error: "No sailors to ignore" })
    return
  }

  const playerResult = {
    ...player,
    locationStates: {
      ...player.locationStates,
      tavern: {
        ...player.locationStates?.tavern,
        noOfSailors: 0,
      },
    },
  } as Player

  await savePlayer(playerId, playerResult).catch((error) => {
    res.status(500).json({ error, numberOfSailors })
  })

  res.status(200).json({
    success: true,
    numberOfSailors,
  })
}

export default tavernIgnoreSailors
