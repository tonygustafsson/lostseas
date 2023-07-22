import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { LOCATIONS } from "@/constants/locations"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { createMoveEvents } from "@/utils/createMoveEvents"

const move = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const destination = req.body.location as Character["location"]

  if (
    !Object.values(LOCATIONS)
      .filter((location) => !["Sea", "Harbor"].includes(location))
      .includes(destination)
  ) {
    res.status(400).json({ error: "Invalid location" })
    return
  }

  const player = await getPlayer(playerId)

  const currentLocation = player.character.location as TownLocation

  if (currentLocation === destination) {
    return
  }

  const playerResult: Player = {
    ...player,
    character: {
      ...player.character,
      location: destination,
    },
  }

  await savePlayer(playerId, playerResult).catch((error) => {
    res.status(500).json({ error })
  })

  await createMoveEvents({ playerId, destination })

  res.status(200).json({ success: true })
}

export default move
