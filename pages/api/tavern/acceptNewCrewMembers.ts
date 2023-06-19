import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

const tavernAcceptNewCrewMembers = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const dbRef = ref(db)
  const { playerId } = req.body

  const playerRef = await get(child(dbRef, playerId))
  const player = playerRef.val() as Player

  const numberOfSailors = player?.locationStates?.tavern?.noOfSailors || 0
  const isHostile = player?.locationStates?.tavern?.isHostile || false

  if (!numberOfSailors || isHostile) {
    res.status(500).json({ error: "No sailors to accept" })
    return
  }

  const result = {
    ...player,
    crewMembers: {
      ...player.crewMembers,
      count: player.crewMembers.count + numberOfSailors,
    },
    locationStates: {
      ...player.locationStates,
      tavern: {
        ...player.locationStates?.tavern,
        noOfSailors: 0,
      },
    },
  } as Player

  await set(ref(db, playerId), result).catch((error) => {
    res.status(500).json({ error, numberOfSailors, isHostile })
  })

  res.status(200).json({
    success: true,
    numberOfSailors,
    isHostile,
  })
}

export default tavernAcceptNewCrewMembers
