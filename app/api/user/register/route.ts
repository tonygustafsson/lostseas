import crypto from "crypto"
import { NextResponse } from "next/server"

import { LOCATIONS } from "@/constants/locations"
import {
  COOKIE_EXPIRE_TIME,
  MUSIC_STATE_COOKIE_NAME,
  PLAYER_ID_COOKIE_NAME,
  SOUND_EFFECTS_STATE_COOKIE_NAME,
} from "@/constants/system"
import { savePlayer } from "@/firebase/db"
import { getRandomTown } from "@/utils/location"
import { createNewShip } from "@/utils/ship"
import { registrationValidationSchema } from "@/utils/validation"

const createPlayer = async (body: any) => {
  const { name, nationality, gender, age } = body as Character
  const { musicOn, soundEffectsOn } = body

  const playerId: Player["id"] = crypto.randomUUID()
  const title: Title = "Pirate"
  const createdDate = new Date().getTime()
  const startingTown = getRandomTown(nationality)

  const ship = createNewShip("Brig", 0)
  const crewMembersCount = 4

  const newPlayer: Partial<Player> = {
    id: playerId,
    character: {
      name,
      nationality,
      title,
      gender,
      age,
      town: startingTown,
      location: LOCATIONS.harbor,
      gold: 300,
      day: 1,
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

  await savePlayer(newPlayer as Player)

  return { playerId, musicOn, soundEffectsOn }
}

const handleRegister = async (req: Request) => {
  const body = await req.json()

  try {
    await registrationValidationSchema.parseAsync(body)
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }

  try {
    const { playerId, musicOn, soundEffectsOn } = await createPlayer(body)

    const res = NextResponse.json(playerId)

    res.cookies.set(PLAYER_ID_COOKIE_NAME, playerId, {
      expires: COOKIE_EXPIRE_TIME,
    })
    res.cookies.set(MUSIC_STATE_COOKIE_NAME, Boolean(musicOn).toString(), {
      expires: COOKIE_EXPIRE_TIME,
    })
    res.cookies.set(
      SOUND_EFFECTS_STATE_COOKIE_NAME,
      Boolean(soundEffectsOn).toString(),
      { expires: COOKIE_EXPIRE_TIME }
    )

    return res
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

export const POST = handleRegister
export const PUT = handleRegister
