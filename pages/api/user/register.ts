import crypto from "crypto"
import { ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import { LOCATIONS } from "@/constants/locations"
import { TOWNS } from "@/constants/locations"
import db from "@/firebase/db"
import createNewCrewMembers from "@/utils/createNewCrewMembers"
import createNewShips from "@/utils/createNewShips"

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = crypto.randomUUID()
  const createdDate = new Date().getTime()
  const startingTown = TOWNS[Math.floor(Math.random() * TOWNS.length)]

  const ships = createNewShips(1, "Sloop")
  const crewMembers = createNewCrewMembers(4)

  const requestJson: CreatePlayerServerRequest = {
    character: {
      name: req.body.character_name,
      gender: req.body.character_gender,
      age: parseInt(req.body.character_age),
      town: startingTown,
      location: LOCATIONS.harbor,
    },
    inventory: {
      doubloons: 300,
      food: 20,
      water: 40,
    },
    ships,
    crewMembers,
    createdDate,
  }

  await set(ref(db, userId), requestJson).catch((error) => {
    res.status(500).json({ error })
  })

  res.status(200).json(userId)
}

export default register
