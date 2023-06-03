import crypto from "crypto"
import { ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import { LOCATIONS, NATIONS } from "@/constants/locations"
import db from "@/firebase/db"
import createNewCrewMembers from "@/utils/createNewCrewMembers"
import createNewShips from "@/utils/createNewShips"
import { getRandomTown } from "@/utils/townNation"

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, nationality, gender, age } = req.body

  if (name?.length < 3) {
    res.status(400).json({ error: "Name must be at least 3 characters long" })
    return
  }

  if (!NATIONS.includes(nationality)) {
    res.status(400).json({ error: "Not a valid nation" })
    return
  }

  if (!["Male", "Female"].includes(gender)) {
    res.status(400).json({ error: "Not a valid gender" })
    return
  }

  if (age < 14 || age > 70) {
    res.status(400).json({ error: "Not a valid age" })
    return
  }

  const userId = crypto.randomUUID()
  const createdDate = new Date().getTime()
  const startingTown = getRandomTown(nationality)

  const ships = createNewShips(1, "Sloop")
  const crewMembers = createNewCrewMembers(4)

  const requestJson: CreatePlayerServerRequest = {
    character: {
      name,
      nationality,
      gender,
      age: parseInt(age),
      town: startingTown,
      location: LOCATIONS.harbor,
      doubloons: 300,
    },
    inventory: {
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
