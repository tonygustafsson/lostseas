import crypto from "crypto"
import { NextResponse } from "next/server"

import { getCharacterById } from "@/constants/characters"
import { STARTING_SHIP_TYPE } from "@/constants/player"
import {
  AMBIENCE_STATE_COOKIE_NAME,
  COOKIE_EXPIRE_TIME,
  MUSIC_STATE_COOKIE_NAME,
  SOUND_EFFECTS_STATE_COOKIE_NAME,
} from "@/constants/system"
import { createNewPlayer } from "@/utils/actions/user"
import { savePlayerWithStatistics } from "@/utils/db/savePlayerWithStatistics"
import { getRandomTown } from "@/utils/location"
import { setPlayerCookie } from "@/utils/setPlayerCookie"
import { createNewShip } from "@/utils/ship"
import { registrationValidationSchema } from "@/utils/validation"

const createPlayer = async (body: any) => {
  const { name, characterId } = body
  const { musicOn, ambienceOn, soundEffectsOn } = body

  const character = getCharacterById(characterId)

  if (!character) throw new Error("Unknown character")

  const playerId: Player["id"] = crypto.randomUUID()

  const newPlayer = createNewPlayer(
    {
      name,
      nationality: character.nationality,
      characterId: character.id,
    },
    {
      id: playerId,
      createdDate: new Date().getTime(),
      startingTown: getRandomTown(character.nationality),
      ship: createNewShip(STARTING_SHIP_TYPE, 0),
    }
  )

  await savePlayerWithStatistics(newPlayer, {
    type: "beginning",
    message: `Created new character ${name}.`,
  })

  return { playerId, musicOn, ambienceOn, soundEffectsOn }
}

const handleRegister = async (req: Request) => {
  const body = await req.json()

  try {
    await registrationValidationSchema.parseAsync(body)
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }

  try {
    const { playerId, musicOn, ambienceOn, soundEffectsOn } =
      await createPlayer(body)

    const res = setPlayerCookie(NextResponse.json(playerId), playerId)

    res.cookies.set(MUSIC_STATE_COOKIE_NAME, Boolean(musicOn).toString(), {
      expires: COOKIE_EXPIRE_TIME,
    })
    res.cookies.set(
      AMBIENCE_STATE_COOKIE_NAME,
      Boolean(ambienceOn).toString(),
      {
        expires: COOKIE_EXPIRE_TIME,
      }
    )
    res.cookies.set(
      SOUND_EFFECTS_STATE_COOKIE_NAME,
      Boolean(soundEffectsOn).toString(),
      { expires: COOKIE_EXPIRE_TIME }
    )

    return res
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"

    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export const POST = handleRegister
export const PUT = handleRegister
