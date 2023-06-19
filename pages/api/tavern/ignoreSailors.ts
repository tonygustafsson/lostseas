import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

const tavernIgnoreSailors = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const dbRef = ref(db)
  const { playerId } = req.body

  const playerRef = await get(child(dbRef, playerId))
  const player = playerRef.val() as Player

  const numberOfSailors = player?.locationStates?.tavern?.noOfSailors || 0

  if (!numberOfSailors) {
    res.status(500).json({ error: "No sailors to ignore" })
    return
  }

  const result = {
    ...player,
    locationStates: {
      ...player.locationStates,
      tavern: {
        ...player.locationStates?.tavern,
        noOfSailors: 0,
      },
    },
  } as Player

  await set(ref(db, playerId), result).catch((error) => {
    res.status(500).json({ error, numberOfSailors })
  })

  res.status(200).json({
    success: true,
    numberOfSailors,
  })
}

export default tavernIgnoreSailors
