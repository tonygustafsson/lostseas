import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { TREASURES } from "@/constants/treasures"
import { getPlayer, savePlayer } from "@/firebase/db"

const cityhallHandover = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const { id } = req.body

  const player = await getPlayer(playerId)

  const currentTown = player.character.town
  const treasures = Object.values(player.treasures || {}).filter(
    (treasure) => treasure.rewarder === currentTown
  )
  const matchingTreasure = treasures.find((treasure) => treasure.id === id)
  const treasureInfo = TREASURES.find(
    (treasure) => treasure.name === matchingTreasure?.name
  )

  if (!matchingTreasure) {
    res.status(500).json({
      error: "You don't have this treasure",
    })
    return
  }

  const playerResult: Player = {
    ...player,
    character: {
      ...player.character,
      gold: player.character.gold + (treasureInfo?.value || 0),
    },
    treasures: {
      ...player.treasures,
      [id]: null,
    },
  }

  await savePlayer(playerId, playerResult).catch((error) => {
    res.status(500).json({ error, treasure: matchingTreasure, treasureInfo })
    return
  })

  res.status(200).json({
    success: true,
    treasure: matchingTreasure,
    treasureInfo,
  })
}

export default cityhallHandover
