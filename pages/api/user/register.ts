import { setCookie } from "cookies-next"
import crypto from "crypto"
import { ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import { LOCATIONS } from "@/constants/locations"
import {
  MUSIC_STATE_COOKIE_NAME,
  PLAYER_ID_COOKIE_NAME,
  SOUND_EFFECTS_STATE_COOKIE_NAME,
} from "@/constants/system"
import db from "@/firebase/db"
import createNewShip from "@/utils/createNewShip"
import { getRandomTown } from "@/utils/townNation"
import { registrationValidationSchema } from "@/utils/validation"

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await registrationValidationSchema.parseAsync(req.body)
  } catch (error) {
    res.status(400).json({ error })
    return
  }

  const { name, nationality, gender, age }: Character = req.body
  const { musicOn, soundEffectsOn } = req.body

  const playerId: Player["id"] = crypto.randomUUID()
  const title: Title = "Pirate"
  const createdDate = new Date().getTime()
  const startingTown = getRandomTown(nationality)

  const ship = createNewShip("Brig", 0)
  const crewMembersCount = 4

  const requestJson: CreatePlayerServerRequest = {
    character: {
      name,
      nationality,
      title,
      gender,
      age,
      town: startingTown,
      location: LOCATIONS.harbor,
      gold: 300,
      day: 0,
    },
    inventory: {
      food: 20,
      water: 40,
      cannons: 2,
    },
    ships: {
      [ship.id]: ship,
    },
    crewMembers: {
      count: crewMembersCount,
      health: 100,
      mood: 100,
    },
    createdDate,
  }

  await set(ref(db, playerId), requestJson).catch((error) => {
    res.status(500).json({ error })
  })

  setCookie(PLAYER_ID_COOKIE_NAME, playerId, { req, res })
  setCookie(MUSIC_STATE_COOKIE_NAME, Boolean(musicOn), { req, res })
  setCookie(SOUND_EFFECTS_STATE_COOKIE_NAME, Boolean(soundEffectsOn), {
    req,
    res,
  })

  res.status(200).json(playerId)
}

export default register
