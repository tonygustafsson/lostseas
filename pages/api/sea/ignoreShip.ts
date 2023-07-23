import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, saveLocationState } from "@/firebase/db"

const seaIgnoreShip = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const player = await getPlayer(playerId)

  if (!player.locationStates?.sea?.shipMeeting) {
    res.status(500).json({
      error: "You are not currently meeting a ship",
    })
    return
  }

  const locationStateResult: Nullable<LocationStates["sea"]> = {
    ...player.locationStates.sea,
    shipMeeting: null,
  }

  await saveLocationState(playerId, "sea", locationStateResult).catch(
    (error) => {
      res.status(500).json({ error })
      return
    }
  )

  res.status(200).json({
    success: true,
  })
}

export default seaIgnoreShip
